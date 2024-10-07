
//----------------Bioreactor thermocouple traces-----------------------//
var bio_thermo_traces = [
    {
        y: [],
        x: [],
        type: 'scatter',
        mode: "lines",
        name: "Thermocouple 1"
    },
    {
        y: [],
        x: [],
        type: 'scatter',
        mode: "lines",
        name: "Thermocouple 2"
    }
]

//----------------Bioreactor pH traces-----------------------//
var bio_ph_traces = [
    {
        y: [],
        x: [],
        type: 'scatter',
        mode: "lines",
        name: "pH Sensor 1"
    },
    {
        y: [],
        x: [],
        type: 'scatter',
        mode: "lines",
        name: "pH Sensor 2"
    }
]

//----------------Bioreactor dissolved oxygen traces-----------------------//
var bio_oxygen_traces = [
    {
        y: [],
        x: [],
        type: 'scatter',
        mode: "lines",
        name: "Dissolved O2 1"
    },
    {
        y: [],
        x: [],
        type: 'scatter',
        mode: "lines",
        name: "Dissolved O2 2"
    }
]

//----------------Bioreactor turbidity traces-----------------------//
var bio_turbidity_traces = [
    {
        y: [],
        x: [],
        type: 'scatter',
        mode: "lines",
        name: "Turbidity 1"
    },
    {
        y: [],
        x: [],
        type: 'scatter',
        mode: "lines",
        name: "Turbidity 2"
    }
]

//----------------Bioreactor Post Processing traces-----------------------//
var bio_pro_traces = [
    {
        y: [],
        x: [],
        type: 'scatter',
        mode: "lines",
        name: "Pasteurization"
    },
    {
        y: [],
        x: [],
        type: 'scatter',
        mode: "lines",
        name: "Dryer"
    }
]

//----------------Thermocouple graph layout-----------------------//
var bio_thermo_layout = {
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


//----------------pH graph layout-----------------------//
var pH_layout = {
    title: 'pH Data',
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
        title: 'pH'
    },
    showlegend: true
};

//----------------Dissolved oxygen graph layout-----------------------//
var oxygen_layout = {
    title: 'Dissolved Oxygen Data',
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
        title: 'Dissolved Oxygen (mL)'
    },
    showlegend: true
};

//----------------Turbidity graph layout-----------------------//
var turbidity_layout = {
    title: 'Turbidity Data',
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
        title: 'Turbidity (NTU)'
    },
    showlegend: true
};


//----------------Post Processing graph layout-----------------------//
var pro_layout = {
    title: 'Post Processing Data',
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


var thermo_bio_gauge = [{
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
        ],
    }
}];


//----------------pH Gauge-----------------------//
var pH_gauge = [{
    domain: { x: [0, 1], y: [0, 1] },
    value: 0,
    title: { text: "" },
    type: "indicator",
    mode: "gauge+number",
    delta: { reference: 7 },
    number: { 'valueformat': '.2f' },
    gauge: {
        axis: { range: [null, 14] },
        bar: { color: "green" },
        steps: [
            { range: [0, 14], color: "#dddddd" },
        ],
        threshold: {
            line: { color: "red", width: 4 },
            thickness: 0.75,
            value: 7
        }
    }
}];

//----------------Dissolved Oxygen Gauge-----------------------//
var oxygen_gauge = [{
    domain: { x: [0, 1], y: [0, 1] },
    value: 0,
    title: { text: "" },
    type: "indicator",
    mode: "gauge+number",
    delta: { reference: 50 },
    number: { 'valueformat': '.2f' },
    gauge: {
        axis: { range: [null, 100] },
        bar: { color: "green" },
        steps: [
            { range: [0, 100], color: "#dddddd" },
        ],
    }
}];

//----------------Turbidity Gauge-----------------------//
var turbidity_gauge = [{
    domain: { x: [0, 1], y: [0, 1] },
    value: 0,
    title: { text: "" },
    type: "indicator",
    mode: "gauge+number",
    delta: { reference: 1 },
    number: { 'valueformat': '.2f' },
    gauge: {
        axis: { range: [null, 6] },
        bar: { color: "green" },
        steps: [
            { range: [0, 6], color: "#dddddd" },
        ],
    }
}];


