#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h>

#include "SD.h"
#include "FS.h"
#include "SPI.h"

#include <ESP32Time.h>
ESP32Time rtc;

// microSD Card Reader connections
#define SD_CS          5
#define SPI_MOSI      23 
#define SPI_MISO      19
#define SPI_SCK       18

const char* ssid     = "BREAD-DARPA";
const char* password = "12345678";

AsyncWebServer server(80);

AsyncEventSource events("/events");

bool logging = false; //logging data to SD card and graphs

//slice data variables
#define PYROLYSIS_NUM_DATA 6
uint16_t pyrolysisValue[PYROLYSIS_NUM_DATA];
float pyrolysisSetpoint[PYROLYSIS_NUM_DATA];
float pyrolysisKP[PYROLYSIS_NUM_DATA];
float pyrolysisKI[PYROLYSIS_NUM_DATA];
float pyrolysisKD[PYROLYSIS_NUM_DATA];

#define BIO_NUM_DATA 2
#define BIO_NUM_PUMPS 12
float bioThermoData[BIO_NUM_DATA];
float bioPHData[BIO_NUM_DATA];
float bioOxygenData[BIO_NUM_DATA];
float bioPHSetpoint[BIO_NUM_DATA];
float bioPHKP[BIO_NUM_DATA];
float bioPHKI[BIO_NUM_DATA];
float bioPHKD[BIO_NUM_DATA];
float bioPumpSetpoint[BIO_NUM_PUMPS];

float chemPumpSetpoint;
float chemThermoValue;
float chemThermoSetpoint;
float chemThermoKP;
float chemThermoKI;
float chemThermoKD;

void initSDCard(){
  pinMode(SD_CS, OUTPUT);      
  digitalWrite(SD_CS, HIGH); 
    
  // Initialize SPI bus for microSD Card
  SPI.begin(SPI_SCK, SPI_MISO, SPI_MOSI);
  
  if(!SD.begin(SD_CS)){
    Serial.println("Card Mount Failed");
    return;
  }
  uint8_t cardType = SD.cardType();

  if(cardType == CARD_NONE){
    Serial.println("No SD card attached");
    return;
  }

  Serial.print("SD Card Type: ");
  if(cardType == CARD_MMC){
    Serial.println("MMC");
  } else if(cardType == CARD_SD){
    Serial.println("SDSC");
  } else if(cardType == CARD_SDHC){
    Serial.println("SDHC");
  } else {
    Serial.println("UNKNOWN");
  }
  uint64_t cardSize = SD.cardSize() / (1024 * 1024);
  Serial.printf("SD Card Size: %lluMB\n", cardSize);
}

void appendFile(fs::FS &fs, const char * path, String message){
  Serial.printf("Appending to file: %s\n", path);

  File file = fs.open(path, FILE_APPEND);
  if(!file){
    Serial.println("Failed to open file for appending");
    return;
  }
  if(file.print(message)){
      Serial.println("Message appended");
  } else {
    Serial.println("Append failed");
  }
  file.close();
}

