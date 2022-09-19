import Chart from 'chart.js/auto';
import StockInfo from "./stock_info";
import { getTickerData, getHistoricalData } from "../utils/api_utils";
// import { values } from 'core-js/core/array';
// import ChartData from "./chart_data";

// const chartdata = new ChartData("AAPL", "1m")

const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',

];

const data = {
    labels: labels,
    datasets: [{
        label: 'My First dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data:  [0, 10, 5, 2, 20, 30, 45,0],
    }]
};

const options = {}

const config = {
    type: 'line',
    data: data,
    options: options
};

export default class ChartRenderer {
    constructor() {
        this.searchBar = document.getElementById("search");
        this.inputElement = document.getElementById("search-input");
        this.searchbutton = document.getElementById("search-button")
        this.chart = new Chart(
            document.getElementById('myChart'),
            config
        );
        this.stockInfo = new StockInfo();

        this.searchBar.addEventListener("submit", e => {
            e.preventDefault();

            const ticker = this.inputElement.value;
            getTickerData(ticker).then(data => {
                this.updateData(data);
                console.log('this works');
            }).catch(() => {
                console.log("Bad ticker bro");
            })

            getHistoricalData(ticker).then(data => {
                // this.updateData(data);
                console.log('BROOOOO this works');
                console.log(data);
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
                console.log('this works');
            }).catch(() => {
                console.log("Bad ticker bro");
            })

            getHistoricalData(ticker).then(data => {
                // this.updateData(data);
                console.log('BROOOOO this works');
                console.log(data);
            }).catch(() => {
                console.log("BROOO Bad ticker bro");
            })


        })
    }

    updateData(data) {
        // console.log("updating chart...", data);
        console.log(data)
        this.stockInfo.updateData(data.data.symbol, data.data.peRatio, data.data.volume, data.data.week52High, data.data.week52Low);

    }

    updateChart(data) {
        console.log("updating chart...", data);
        // console.log(this.chart)
        let sym = data.meta.symbol
        
        let values = data.values
        let dates = []
        let closes = []

        console.log(sym);
        console.log(values);




        values.forEach(ele => {
            dates.push(ele.datetime)
        })
        values.forEach(ele => {
            closes.push(ele.close)
        })


        this.chart.config.data.labels = dates
        console.log(this.chart.config.data.labels);

        this.chart.config.data.datasets[0].label = sym
        this.chart.config.data.datasets[0].data = closes

        this.chart.update();
        console.log(chartLabels);
    }

    addMACD() {
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