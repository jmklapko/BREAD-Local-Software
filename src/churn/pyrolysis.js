//----------------Pyrolysis thermocouple traces-----------------------//  
var pyrolysis_traces = [
    {
        y: [],
        x: [],
        type: 'scatter',
        mode: "lines",
        name: "Dissolution Tank"
    },
    {
        y: [],
        x: [],
        type: 'scatter',
        mode: "lines",
        name: "Dissolution Heating Tape"
    },
    {
        y: [],
        x: [],
        type: 'scatter',
        mode: "lines",
        name: "Valve"
    },
    {
        y: [],
        x: [],
        type: 'scatter',
        mode: "lines",
        name: "Char Chamber"
    },
    {
        y: [],
        x: [],
        type: 'scatter',
        mode: "lines",
        name: "Secondary Reactor"
    },
    {
        y: [],
        x: [],
        type: 'scatter',
        mode: "lines",
        name: "Knockout Drum"
    },
    {
        y: [],
        x: [],
        type: 'scatter',
        mode: "lines",
        name: "Condenser 0"
    },
    {
        y: [],
        x: [],
        type: 'scatter',
        mode: "lines",
        name: "Condenser 1"
    },
    {
        y: [],
        x: [],
        type: 'scatter',
        mode: "lines",
        name: "Condenser 2"
    },
]

//----------------Thermocouple graph layout-----------------------//
var thermocouple_layout = {
    title: 'Temperature Data',
    xaxis: {
        title: 'Time',
        autorange: true,
        rangeselector: {
            buttons: [
                {
                    count: 1,
                    label: '1h',
                    step: 'hour',
                    stepmode: 'backward'
                },
                {
                    count: 6,
                    label: '6h',
                    step: 'hour',
                    stepmode: 'backward'
                },
                {
                    count: 12,
                    label: '12h',
                    step: 'hour',
                    stepmode: 'backward'
                },
                {
                    count: 24,
                    label: '24h',
                    step: 'hour',
                    stepmode: 'backward'
                },
                { step: 'all' }
            ]
        },
        type: 'date'
    },
    yaxis: {
        title: 'Degrees Celsius'
    },
    showlegend: true
};

//----------------Standard Gauge Layout-----------------------//
var gaugeLayout = { width: 270, height: 220, margin: { t: 0, b: 0, l: 40, r: 40 } };


//----------------Thermocouple Gauge-----------------------//
var thermo_gauge = [{
    domain: { x: [0, 1], y: [0, 1] },
    value: 0,
    title: { text: "" },
    type: "indicator",
    mode: "gauge+number",
    delta: { reference: 200 },
    number: { 'valueformat': '.1f' },
    gauge: {
        axis: { range: [null, 400] },
        bar: { color: "blue" },
        steps: [
            { range: [0, 400], color: "#dddddd" },
            { range: [145, 155], color: "yellow" },
            { range: [195, 205], color: "green" },
            { range: [245, 255], color: "red" }
        ],
    }
}];


//----------------Pyrolysis Gauges-----------------------//
var pyrolysisGaugeInfo = {
    "pyrolysis-thermo-gauge1": {
        title: "Dissolution Tank",
        setpoint: 200,
        value: 0,
    },
    "pyrolysis-thermo-gauge2": {
        title: "Valve",
        setpoint: 200,
        value: 0,
    },
    "pyrolysis-thermo-gauge3": {
        title: "Char Chamber",
        setpoint: 200,
        value: 0,
    },
    "pyrolysis-thermo-gauge4": {
        title: "Secondary Reactor",
        setpoint: 200,
        value: 0,
    },
    "pyrolysis-thermo-gauge5": {
        title: "Knockout Drum",
        setpoint: 200,
        value: 0,
    },
    "pyrolysis-thermo-gauge6": {
        title: "Condenser 0 Heater",
        setpoint: 200,
        value: 0,
    },
    "pyrolysis-thermo-gauge7": {
        title: "Condenser 0 Fan",
        setpoint: 200,
        value: 0,
    },
    "pyrolysis-thermo-gauge8": {
        title: "Condenser 1 Heater",
        setpoint: 200,
        value: 0,
    },
    "pyrolysis-thermo-gauge9": {
        title: "Condenser 1 Fan",
        setpoint: 200,
        value: 0,
    },
    "pyrolysis-thermo-gauge10": {
        title: "Condenser 2 Fan",
        setpoint: 200,
        value: 0,
    },
}