void setup() {
  Serial.begin(115200);
  
  initSDCard();

  //start access point wifi
  WiFi.softAP(ssid, password);
  IPAddress myIP = WiFi.softAPIP();
  Serial.print("AP IP address: ");
  Serial.println(myIP);
  Serial.println("Server started");

  //send html data to server
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SD, "/index.html", "text/html");
  });

  //load data from slice form
  server.on("/form-submit", HTTP_POST, [](AsyncWebServerRequest * request) {
    int params = request->params();
    for (int i = 0; i < params; i++) {
      AsyncWebParameter* p = request->getParam(i);
      Serial.printf("POST[%s]: %s\n", p->name().c_str(), p->value().c_str());
      String postName = p->name().c_str();
      String postValue = p->value().c_str();
      if(postName.charAt(0) == 'p') {
        uint8_t index = postName.substring(2).toInt() - 1;
        switch(postName.charAt(1)) {
          case 's': //setpoint
            pyrolysisSetpoint[index] = postValue.toFloat();
            //send command to BREAD here:
            break;
          case 'p': //Kp
            pyrolysisKP[index] = postValue.toFloat();
            //send command to BREAD here:
            break;
          case 'i': //Ki
            pyrolysisKI[index] = postValue.toFloat();
            //send command to BREAD here:
            break;
          case 'd': //Kd
            pyrolysisKD[index] = postValue.toFloat();
            //send command to BREAD here:
            break;
        }
        //commandData[0] = 'H'
        //commandData[1] = (either 1 or 2)
        //float converted into 4 bytes
      } else if(postName.charAt(0) == 'b') {
        uint8_t index = postName.substring(2).toInt() - 1;
        switch(postName.charAt(1)) {
          case 's': //setpoint
            bioPHSetpoint[index] = postValue.toFloat();
            //send command to BREAD here:
            break;
          case 'p': //Kp
            bioPHKD[index] = postValue.toFloat();
            //send command to BREAD here:
            break;
          case 'i': //Ki
            bioPHKI[index] = postValue.toFloat();
            //send command to BREAD here:
            break;
          case 'd': //Kd
            bioPHKD[index] = postValue.toFloat();
            //send command to BREAD here:
            break;
          case 'm':
            bioPumpSetpoint[index] = postValue.toFloat();
            //send command to BREAD here:
            break;
        }
      } else if(postName.charAt(0) == 'c') {
        switch(postName.charAt(1)) {
          case 's': //setpoint
            chemThermoSetpoint = postValue.toFloat();
            //send command to BREAD here:
            break;
          case 'p': //Kp
            chemThermoKP = postValue.toFloat();
            //send command to BREAD here:
            break;
          case 'i': //Ki
            chemThermoKI = postValue.toFloat();
            //send command to BREAD here:
            break;
          case 'd': //Kd
            chemThermoKD = postValue.toFloat();
            //send command to BREAD here:
            break;
          case 'm':
            chemPumpSetpoint = postValue.toFloat();
            //send command to BREAD here:
            break;
        }
      }
    }
  });

  //load any non-form POST request body and url
  server.onRequestBody([](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total){
    Serial.println(request->url());
    if (request->url() == "/all-data") {
      String s = "";
      for(size_t i=0; i<len; i++) {
        s += char(data[i]);
      }
      Serial.println(s);
    } else if(request->url() == "/get-variables") {
      //set time on esp32 rtc
      String s = "";
      for(size_t i=0; i<len; i++) {
        s += char(data[i]);
      }
      
      uint16_t timeDate[6];
      for(uint8_t x = 0; x < 5; x++) {
        uint8_t nextComma = s.indexOf(',');
        timeDate[x] = s.substring(0, nextComma).toInt();
        s = s.substring(nextComma+1);
      }
      timeDate[5] = s.toInt();
      rtc.setTime(timeDate[0], timeDate[1], timeDate[2], timeDate[3], timeDate[4], timeDate[5]);

      //how variables are sent to the server (I should probably use a more structured format like JSON)
      String toServer = "";
      if(logging) {
        toServer += "logging-";
      } else {
        toServer += "not logging-";
      }
           
      for(uint8_t x = 0; x < PYROLYSIS_NUM_DATA; x++) {
        toServer += (
          String(pyrolysisSetpoint[x]) + "|" + 
          String(pyrolysisKP[x]) + "|" + 
          String(pyrolysisKI[x]) + "|" + 
          String(pyrolysisKD[x]) + ","
        );
      }
      toServer.remove(toServer.length()-1);
      toServer += '-';

      for(uint8_t x = 0; x < BIO_NUM_DATA; x++) {
        toServer += (
          String(bioPHSetpoint[x]) + "|" +
          String(bioPHKP[x]) + "|" +
          String(bioPHKI[x]) + "|" +
          String(bioPHKD[x]) + ","
        );
      }
      toServer.remove(toServer.length()-1);
      toServer += '-';
      
      for(uint8_t x = 0; x < BIO_NUM_PUMPS; x++) {
        toServer += String(bioPumpSetpoint[x]) + ",";
      }
      toServer.remove(toServer.length()-1);
      toServer += '-';

      toServer += String(chemPumpSetpoint) + ",";
      toServer += String(chemThermoSetpoint) + "|" + String(chemThermoKP) + "|" + String(chemThermoKI) + "|" + String(chemThermoKD);
      
      request->send(200, "text/plain", toServer);
    } else if(request->url() == "/logging") {
      Serial.println("log to SD card");
      logging = true;
    } else if(request->url() == "/not-logging") {
      Serial.println("stop log to SD card");
      logging = false;
    } else if(request->url() == "/estop-on") {
      Serial.println("estop on");
      //set pin 12 high
    } else if(request->url() == "/estop-off") {
      Serial.println("estop off");
      //set pin 12 low
    }
  });

  // Handle Web Server Events
  events.onConnect([](AsyncEventSourceClient *client){
    if(client->lastId()){
      Serial.printf("Client reconnected! Last message ID that it got is: %u\n", client->lastId());
    }
    // send event with message "hello!", id current millis
    // and set reconnect delay to 1 second
    client->send("hello!", NULL, millis(), 10000);
  });
  server.addHandler(&events);

  server.serveStatic("/", SD, "/");
  server.begin();
}

uint32_t lastPOST = 0;
void loop() {
  //get slice data from slices
  if(millis() - lastPOST > 5000) {
    Serial.println("getting data");
    //get time
    String pyrolysisToServer = rtc.getTime("%F %T");
    String bioToServer = pyrolysisToServer;
    String chemToServer = pyrolysisToServer;
    
    //Pyrolysis data
    for(uint8_t n = 0; n < PYROLYSIS_NUM_DATA; n++) { //receive data from BREAD (currently random numbers)
      pyrolysisValue[n] = random(400);
    }

    //Bioreactor data
    for(uint8_t n = 0; n < BIO_NUM_DATA; n++) {
      bioThermoData[n] = random(400);
      bioPHData[n] = random(14);
      bioOxygenData[n] = random(100);
    }

    //Chemreactor data
    chemThermoValue = random(400);

    //convert to data to string to save to SD card and send to server
    for(uint8_t n = 0; n < PYROLYSIS_NUM_DATA; n++) {
      pyrolysisToServer += "," + String(pyrolysisValue[n]);
    }
    for(uint8_t n = 0; n < BIO_NUM_DATA; n++) {
      bioToServer += "," + String(bioThermoData[n]) + "," + String(bioPHData[n]) + "," + String(bioOxygenData[n]);
    }
    chemToServer += "," + String(chemThermoValue);

    //send data to website
    events.send(pyrolysisToServer.c_str(), "pyrolysis-readings", millis());
    events.send(bioToServer.c_str(), "bioreactor-readings", millis());
    events.send(bioToServer.c_str(), "chemreactor-readings", millis());
    
    //log onto the SD card
    if(logging) {
      appendFile(SD, "/pyrolysis-data.csv", "\r\n" + pyrolysisToServer);
      appendFile(SD, "/bioreactor-data.csv", "\r\n" + bioToServer);
      appendFile(SD, "/chemreactor-data.csv", "\r\n" + chemToServer);
    }
    lastPOST = millis();
  }
}