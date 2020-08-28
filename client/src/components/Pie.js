import React, { Component } from 'react';
import CanvasJSReact from './assets/canvasjs.react';
import { BudgetProvider } from '../store';
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
                    { y: 18, label: "Food" },
                    { y: 49, label: "Fun" },
                    { y: 9, label: "Rent" },
                    { y: 5, label: "Transport" },
                    { y: 19, label: "School" }
                ]
            }]
        }
        return (
            <BudgetProvider>
                <div>
                    <CanvasJSChart options={options}
                    /* onRef={ref => this.chart = ref} */
                    />
                    {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
                </div>
            </BudgetProvider >
        );
    }
}

export default Pie;