//----------------Motor Gauge-----------------------//
var motor_gauge = [{
    domain: { x: [0, 1], y: [0, 1] },
    value: 0,
    title: { text: "" },
    type: "indicator",
    mode: "gauge+number",
    delta: { reference: 50 },
    gauge: {
        axis: { range: [null, 100] },
        bar: { color: "green" },
        steps: [
            { range: [0, 100], color: "#dddddd" },
        ],
    }
}];


//----------------Bioreactor Gauges-----------------------//
var bioGaugeInfo = {
    "bio-thermo-gauge1": {
        title: "Thermocouple 1",
        value: 0,
    },
    "bio-ph-gauge1": {
        title: "pH Sensor 1",
        value: 0,
        setpoint: 0,
    },
    "bio-oxygen-gauge1": {
        title: "Dissolved Oxygen 1",
        value: 0,
    },
    "bio-turbidity-gauge1": {
        title: "Turbidity 1",
        value: 0,
    },
    "bio-thermo-gauge2": {
        title: "Thermocouple 2",
        value: 0,
    },
    "bio-ph-gauge2": {
        title: "pH Sensor 2",
        value: 0,
        setpoint: 0,
    },
    "bio-oxygen-gauge2": {
        title: "Dissolved Oxygen 2",
        value: 0,
    },
    "bio-turbidity-gauge2": {
        title: "Turbidity 2",
        value: 0,
    },
    "bio-pro-gauge1": {
        title: "Pasteurization",
        value: 0,
    },
    "bio-pro-gauge2": {
        title: "Dryer",
        value: 0,
    },
}
var motorGaugeInfo = {
    "bio-stirring-gauge1": {
        title: "Stirring Motor 1",
    },
    "bio-pump1-gauge1": {
        title: "Base Pump 1",
    },
    "bio-pump2-gauge1": {
        title: "Acid Pump 1",
    },
    "bio-pump3-gauge1": {
        title: "Water Pump",
    },
    "bio-pump4-gauge1": {
        title: "Spent Media Pump",
    },
    "bio-stirring-gauge2": {
        title: "Stirring Motor 2",
    },
    "bio-pump1-gauge2": {
        title: "Base Pump 2",
    },
    "bio-pump2-gauge2": {
        title: "Acid Pump 2",
    },
    "bio-pump3-gauge2": {
        title: "Harvest Pump",
    },
    "bio-pump4-gauge2": {
        title: "TFF Pump",
    },
}

