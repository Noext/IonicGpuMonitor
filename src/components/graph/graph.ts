import {Component, Input, ViewChild} from '@angular/core';
import {Events} from 'ionic-angular';
import {Chart} from 'chart.js';
import moment from 'moment';
/**
 * Generated class for the GraphComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'graph',
    templateUrl: 'graph.html',
    inputs: ['graphName', 'type']
})
export class GraphComponent {

    @Input('graphName') graphName: any;
    @Input('type') type: any;
    @Input('min') min: any;
    @Input('maximum') maximum: any;
    @Input('step') step: any;


    @ViewChild('graph') graph;
    chart: any;

    constructor(public events: Events) {

    }

    ngOnInit() {
        let self = this;

        this.chart = new Chart(this.graph.nativeElement, {
            type: 'line',
            options: {
                animation :false,
                scales: {
                    xAxes: [
                        {
                            display: false,
                            gridLines: {
                                lineWidth: 0.5
                            }
                        }
                    ],
                    yAxes: [
                        {
                            gridLines: {
                                color: '#181818',
                                lineWidth: 0.5
                            },
                            id: 'B',
                            type: 'linear',
                            position: 'left',
                            ticks: {
                                max: parseInt(self.maximum),
                                min: parseInt(self.min),
                                step: parseInt(self.step)
                            },
                            scaleLabel: {
                                display: false,
                                labelString: ''
                            }
                        }
                    ]
                }
            },
            data: {
                labels: [],
                datasets: [
                    {
                        label: self.graphName,
                        fill: false,
                        lineTension: 0,
                        backgroundColor: "#1C4E7C",
                        borderColor: "#1C4E7C",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 0,
                        pointHoverRadius: 0,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 0,
                        pointRadius: 0,
                        pointHitRadius: 0,
                        borderWidth: 1,
                        data: [],
                        spanGaps: false,
                    }
                ]
            }
        });

        self.events.subscribe('performances:updated', (performances) => {

            let data = {};
            let self = this;
            performances.forEach(function (value, index, ar) {
                data[moment.unix(value.time).format("HH:mm:ss")] = fetchFromObject(value, self.type);
                self.chart.data.datasets[0].label =  fetchFromObject(value, self.type);
            });

            self.chart.data.labels = Object.keys(data);
            self.chart.data.datasets[0].data = Object.keys(data).map(function (key) {
                return data[key];
            });
            self.chart.update();
        });

        function fetchFromObject(obj, prop) {


            if (typeof obj === 'undefined') {
                return false;
            }

            var _index = prop.indexOf('.');
            if (_index > -1) {
                return fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index + 1));
            }

            return obj[prop];
        }
    }
}
