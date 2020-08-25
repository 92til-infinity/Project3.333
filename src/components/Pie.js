var React = require('react');
var Component = React.Component;
var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class PIE extends Component {
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
                    { y: 18, label: "Direct" },
                    { y: 49, label: "Organic Search" },
                    { y: 9, label: "Paid Search" },
                    { y: 5, label: "Referral" },
                    { y: 19, label: "Social" }
                    // need to figure how to relate bidget input to the 'y' input/variable
                ]
            }]
        }
        return (
            <div>
                <CanvasJSChart options={options}
                    onRef={ref => this.chart = ref}
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}

export default PIE                  
