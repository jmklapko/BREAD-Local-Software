# 1 "C:\\Users\\Cameron\\AppData\\Local\\Temp\\tmpdol185q4"
#include <Arduino.h>
# 1 "C:/Users/Cameron/repos/BUTTER/src/spread-beta/main/main.ino"
#include "FS.h"
#include "SPI.h"
#include <Wire.h>

#include "Config.h"
#include "DataStructures.h"
#include "SliceControl.h"
#include "Storage.h"
#include "WebServer.h"

#include <ESPAsyncWebServer.h>

AsyncWebServer server(80);
AsyncEventSource events("/events");
void setup();
void loop();
#line 16 "C:/Users/Cameron/repos/BUTTER/src/spread-beta/main/main.ino"
void setup()
{
    Serial.begin(115200);

    Wire.begin();

    initSDCard();

    initSlices();

    pinMode(ESTOP, OUTPUT);


    startWiFi();


    setupWebServer();

    server.on("/", HTTP_GET, [](AsyncWebServerRequest *request)
              { request->send(SD, "/index.html", "text/html"); });


    handleRequests();


    events.onConnect([](AsyncEventSourceClient *client)
                     {
                     if (client->lastId())
                     {
                       Serial.printf("Client reconnected! Last message ID that it got is: %u\n", client->lastId());
                     }
                     client->send("hello!", NULL, millis(), 10000); });
    server.addHandler(&events);

    server.serveStatic("/", SD, "/");
    server.begin();
}

uint32_t lastPOST;
bool readRequestedPHDO = false;
uint8_t loggingCounter = 6;

void loop()
{

    if (millis() - lastPOST > SLICE_DATA_INTERVAL_MS)
    {
        Serial.println("getting data");

        String timeToServer = rtc.getTime("%F %T");
        String pyrolysisToServer = timeToServer;
        String bioToServer = timeToServer;
        String chemToServer = timeToServer;


        for (int i = 0; i < 9; i++)
        {
            float temp;
            if (pyro_thermo[i][1] == 1)
                RLHTRequestThermo(pyro_thermo[i][0], &(pyro_thermo_val[i]), &(temp));
            if (pyro_thermo[i][1] == 2)
                RLHTRequestThermo(pyro_thermo[i][0], &(temp), &(pyro_thermo_val[i]));
        }



        for (uint8_t n = 0; n < 2; n++)
        {
            if (readRequestedPHDO)
                bio_ph_val[n][0] = PHDORequest(bio_ph[n][0]);
            if (readRequestedPHDO)
                bio_do_val[n] = PHDORequest(bio_do[n]);
            DCMTRequestTurbidity(bio_turbidity[n][0], &(bio_turbidity_val[0]), &(bio_turbidity_val[1]));


            if (bio_ph_val[n][1] != 0)
                DCMTCommandPH(10 + n, bio_ph_val[n][1], bio_ph_val[n][0]);

            float temp;
            if (bio_thermo[n][1] == 1)
                RLHTRequestThermo(bio_thermo[n][0], &(bio_thermo_val[n]), &(temp));
            if (bio_thermo[n][1] == 2)
                RLHTRequestThermo(bio_thermo[n][0], &(temp), &(bio_thermo_val[n]));
        }
        for (int i = 0; i < 2; i++)
        {
            float temp;
            if (bio_post_heaters[i][2] == 1)
                RLHTRequestThermo(bio_post_heaters[i][0], &(bio_thermo_val[i + 2]), &(temp));
            if (bio_post_heaters[i][2] == 2)
                RLHTRequestThermo(bio_post_heaters[i][0], &(temp), &(bio_thermo_val[i + 2]));
        }
        readRequestedPHDO = false;


        for (uint8_t n = 0; n < 2; n++)
        {
            float temp;
            if (chem_thermo[n][2] == 1)
                RLHTRequestThermo(chem_thermo[n][0], &(chem_thermo_val[n]), &(temp));
            if (chem_thermo[n][2] == 2)
                RLHTRequestThermo(chem_thermo[n][0], &(temp), &(chem_thermo_val[n]));
        }


        for (uint8_t n = 0; n < 9; n++)
        {
            pyrolysisToServer += "," + String(pyro_thermo_val[n]);
        }
        for (uint8_t n = 0; n < 2; n++)
        {
            bioToServer += "," + String(bio_thermo_val[n]) + "," + String(bio_ph_val[n][0]) + "," + String(bio_do_val[n]) + "," + String(bio_turbidity_val[n]);
        }
        bioToServer += "," + String(bio_thermo_val[2]) + "," + String(bio_thermo_val[3]);
        for (uint8_t n = 0; n < 2; n++)
        {
            chemToServer += "," + String(chem_thermo_val[n]);
        }
# 148 "C:/Users/Cameron/repos/BUTTER/src/spread-beta/main/main.ino"
        events.send(pyrolysisToServer.c_str(), "pyrolysis-readings", millis());
        events.send(bioToServer.c_str(), "bioreactor-readings", millis());
        events.send(chemToServer.c_str(), "chemreactor-readings", millis());


        if (logging)
        {
            appendFile(SD, "/pyrolysis-data.csv", "\r\n" + pyrolysisToServer);
            appendFile(SD, "/bioreactor-data.csv", "\r\n" + bioToServer);
            appendFile(SD, "/chemreactor-data.csv", "\r\n" + chemToServer);
        }
        lastPOST = millis();
    }
    else if (!readRequestedPHDO)
    {
        for (uint8_t n = 0; n < 2; n++)
        {
            PHDOCommand(bio_do[n], "r");
            PHDOCommand(bio_ph[n][0], "r");
        }
        readRequestedPHDO = true;
    }
}