function loadDataPyrolysis() {
    fetch('pyrolysis-data.csv')
        .then(response => response.text())
        .then(text => {
            let row = text.split("\r\n") //split entries by row

            for (let n = 1; n < row.length; n++) {
                let data = row[n].split(',')
                for (let x = 0; x < pyrolysis_traces.length; x++) {
                    pyrolysis_traces[x].x.push(data[0])     //data[0] pushes time to the x axis
                    pyrolysis_traces[x].y.push(data[x + 1])   //data[x+1] to avoid pushing the date and time
                }
            }

            //Plot data
            Plotly.newPlot('pyrolysis-thermo-graph', pyrolysis_traces, thermocouple_layout, { scrollZoom: true });
        })
}

function loadPyrolysisGauges(sec) {
    let pyrolysis = sec.split(',')
    for (let x = 0; x < pyrolysis.length; x++) {
        //p[0] setpoint, p[1] Kp, p[2] Ki, p[3] Kd
        let p = pyrolysis[x].split('|')
        let id = "pyrolysis-thermo-gauge" + (x + 1)
        document.getElementById(id + "-amount").value = p[0]
        pyrolysisGaugeInfo[id].setpoint = p[0]
        document.getElementById(id + "-kp").value = p[1]
        document.getElementById(id + "-ki").value = p[2]
        document.getElementById(id + "-kd").value = p[3]
        updatePyrolysisGauge(id)
    }
}

function pyrolysisEventListeners(source) {

    source.addEventListener('pyrolysis-readings', function (e) {
        var pyrolysisVals = e.data.split(',')

        pyrolysisGaugeInfo["pyrolysis-thermo-gauge1"].value = pyrolysisVals[1];   //DT
        pyrolysisGaugeInfo["pyrolysis-thermo-gauge2"].value = pyrolysisVals[3];   // V
        pyrolysisGaugeInfo["pyrolysis-thermo-gauge3"].value = pyrolysisVals[4];   // CC
        pyrolysisGaugeInfo["pyrolysis-thermo-gauge4"].value = pyrolysisVals[5];   // SR
        pyrolysisGaugeInfo["pyrolysis-thermo-gauge5"].value = pyrolysisVals[6];   // KD
        pyrolysisGaugeInfo["pyrolysis-thermo-gauge6"].value = pyrolysisVals[7];   // C0H
        pyrolysisGaugeInfo["pyrolysis-thermo-gauge7"].value = pyrolysisVals[7];   // C0F
        pyrolysisGaugeInfo["pyrolysis-thermo-gauge8"].value = pyrolysisVals[8];   // C1H
        pyrolysisGaugeInfo["pyrolysis-thermo-gauge9"].value = pyrolysisVals[8];   // C1F
        pyrolysisGaugeInfo["pyrolysis-thermo-gauge10"].value = pyrolysisVals[9];  // C2F

        let ids = Object.keys(pyrolysisGaugeInfo)
        ids.forEach((id) => {
            updatePyrolysisGauge(id)
        })

        //plot values
        if (logging) {
            pUpdateCounter += 1
            //could use a for loop but I only want to call extendTraces once
            if (pUpdateCounter >= 2) {
                pUpdateCounter = 0
                Plotly.extendTraces('pyrolysis-thermo-graph', {
                    x: [[pyrolysisVals[0]], [pyrolysisVals[0]], [pyrolysisVals[0]], [pyrolysisVals[0]], [pyrolysisVals[0]], [pyrolysisVals[0]], [pyrolysisVals[0]], [pyrolysisVals[0]], [pyrolysisVals[0]]],
                    y: [[pyrolysisVals[1]], [pyrolysisVals[2]], [pyrolysisVals[3]], [pyrolysisVals[4]], [pyrolysisVals[5]], [pyrolysisVals[6]], [pyrolysisVals[7]], [pyrolysisVals[8]], [pyrolysisVals[9]]]
                }, [0, 1, 2, 3, 4, 5, 6, 7, 8])
            }

            if (document.getElementById('pyrolysis-tracking').textContent == 'Tracking Data...') {
                trackData(document.getElementById('pyrolysis-tracking-amount').value, 'pyrolysis-thermo-graph')
            }
            if (document.getElementById('bio-thermo-tracking').textContent == 'Tracking Data...') {
                trackData(document.getElementById('bio-thermo-tracking-amount').value, 'bio-thermo-graph')
            }
            if (document.getElementById('bio-ph-tracking').textContent == 'Tracking Data...') {
                trackData(document.getElementById('bio-ph-tracking-amount').value, 'bio-ph-graph')
            }
            if (document.getElementById('bio-oxygen-tracking').textContent == 'Tracking Data...') {
                trackData(document.getElementById('bio-oxygen-tracking-amount').value, 'bio-oxygen-graph')
            }
            if (document.getElementById('bio-turbidity-tracking').textContent == 'Tracking Data...') {
                trackData(document.getElementById('bio-turbidity-tracking-amount').value, 'bio-turbidity-graph')
            }
            if (document.getElementById('chem-thermo-tracking').textContent == 'Tracking Data...') {
                trackData(document.getElementById('chem-thermo-tracking-amount').value, 'chem-thermo-graph')
            }
        }
    }, false);
}