function plotBioData() {

    //create new gauge plots
    Plotly.newPlot('bio-thermo-gauge1', thermo_bio_gauge, gaugeLayout);
    Plotly.newPlot('bio-thermo-gauge2', thermo_bio_gauge, gaugeLayout);

    Plotly.newPlot('bio-ph-gauge1', pH_gauge, gaugeLayout);
    Plotly.newPlot('bio-ph-gauge2', pH_gauge, gaugeLayout);

    Plotly.newPlot('bio-oxygen-gauge1', oxygen_gauge, gaugeLayout);
    Plotly.newPlot('bio-oxygen-gauge2', oxygen_gauge, gaugeLayout);

    Plotly.newPlot('bio-turbidity-gauge1', turbidity_gauge, gaugeLayout);
    Plotly.newPlot('bio-turbidity-gauge2', turbidity_gauge, gaugeLayout);

    Plotly.newPlot("bio-stirring-gauge1", motor_gauge, gaugeLayout);
    Plotly.newPlot("bio-stirring-gauge2", motor_gauge, gaugeLayout);

    Plotly.newPlot("bio-pump1-gauge1", motor_gauge, gaugeLayout);
    Plotly.newPlot("bio-pump2-gauge1", motor_gauge, gaugeLayout);
    Plotly.newPlot("bio-pump3-gauge1", motor_gauge, gaugeLayout);
    Plotly.newPlot("bio-pump4-gauge1", motor_gauge, gaugeLayout);
    Plotly.newPlot("bio-pump1-gauge2", motor_gauge, gaugeLayout);
    Plotly.newPlot("bio-pump2-gauge2", motor_gauge, gaugeLayout);
    Plotly.newPlot("bio-pump3-gauge2", motor_gauge, gaugeLayout);
    Plotly.newPlot("bio-pump4-gauge2", motor_gauge, gaugeLayout);

    Plotly.newPlot('bio-pro-gauge1', thermo_gauge, gaugeLayout);
    Plotly.newPlot('bio-pro-gauge2', thermo_gauge, gaugeLayout);

    //restyle
    Plotly.restyle('bio-thermo-gauge1', { title: bioGaugeInfo["bio-thermo-gauge1"].title })
    Plotly.restyle('bio-thermo-gauge2', { title: bioGaugeInfo["bio-thermo-gauge2"].title })
    Plotly.restyle('bio-ph-gauge1', { title: bioGaugeInfo["bio-ph-gauge1"].title })
    Plotly.restyle('bio-ph-gauge2', { title: bioGaugeInfo["bio-ph-gauge2"].title })
    Plotly.restyle('bio-oxygen-gauge1', { title: bioGaugeInfo["bio-oxygen-gauge1"].title })
    Plotly.restyle('bio-oxygen-gauge2', { title: bioGaugeInfo["bio-oxygen-gauge2"].title })
    Plotly.restyle('bio-turbidity-gauge1', { title: bioGaugeInfo["bio-turbidity-gauge1"].title })
    Plotly.restyle('bio-turbidity-gauge2', { title: bioGaugeInfo["bio-turbidity-gauge2"].title })

    Plotly.restyle("bio-stirring-gauge1", { title: motorGaugeInfo["bio-stirring-gauge1"].title })
    Plotly.restyle("bio-stirring-gauge2", { title: motorGaugeInfo["bio-stirring-gauge2"].title })

    Plotly.restyle("bio-pump1-gauge1", { title: motorGaugeInfo["bio-pump1-gauge1"].title })
    Plotly.restyle("bio-pump2-gauge1", { title: motorGaugeInfo["bio-pump2-gauge1"].title })
    Plotly.restyle("bio-pump3-gauge1", { title: motorGaugeInfo["bio-pump3-gauge1"].title })
    Plotly.restyle("bio-pump4-gauge1", { title: motorGaugeInfo["bio-pump4-gauge1"].title })

    Plotly.restyle("bio-pump1-gauge2", { title: motorGaugeInfo["bio-pump1-gauge2"].title })
    Plotly.restyle("bio-pump2-gauge2", { title: motorGaugeInfo["bio-pump2-gauge2"].title })
    Plotly.restyle("bio-pump3-gauge2", { title: motorGaugeInfo["bio-pump3-gauge2"].title })
    Plotly.restyle("bio-pump4-gauge2", { title: motorGaugeInfo["bio-pump4-gauge2"].title })

    Plotly.restyle('bio-pro-gauge1', { title: bioGaugeInfo["bio-pro-gauge1"].title })
    Plotly.restyle('bio-pro-gauge2', { title: bioGaugeInfo["bio-pro-gauge2"].title })
}

function loadDataBioreactor() {

    fetch('bioreactor-data.csv')
        .then(response => response.text())
        .then(text => {
            let row = text.split("\r\n") //split entries by row

            for (let n = 1; n < row.length; n++) {
                let data = row[n].split(',')
                for (let x = 0; x < 2; x++) {
                    bio_thermo_traces[x].x.push(data[0])    //data[0] pushes time to the x axis
                    bio_ph_traces[x].x.push(data[0])
                    bio_oxygen_traces[x].x.push(data[0])
                    bio_turbidity_traces[x].x.push(data[0])
                    bio_pro_traces[x].x.push(data[0])

                    bio_thermo_traces[x].y.push(data[x * 4 + 1])
                    bio_ph_traces[x].y.push(data[x * 4 + 2])
                    bio_oxygen_traces[x].y.push(data[x * 4 + 3])
                    bio_turbidity_traces[x].y.push(data[x * 4 + 4])
                    bio_pro_traces[x].y.push(data[x + 9])
                }
            }

            //Plot data
            Plotly.newPlot('bio-thermo-graph', bio_thermo_traces, bio_thermo_layout, { scrollZoom: true });
            Plotly.newPlot('bio-ph-graph', bio_ph_traces, pH_layout, { scrollZoom: true });
            Plotly.newPlot('bio-oxygen-graph', bio_oxygen_traces, oxygen_layout, { scrollZoom: true });
            Plotly.newPlot('bio-turbidity-graph', bio_turbidity_traces, turbidity_layout, { scrollZoom: true });
            Plotly.newPlot('bio-pro-graph', bio_pro_traces, pro_layout, { scrollZoom: true });
        })
}

