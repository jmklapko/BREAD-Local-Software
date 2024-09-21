//----------------Chemreactor thermocouple traces-----------------------//
var chem_thermo_traces = [
    {
        y: [],
        x: [],
        type: 'scatter',
        mode: "lines",
        name: "Reactor 1"
    },
    {
        y: [],
        x: [],
        type: 'scatter',
        mode: "lines",
        name: "Reactor 2"
    }
]

//----------------Thermocouple graph layout-----------------------//
var chem_thermo_layout = {
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

var motorGaugeInfo = {
    "chem-pump1-gauge1": {
        title: "Ammon. Hydrox. Loading"
    },
    "chem-pump2-gauge1": {
        title: "Liquid Transfer"
    },
    "chem-pump3-gauge1": {
        title: "Water Dilute"
    },
    "chem-pump4-gauge1": {
        title: "Reactor Wash"
    }
}

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


//----------------Chemreactor Gauges-----------------------//
var chemGaugeInfo = {
    "chem-thermo-gauge1": {
        title: "Reactor 1",
        value: 0,
        setpoint: 0
    },
    "chem-thermo-gauge2": {
        title: "Reactor 2",
        value: 0,
        setpoint: 0
    }
}

function loadDataChemreactor() {
    fetch('chemreactor-data.csv')
        .then(response => response.text())
        .then(text => {
            let row = text.split("\r\n") //split entries by row
            for (let n = 1; n < row.length; n++) {
                let data = row[n].split(',')
                for (let x = 0; x < 2; x++) {
                    chem_thermo_traces[x].x.push(data[0])
                    chem_thermo_traces[x].y.push(data[x + 1])
                }
            }
            Plotly.newPlot('chem-thermo-graph', chem_thermo_traces, chem_thermo_layout, { scrollZoom: true });
        })
}

function loadChemgauges(sec) {
    let chem = sec.split(',')
    document.getElementById("chem-pump1-gauge1-amount").value = parseInt(chem[0])
    document.getElementById("chem-pump2-gauge1-amount").value = parseInt(chem[1])
    document.getElementById("chem-pump3-gauge1-amount").value = parseInt(chem[2])
    document.getElementById("chem-pump4-gauge1-amount").value = parseInt(chem[3])

    Plotly.restyle('chem-pump1-gauge1', { title: motorGaugeInfo["chem-pump1-gauge1"].title, value: parseInt(chem[0]) })
    Plotly.restyle('chem-pump2-gauge1', { title: motorGaugeInfo["chem-pump2-gauge1"].title, value: parseInt(chem[1]) })
    Plotly.restyle('chem-pump3-gauge1', { title: motorGaugeInfo["chem-pump3-gauge1"].title, value: parseInt(chem[2]) })
    Plotly.restyle('chem-pump4-gauge1', { title: motorGaugeInfo["chem-pump4-gauge1"].title, value: parseInt(chem[3]) })
}

function loadChemThermoGauges(sec) {
    let chemThermo = sections[7].split(',')
    for (let x = 0; x < chemThermo.length; x++) {
        let c = chemThermo[x].split('|')
        let id = "chem-thermo-gauge" + (x + 1)
        document.getElementById(id + "-amount").value = c[0]
        chemGaugeInfo[id].setpoint = c[0]
        document.getElementById(id + "-kp").value = c[1]
        document.getElementById(id + "-ki").value = c[2]
        document.getElementById(id + "-kd").value = c[3]
        updateChemGauge(id)
    }
}

function chemreactorEventListeners(source) {

    source.addEventListener('chemreactor-readings', function (e) {
        var chemVals = e.data.split(',')

        chemGaugeInfo["chem-thermo-gauge1"].value = chemVals[1]
        chemGaugeInfo["chem-thermo-gauge2"].value = chemVals[2]

        let ids = Object.keys(chemGaugeInfo)
        ids.forEach((id) => {
            chemGaugeInfo[id].value = chemVals[ids.indexOf(id) + 1]
            updateChemGauge(id)
        })
        //Plotly.restyle('chem-thermo-gauge1', {value: chemVals[1], title: 'Thermocouple 1', 'gauge.bar.color': "blue"})

        if (logging) {
            cUpdateCounter += 1
            if (cUpdateCounter >= 2) {
                cUpdateCounter = 0
                Plotly.extendTraces('chem-thermo-graph', {
                    x: [[chemVals[0]], [chemVals[0]]],
                    y: [[chemVals[1]], [chemVals[2]]]
                }, [0, 1])
            }
        }
    }, false)
}

function plotChemData() {
    Plotly.newPlot("chem-thermo-gauge1", thermo_gauge, gaugeLayout);
    Plotly.newPlot("chem-thermo-gauge2", thermo_gauge, gaugeLayout);

    Plotly.newPlot("chem-pump1-gauge1", motor_gauge, gaugeLayout);
    Plotly.newPlot("chem-pump2-gauge1", motor_gauge, gaugeLayout);
    Plotly.newPlot("chem-pump3-gauge1", motor_gauge, gaugeLayout);
    Plotly.newPlot("chem-pump4-gauge1", motor_gauge, gaugeLayout);

    Plotly.restyle('chem-thermo-gauge1', { title: chemGaugeInfo["chem-thermo-gauge1"].title })
    Plotly.restyle('chem-thermo-gauge2', { title: chemGaugeInfo["chem-thermo-gauge2"].title })

    Plotly.restyle('chem-pump1-gauge1', { title: motorGaugeInfo["chem-pump1-gauge1"].title })
    Plotly.restyle('chem-pump2-gauge1', { title: motorGaugeInfo["chem-pump2-gauge1"].title })
    Plotly.restyle('chem-pump3-gauge1', { title: motorGaugeInfo["chem-pump3-gauge1"].title })
    Plotly.restyle('chem-pump4-gauge1', { title: motorGaugeInfo["chem-pump4-gauge1"].title })
}

function updateChemGauge(gaugeID) {
    let setpoint = parseFloat(chemGaugeInfo[gaugeID].setpoint)
    let value = parseFloat(chemGaugeInfo[gaugeID].value)
    function pickColor() {
        if (value < setpoint - 50) { return "yellow" }
        else if (value > setpoint + 50) { return "red" }
        else { return "green" }
    }
    let new_thermo_gauge = {
        domain: { x: [0, 1], y: [0, 1] },
        value: value,
        title: { text: chemGaugeInfo[gaugeID].title },
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

function setGaugeValue(amount, gaugeID) {
    Plotly.update(gaugeID, { value: amount > 100 ? 100 : amount, title: motorGaugeInfo[gaugeID].title })
}

function clearChemreactor() {
    sendPOST('delete-chemreactor', 'delete-chemreactor')
    for (let x = 0; x < 2; x++) {
        chem_thermo_traces[x].x = []
        chem_thermo_traces[x].y = []
    }
    Plotly.newPlot('chem-thermo-graph', chem_thermo_traces, chem_thermo_layout, { scrollZoom: true });
}

//--------------------------------------------------------------------------//