import Chart from 'chart.js/auto';
import StockInfo from "./stock_info";
import { getTickerData } from "../utils/api_utils";
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
            }).catch(() => {
                console.log("Bad ticker bro");
            })
        })
    }

    updateData(data) {
        // console.log("updating chart...", data);
        console.log("updating chart...", data);
        console.log(data.data.week52High)
        this.stockInfo.updateData(data.data.peRatio, data.data.volume, data.data.week52High, data.data.week52Low);
    }


    addMACD() {
    }
    applyLogScale() {
    }
}