function loadBioPhGauges(sec) {
    let bioPh = sec.split(',')
    for (let x = 0; x < bioPh.length; x++) {
        let b = bioPh[x].split('|')
        let id = "bio-ph-gauge" + (x + 1)
        document.getElementById(id + "-amount").value = b[0]
        bioGaugeInfo[id].setpoint = b[0]
        document.getElementById(id + "-kp").value = b[1]
        document.getElementById(id + "-ki").value = b[2]
        document.getElementById(id + "-kd").value = b[3]
        updateBioPhGauge(id)
    }
}

function loadTurbGauges(sec) {
    let turb = sec.split(',')
    document.getElementById("bio-turbidity-gauge1-amount").value = turb[0]
    document.getElementById("bio-turbidity-gauge2-amount").value = turb[1]
    Plotly.restyle('bio-turbidity-gauge1', { title: bioGaugeInfo["bio-turbidity-gauge1"].title, value: turb[0] })
    Plotly.restyle('bio-turbidity-gauge2', { title: bioGaugeInfo["bio-turbidity-gauge2"].title, value: turb[1] })
}

function loadBioProGauges(sec) {
    let bioPro = sec.split(',')
    for (let x = 0; x < bioPro.length; x++) {
        let b = bioPro[x].split('|')
        let id = "bio-pro-gauge" + (x + 1)
        document.getElementById(id + "-amount").value = b[0]
        bioGaugeInfo[id].setpoint = b[0]
        document.getElementById(id + "-kp").value = b[1]
        document.getElementById(id + "-ki").value = b[2]
        document.getElementById(id + "-kd").value = b[3]
        updateBioProGauge(id)
    }
}

function loadBioGauges(sec) {

    let bio = sec.split(',')
    document.getElementById("bio-stirring-gauge1-amount").value = bio[0]
    document.getElementById("bio-stirring-gauge2-amount").value = bio[6]
    Plotly.restyle('bio-stirring-gauge1', { title: motorGaugeInfo["bio-stirring-gauge1"].title, value: bio[0] })
    Plotly.restyle('bio-stirring-gauge2', { title: motorGaugeInfo["bio-stirring-gauge2"].title, value: bio[6] })
    for (let x = 0; x < 4; x++) {
        let id = "bio-pump" + (x + 1) + "-gauge1"
        document.getElementById(id + "-amount").value = bio[x + 1]
        Plotly.restyle(id, { title: motorGaugeInfo[id].title, value: bio[x + 1] })
    }
    for (let x = 0; x < 4; x++) {
        let id = "bio-pump" + (x + 1) + "-gauge2"
        document.getElementById(id + "-amount").value = bio[x + 5]
        Plotly.restyle(id, { title: motorGaugeInfo[id].title, value: bio[x + 7] })
    }
}

