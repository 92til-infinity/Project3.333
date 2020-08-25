import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
// import CanvasJS from '../assets/canvasjs.min';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Pie extends Component {
    render() {
        const options = {
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "Website Traffic Sources"
            },
            data: [{
                type: "pie",
                startAngle: 75,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}%",
                dataPoints: [
                    { y: 18, label: "alex" },
                    { y: 49, label: "Yoda" },
                    { y: 9, label: "ryan" },
                    { y: 5, label: "scott" },
                    { y: 19, label: "anthony" }
                ]
            }]
        }
        return (
            <div>
                <CanvasJSChart options={options}
                /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}

export default Pie;