function plotPyrolysisData() {
    //create new gauge plots
    Plotly.newPlot('pyrolysis-thermo-gauge1', thermo_gauge, gaugeLayout);
    Plotly.newPlot('pyrolysis-thermo-gauge2', thermo_gauge, gaugeLayout);
    Plotly.newPlot('pyrolysis-thermo-gauge3', thermo_gauge, gaugeLayout);
    Plotly.newPlot('pyrolysis-thermo-gauge4', thermo_gauge, gaugeLayout);
    Plotly.newPlot('pyrolysis-thermo-gauge5', thermo_gauge, gaugeLayout);
    Plotly.newPlot('pyrolysis-thermo-gauge6', thermo_gauge, gaugeLayout);
    Plotly.newPlot('pyrolysis-thermo-gauge7', thermo_gauge, gaugeLayout);
    Plotly.newPlot('pyrolysis-thermo-gauge8', thermo_gauge, gaugeLayout);
    Plotly.newPlot('pyrolysis-thermo-gauge9', thermo_gauge, gaugeLayout);
    Plotly.newPlot('pyrolysis-thermo-gauge10', thermo_gauge, gaugeLayout);

    //adjust titles
    Plotly.restyle('pyrolysis-thermo-gauge1', { title: pyrolysisGaugeInfo['pyrolysis-thermo-gauge1'].title })
    Plotly.restyle('pyrolysis-thermo-gauge2', { title: pyrolysisGaugeInfo['pyrolysis-thermo-gauge2'].title })
    Plotly.restyle('pyrolysis-thermo-gauge3', { title: pyrolysisGaugeInfo['pyrolysis-thermo-gauge3'].title })
    Plotly.restyle('pyrolysis-thermo-gauge4', { title: pyrolysisGaugeInfo['pyrolysis-thermo-gauge4'].title })
    Plotly.restyle('pyrolysis-thermo-gauge5', { title: pyrolysisGaugeInfo['pyrolysis-thermo-gauge5'].title })
    Plotly.restyle('pyrolysis-thermo-gauge6', { title: pyrolysisGaugeInfo['pyrolysis-thermo-gauge6'].title })
    Plotly.restyle('pyrolysis-thermo-gauge7', { title: pyrolysisGaugeInfo['pyrolysis-thermo-gauge7'].title })
    Plotly.restyle('pyrolysis-thermo-gauge8', { title: pyrolysisGaugeInfo['pyrolysis-thermo-gauge8'].title })
    Plotly.restyle('pyrolysis-thermo-gauge9', { title: pyrolysisGaugeInfo['pyrolysis-thermo-gauge9'].title })
    Plotly.restyle('pyrolysis-thermo-gauge10', { title: pyrolysisGaugeInfo['pyrolysis-thermo-gauge10'].title })
}


function updatePyrolysisGauge(gaugeID) {
    let setpoint = parseFloat(pyrolysisGaugeInfo[gaugeID].setpoint)
    let value = parseFloat(pyrolysisGaugeInfo[gaugeID].value)
    function pickColor() {
        if (value < setpoint - 50) { return "yellow" }
        else if (value > setpoint + 50) { return "red" }
        else { return "green" }
    }
    let new_thermo_gauge = {
        domain: { x: [0, 1], y: [0, 1] },
        value: value,
        title: { text: pyrolysisGaugeInfo[gaugeID].title },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: { range: [0, setpoint * 2] },
            bar: { color: pickColor() },
            steps: [
                { range: [0, setpoint * 2], color: "#dddddd" },
                { range: [setpoint * (1 - 0.275), setpoint * (1 - 0.225)], color: "yellow" },
                { range: [setpoint - (setpoint / 40), setpoint + (setpoint / 40)], color: "green" },
                { range: [setpoint * (1 + 0.275), setpoint * (1 + 0.225)], color: "red" }
            ],
        }
    };
    Plotly.restyle(gaugeID, new_thermo_gauge)
}

function clearPyrolysis() {
    sendPOST('delete-pyrolysis', 'delete-pyrolysis')

    for (let x = 0; x < pyrolysis_traces.length; x++) {
        pyrolysis_traces[x].x = []    //data[0] pushes time to the x axis
        pyrolysis_traces[x].y = []   //data[x+1] to avoid pushing the date and time
    }
    Plotly.newPlot('pyrolysis-thermo-graph', pyrolysis_traces, thermocouple_layout, { scrollZoom: true });
}