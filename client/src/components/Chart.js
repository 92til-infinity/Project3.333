import React, { Component } from 'react';
import { BudgetConsumer } from '../store';


class ExpenseChart extends Component {
    render() {
        var colors = ['#007bff', '#28a745', '#333333', '#c3e6cb', '#dc3545', '#6c757d'];
        var donutOptions = {

            legend: { position: 'bottom', padding: 5, labels: { pointStyle: 'circle', usePointStyle: true } }
        };
        const chDonutData3 = {
            labels: ['Food', 'Fun', 'Transport', 'School', 'Rent'],
            datasets: [
                {
                    backgroundColor: colors.slice(0, 3),
                    borderWidth: 0,
                    data: [20, 20, 20, 20, 20]
                }
            ]
        };
        const chDonut3 = document.getElementById("chDonut3");
        if (chDonut3) {
            new Chart(chDonut3, {
                type: 'pie',
                data: chDonutData3,
                options: donutOptions
            });
        }
        return (
            <BudgetConsumer>
                <div class="container">
                    <div class="row my-3">
                        <div class="col">
                            <h4>Bootstrap 4 Chart.js</h4>
                        </div>
                    </div>
                    <div class="row py-2">
                        <div class="col-md-4 py-1">
                            <div class="card">
                                <div class="card-body">
                                    <canvas id="chDonut3"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </BudgetConsumer>
        )
    }
}

export default ExpenseChart