import Chart from 'chart.js/auto';
import StockInfo from "./stock_info";
import { getTickerData, getHistoricalData, yahooData } from "../utils/api_utils";


const labels = [
    // 'January',
    // 'February',
    // 'March',
    // 'April',
    // 'May',
    // 'June',
    // 'July',

];

const data = {
    labels: labels,
    datasets: [ {label:""},
        // {
        // label: 'Stock Ticker',
        // backgroundColor: 'rgb(31, 97, 140, 0.2)', // dot color
        // borderColor: 'rgb(88, 214, 142)', //line color
        // data:  [0, 10, 5, 2, 20, 30, 45,0],
        // }
    ]
};

const options = {
    interaction: {
        intersect: false,
        mode: 'index',
    },
    responsive: true,
    plugins: {
        title: {
            // display: true,
            text: (ctx) => {
                const { axis = 'xy', intersect, mode } = ctx.chart.options.interaction;
                return 'Mode: ' + 'nearest' + ', axis: ' + 'xy' + ', intersect: ' + 'false';
                
            }
        },
       
    },
    scales: {
        x: {
            // display: true,
            ticks: {
                maxTicksLimit: 7
            }
        },
        y: {
            display: true,
            // type: 'logarithmic',
            // suggestedMin: 30,
            // suggestedMax: 50,
        }
    }
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
        this.macdbutton = document.getElementById("macd")


        this.searchBar = document.getElementById("search");
        this.inputElement = document.getElementById("search-input");
        this.searchbutton = document.getElementById("search-button")

        this.weekbutton = document.getElementById("1w")
        this.monthbutton = document.getElementById("1m")
        this.sixmonthbutton = document.getElementById("6m")
        this.yearbutton = document.getElementById("1y")
        this.fiveyearbutton = document.getElementById("5y")

        this.maxbutton = document.getElementById("max")


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

            console.log('hihii')
            const ticker = this.inputElement.value;
            let labels = []
            this.chart.config.data.datasets.forEach(ele => {
                labels.push(ele.label)
            })
            this.inputElement.id = "search-input"
            if (!labels.includes(ticker.toUpperCase())) {
            
                getTickerData(ticker).then(data => {
                    this.updateData(data);
                    this.inputElement.placeholder = "Search Stock Ticker...";
                    console.log('this works');
                }).catch(() => {
                    // console.log("Bad ticker bro");
                    this.inputElement.id = "shake";
                    this.inputElement.placeholder = "Invalid Ticker";
                })

                // yahooData(ticker).then(data => {
                getHistoricalData(ticker).then(data => {
                    // this.updateData(data);
                    // console.log('BROOOOO this works');
                    // console.log(data);
                    this.updateChart(data.data)
                    this.inputElement.placeholder = "Search Stock Ticker...";
                }).catch(() => {
                    // console.log("BROOO Bad ticker bro");
                    this.inputElement.placeholder = "Invalid Ticker";
                    this.inputElement.id = "shake";
                })
            } else {
                this.inputElement.id = "shake";
                this.inputElement.placeholder = "Already Searched";
            }

        })

        this.searchbutton.addEventListener("click", e => {
            e.preventDefault();

            const ticker = this.inputElement.value;

            let labels = []
            this.chart.config.data.datasets.forEach(ele => {
                labels.push(ele.label)
            })
            this.inputElement.id = "search-input"

            if (!labels.includes(ticker.toUpperCase())) {

                getTickerData(ticker).then(data => {
                    this.updateData(data);
                    // console.log('this works');
                    this.inputElement.placeholder = "Search Stock Ticker...";

                }).catch(() => {
                    // console.log("Bad ticker bro");
                    this.inputElement.id = "shake"
                    this.inputElement.placeholder = "Invalid Ticker";
                })

                getHistoricalData(ticker).then(data => {
                    // this.updateData(data);
                    // console.log('BROOOOO this works');
                    // console.log(data);
                    this.updateChart(data.data)

                }).catch(() => {
                    // console.log("BROOO Bad ticker bro");
                    this.inputElement.id = "shake";
                })

            } else {
                this.inputElement.id = "shake";

            }
            this.inputElement.id = "search-input"
        })


        this.weekbutton.addEventListener("click", e => {
            e.preventDefault();
            const range = "5d"
            const tickers = this.chart.config.data.datasets
            // this.clearChart()
            tickers.forEach(object => {
                const sym = object.label;
                // console.log(sym);
                getHistoricalData(sym,range).then(data => {
                    this.updatetime(data.data)
                }).catch(() => {
                    // console.log("BROOO Bad ticker bro");
                })
            })
        }) 

        this.monthbutton.addEventListener("click", e => {
            e.preventDefault();
            const range = "1m"
            const ticker = this.chart.config.data.datasets
            // this.clearChart()
            ticker.forEach(object => {
                const sym = object.label;
                getHistoricalData(sym, range).then(data => {
                    this.updatetime(data.data)
                }).catch(() => {
                    // console.log("BROOO Bad ticker bro");
                })
            })
        })

        this.sixmonthbutton.addEventListener("click", e => {
            e.preventDefault();
            const range = "6m"
            const ticker = this.chart.config.data.datasets
            // this.clearChart()
            ticker.forEach(object => {
                const sym = object.label;
                getHistoricalData(sym, range).then(data => {
                    this.updatetime(data.data)
                }).catch(() => {
                    // console.log("BROOO Bad ticker bro");
                })
            })
        })

        this.yearbutton.addEventListener("click", e => {
            e.preventDefault();
            const range = "1y"
            const ticker = this.chart.config.data.datasets
            // this.clearChart()
            ticker.forEach(object => {
                const sym = object.label;
                getHistoricalData(sym, range).then(data => {
                    this.updatetime(data.data)
                }).catch(() => {
                    // console.log("BROOO Bad ticker bro");
                })
            })
        })

        this.fiveyearbutton.addEventListener("click", e => {
            e.preventDefault();
            const range = "5y"
            const ticker = this.chart.config.data.datasets
            // this.clearChart()
            ticker.forEach(object => {
                const sym = object.label;
                getHistoricalData(sym, range).then(data => {
                    this.updatetime(data.data)
                }).catch(() => {
                    // console.log("BROOO Bad ticker bro");
                })
            })
        })

        this.maxbutton.addEventListener("click", e => {
            e.preventDefault();
            const range = "max"
            const ticker = this.chart.config.data.datasets
            // this.clearChart()
            ticker.forEach(object => {
                const sym = object.label;
                getHistoricalData(sym, range).then(data => {
                    this.updatetime(data.data)
                }).catch(() => {
                    // console.log("BROOO Bad ticker bro");
                })
            })
        })

        this.macdbutton.addEventListener("click", e => {
            e.preventDefault();
            this.addMACD();
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
        this.stockInfo.updateData(data.data.symbol, data.data.peRatio, data.data.avgTotalVolume, data.data.week52High, data.data.week52Low, data.data.latestPrice);

    }

    updateChart(data) {
        // console.log("updating chart...", data);
        // console.log(data);
        // let sym = data.meta.symbol
        // let values = data.values

        //iexcloud
        let sym = data[0].symbol
        // console.log(sym);

        // borderColor: , //line color
        // let colornum = Math.random()
        let color1 = Math.floor((Math.random() * 255)-50)
        let color2 = Math.floor((Math.random() * 255)-50)
        let color3 = Math.floor((Math.random() * 255))

        // console.log(values);
        let dates = []
        let closes = []

        // values.forEach(ele => {
        //     dates.unshift(ele.datetime)
        // })
        // values.forEach(ele => {
        //     closes.unshift(ele.close)
        // })

        data.forEach(ele => {
            dates.unshift(ele.label)
        })
        data.forEach(ele => {
            closes.unshift(ele.close)
        })

        // console.log(dates);
        // console.log(closes);

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
        // console.log(data);
        let sym = data[0].symbol
        let sets = this.chart.config.data.datasets
        let symidx = 0
        for (let i = 0; i < sets.length; i++) {
            if (sets[i].label === sym) {symidx = i}
        }
        // console.log(symidx);
        // console.log(symidx);
        // let values = data.values

        // borderColor: , //line color
        // let colornum = Math.random()
        // let color1 = Math.floor((Math.random() * 255))
        // let color2 = Math.floor((Math.random() * 255))
        // let color3 = Math.floor((Math.random() * 255))

        // console.log(values);
        let dates = []
        let closes = []

        data.forEach(ele => {
            dates.push(ele.label)
        })
        data.forEach(ele => {
            closes.push(ele.close)
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
        let dataset = this.chart.config.data.datasets
        if (dataset[dataset.length - 1].label !== "MACD" && dataset[dataset.length - 1].label !== "") {

            let olddata = dataset[dataset.length-1].data
            let ll = Math.ceil(olddata.length/10)
            // console.log(olddata);

            let firstsum = 0
            for(let j =0; j <ll; j++) {
                firstsum += parseFloat(olddata[j])

            let avgfirstsum = firstsum/ll

            let macdArr = []
            for (let k = 0; k < ll; k++) {macdArr.push(avgfirstsum)}


            for (let i=0; i< olddata.length; i++) {
                let sumsum = 0
                let sum = olddata.slice(i,i+ll)
                sum.forEach((e) =>{ sumsum += parseFloat(e) })
                // console.log(sumsum);
                // console.log(sum);
                let avg = sumsum/sum.length
                macdArr.push(avg)
                // console.log(avg);
                // console.log(macdArr);
            }
            // console.log(macdArr);
            let pushdata = {
                label: "MACD",
                data: macdArr,
                borderColor: `rgb(255,255,255)`,
                backgroundColor: `rgb(255,255,255)`
            }


            this.chart.config.data.datasets.push(pushdata)
            this.chart.update()
        }

        
    }

    // applyLogScale() {
    //     this.chart.config.options.scales.y.type = "logarithmic" 
    // }
    }


}
