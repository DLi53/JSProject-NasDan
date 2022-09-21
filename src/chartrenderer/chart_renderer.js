import Chart from 'chart.js/auto';
import StockInfo from "./stock_info";
import { getTickerData, getHistoricalData } from "../utils/api_utils";


const labels = [
    // 'January',
    // 'February',
    // 'March',
    // 'April',
    // 'May',
    // 'June',

];

const data = {
    labels: labels,
    datasets: [{label:""}
        // {
        // label: 'My First dataset',
        // backgroundColor: 'rgb(255, 26, 104, 0.2)', // dot color
        // borderColor: 'rgb(255, 99, 132)', //line color
        // data:  [0, 10, 5, 2, 20, 30, 45,0],
        // }, {
        // label: 'My Second dataset',
        // backgroundColor: 'rgb(25, 9, 1)',
        // borderColor: 'rgb(25, 99, 132)', 
        // data: [12, 100, 50, 22, 0, 30, 3, 2],
        // }
    ]
};

const options = {
    interaction: {
        intersect: false,
        mode: 'index',
    },
    plugins: {
        title: {
            // display: true,
            text: (ctx) => {
                const { axis = 'xy', intersect, mode } = ctx.chart.options.interaction;
                return 'Mode: ' + 'nearest' + ', axis: ' + 'xy' + ', intersect: ' + 'false';
            }
        },
    },
    // scales: {
    //     x: {
    //         display: true,
    //     },
    //     y: {
    //         display: true,
    //         type: 'logarithmic',
    //         suggestedMin: 30,
    //         suggestedMax: 50,
    //     }
    // }
}

const config = {
    type: 'line',
    data: data,
    options: options
};

export default class ChartRenderer {
    constructor() {
        this.togglebutton = document.getElementById("toggle-graph")
        this.clearbutton = document.getElementById("clear-graph")


        this.searchBar = document.getElementById("search");
        this.inputElement = document.getElementById("search-input");
        this.searchbutton = document.getElementById("search-button")

        this.weekbutton = document.getElementById("1w")
        this.monthbutton = document.getElementById("1m")
        this.sixmonthbutton = document.getElementById("6m")
        this.yearbutton = document.getElementById("1y")

        this.chart = new Chart(
            document.getElementById('myChart'),
            config
        );
        this.stockInfo = new StockInfo();
        
        this.togglebutton.addEventListener("click", e => {
            e.preventDefault();
            this.togglegraph()
        })

        this.clearbutton.addEventListener("click", e => {
            e.preventDefault();
            this.cleargraph()
        })


        this.searchBar.addEventListener("submit", e => {
            e.preventDefault();

            const ticker = this.inputElement.value;
            getTickerData(ticker).then(data => {
                this.updateData(data);
                // console.log('this works');
            }).catch(() => {
                console.log("Bad ticker bro");
            })

            getHistoricalData(ticker).then(data => {
                // this.updateData(data);
                // console.log('BROOOOO this works');
                // console.log(data);
                this.updateChart(data.data)
            }).catch(() => {
                console.log("BROOO Bad ticker bro");
            })
        })

        this.searchbutton.addEventListener("click", e => {
            e.preventDefault();

            const ticker = this.inputElement.value;

            getTickerData(ticker).then(data => {
                this.updateData(data);
                // console.log('this works');
            }).catch(() => {
                console.log("Bad ticker bro");
            })

            getHistoricalData(ticker).then(data => {
                // this.updateData(data);
                // console.log('BROOOOO this works');
                // console.log(data);
                this.updateChart(data.data)

            }).catch(() => {
                console.log("BROOO Bad ticker bro");
            })


        })


        this.weekbutton.addEventListener("click", e => {
            e.preventDefault();
            const range = "1h"
            const tickers = this.chart.config.data.datasets
            // this.clearChart()
            tickers.forEach(object => {
                const sym = object.label;
                getHistoricalData(sym,range).then(data => {
                    this.updatetime(data.data)
                }).catch(() => {
                    console.log("BROOO Bad ticker bro");
                })
            })
        }) 

        this.monthbutton.addEventListener("click", e => {
            e.preventDefault();
            const range = "1day"
            const ticker = this.chart.config.data.datasets
            // this.clearChart()
            ticker.forEach(object => {
                const sym = object.label;
                getHistoricalData(sym, range).then(data => {
                    this.updatetime(data.data)
                }).catch(() => {
                    console.log("BROOO Bad ticker bro");
                })
            })
        })

        this.sixmonthbutton.addEventListener("click", e => {
            e.preventDefault();
            const range = "1week"
            const ticker = this.chart.config.data.datasets
            // this.clearChart()
            ticker.forEach(object => {
                const sym = object.label;
                getHistoricalData(sym, range).then(data => {
                    this.updatetime(data.data)
                }).catch(() => {
                    console.log("BROOO Bad ticker bro");
                })
            })
        })

        this.yearbutton.addEventListener("click", e => {
            e.preventDefault();
            const range = "1month"
            const ticker = this.chart.config.data.datasets
            // this.clearChart()
            ticker.forEach(object => {
                const sym = object.label;
                getHistoricalData(sym, range).then(data => {
                    this.updatetime(data.data)
                }).catch(() => {
                    console.log("BROOO Bad ticker bro");
                })
            })
        })

        
    }