function bioreactorEventListeners(source) {

    source.addEventListener('bioreactor-readings', function (e) {
        var bioVals = e.data.split(',')

        bioGaugeInfo["bio-thermo-gauge1"].value = bioVals[1]
        bioGaugeInfo["bio-ph-gauge1"].value = bioVals[2]
        bioGaugeInfo["bio-oxygen-gauge1"].value = bioVals[3]
        bioGaugeInfo["bio-turbidity-gauge1"].value = bioVals[4]
        bioGaugeInfo["bio-thermo-gauge2"].value = bioVals[5]
        bioGaugeInfo["bio-ph-gauge2"].value = bioVals[6]
        bioGaugeInfo["bio-oxygen-gauge2"].value = bioVals[7]
        bioGaugeInfo["bio-turbidity-gauge2"].value = bioVals[8]
        bioGaugeInfo["bio-pro-gauge1"].value = bioVals[9]
        bioGaugeInfo["bio-pro-gauge2"].value = bioVals[10]

        updateBioPhGauge("bio-ph-gauge1")
        updateBioPhGauge("bio-ph-gauge2")
        updateBioProGauge("bio-pro-gauge1")
        updateBioProGauge("bio-pro-gauge2")

        let ids = Object.keys(bioGaugeInfo)
        ids.forEach((id) => {
            Plotly.update(id, {
                value: bioVals[ids.indexOf(id) + 1],
                title: bioGaugeInfo[id].title,
                'gauge.bar.color': "blue",
            })
        })

        //plot values
        if (logging) {
            bUpdateCounter += 1
            if (bUpdateCounter >= 2) {
                bUpdateCounter = 0
                Plotly.extendTraces('bio-thermo-graph', {
                    x: [[bioVals[0]], [bioVals[0]]],
                    y: [[bioVals[1]], [bioVals[5]]]
                }, [0, 1])
                Plotly.extendTraces('bio-ph-graph', {
                    x: [[bioVals[0]], [bioVals[0]]],
                    y: [[bioVals[2]], [bioVals[6]]]
                }, [0, 1])
                Plotly.extendTraces('bio-oxygen-graph', {
                    x: [[bioVals[0]], [bioVals[0]]],
                    y: [[bioVals[3]], [bioVals[7]]]
                }, [0, 1])
                Plotly.extendTraces('bio-turbidity-graph', {
                    x: [[bioVals[0]], [bioVals[0]]],
                    y: [[bioVals[4]], [bioVals[8]]]
                }, [0, 1])
                Plotly.extendTraces('bio-pro-graph', {
                    x: [[bioVals[0]], [bioVals[0]]],
                    y: [[bioVals[9]], [bioVals[10]]]
                }, [0, 1])
            }
        }
    }, false)
}

function updateBioPhGauge(gaugeID) {
    let setpoint = parseFloat(bioGaugeInfo[gaugeID].setpoint)
    let value = parseFloat(bioGaugeInfo[gaugeID].value)

    let new_ph_gauge = {
        domain: { x: [0, 1], y: [0, 1] },
        value: value,
        title: { text: bioGaugeInfo[gaugeID].title },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: { range: [null, 14] },
            bar: { color: "blue" },
            steps: [
                { range: [0, 14], color: "#dddddd" },
            ],
            threshold: {
                line: { color: "red", width: 4 },
                thickness: 0.75,
                value: setpoint,
            }
        }
    }
    Plotly.restyle(gaugeID, new_ph_gauge)
}

function updateBioProGauge(gaugeID) {
    let setpoint = parseFloat(bioGaugeInfo[gaugeID].setpoint)
    let value = parseFloat(bioGaugeInfo[gaugeID].value)

    function pickColor() {
        if (value < setpoint - 50) { return "yellow" }
        else if (value > setpoint + 50) { return "red" }
        else { return "green" }
    }

    let new_thermo_gauge = {
        domain: { x: [0, 1], y: [0, 1] },
        value: value,
        title: { text: bioGaugeInfo[gaugeID].title },
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
    }
    Plotly.restyle(gaugeID, new_thermo_gauge)
}

function setGaugeValue(amount, gaugeID) {
    Plotly.update(gaugeID, { value: amount > 100 ? 100 : amount, title: motorGaugeInfo[gaugeID].title })
}

function clearBioreactor() {
    sendPOST('delete-bioreactor', 'delete-bioreactor')

    for (let x = 0; x < 2; x++) {
        bio_thermo_traces[x].x = []
        bio_ph_traces[x].x = []
        bio_oxygen_traces[x].x = []
        bio_turbidity_traces[x].x = []
        bio_pro_traces[x].x = []

        bio_thermo_traces[x].y = []
        bio_ph_traces[x].y = []
        bio_oxygen_traces[x].y = []
        bio_turbidity_traces[x].y = []
        bio_pro_traces[x].y = []
    }
    Plotly.newPlot('bio-thermo-graph', bio_thermo_traces, bio_thermo_layout, { scrollZoom: true });
    Plotly.newPlot('bio-ph-graph', bio_ph_traces, pH_layout, { scrollZoom: true });
    Plotly.newPlot('bio-oxygen-graph', bio_oxygen_traces, oxygen_layout, { scrollZoom: true });
    Plotly.newPlot('bio-turbidity-graph', bio_turbidity_traces, turbidity_layout, { scrollZoom: true });
    Plotly.newPlot('bio-pro-graph', bio_pro_traces, pro_layout, { scrollZoom: true });
}