    togglegraph(){
        if (this.chart.config.type === 'line') {
            this.chart.config.type = 'bar'
        } else {
            // console.log("im here")
            this.chart.config.type = 'line'
        }
        this.chart.update();

    }

    updateData(data) {
        // console.log("updating chart...", data);
        // console.log(data)
        this.stockInfo.updateData(data.data.symbol, data.data.peRatio, data.data.volume, data.data.week52High, data.data.week52Low);

    }

    updateChart(data) {
        // console.log("updating chart...", data);

        let sym = data.meta.symbol
        let values = data.values
        // borderColor: , //line color
        // let colornum = Math.random()
        let color1 = Math.floor((Math.random() * 255) )
        let color2 = Math.floor((Math.random() * 255) )
        let color3 = Math.floor((Math.random() * 255) )

        // console.log(values);
        let dates = []
        let closes = []

        values.forEach(ele => {
            dates.unshift(ele.datetime)
        })
        values.forEach(ele => {
            closes.unshift(ele.close)
        })

        let pushdata = { 
            label: sym, 
            data: closes, 
            borderColor: `rgb(${color1},${color2},${color3})`,
            backgroundColor: `rgb(${color3},${color2},${color2})`
        }


        this.chart.config.data.labels = dates
        // console.log(this.chart.config.data.labels);

        // this.chart.config.data.datasets[0].label = sym
        this.chart.config.data.datasets.push(pushdata)

        // this.chart.config.data.datasets[0].data = closes
        // this.chart.config.data.datasets.push({data: closes})


        this.chart.update();
        // console.log(chartLabels);
    }

    cleargraph() {
        this.chart.config.data.labels = []
        this.chart.config.data.datasets =[]
        // { label: "" }
        this.chart.update();
    }

    updatetime(data) {
        let sym = data.meta.symbol
        let sets = this.chart.config.data.datasets
        let symidx = 0
        for (let i = 0; i < sets.length; i++) {
            if (sets[i].label === sym) {symidx = i}
        }
        console.log(symidx);
        let values = data.values
        // borderColor: , //line color
        // let colornum = Math.random()
        // let color1 = Math.floor((Math.random() * 255))
        // let color2 = Math.floor((Math.random() * 255))
        // let color3 = Math.floor((Math.random() * 255))

        // console.log(values);
        let dates = []
        let closes = []

        values.forEach(ele => {
            dates.unshift(ele.datetime)
        })
        values.forEach(ele => {
            closes.unshift(ele.close)
        })

        let pushdata = {
            label: sym,
            data: closes,
            // borderColor: `rgb(${color1},${color2},${color3})`,
            // backgroundColor: `rgb(${color3},${color2},${color2})`
        }


        this.chart.config.data.labels = dates
        // console.log(this.chart.config.data.labels);

        // this.chart.config.data.datasets[0].label = sym
        // this.chart.config.data.datasets.push(pushdata)

        this.chart.config.data.datasets[symidx].data = closes
        // this.chart.config.data.datasets.push({data: closes})


        this.chart.update();
    }

    addMACD() {
        this.chart.config.data.datasets = []

    }
    applyLogScale() {
    }
}


// const test = [{ date: 01, price: 11 }, { date: 02, price: 12 }, { date: 03, price: 13 }]
// console.log(test);
// console.log('yo');
// let arr1 = []
// let arr2 = []
// values.forEach(element => {
//     arr1.push(element.datetime)
//     arr2.push(element.close)
// });