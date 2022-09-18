import Chart from 'chart.js/auto';
import StockInfo from "./stock_info";


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
        data: [0, 10, 5, 2, 20, 30, 45,0],
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
        this.chart = new Chart(
            document.getElementById('myChart'),
            config
        );
        this.stockInfo = new StockInfo();
    }
    updateData() {
    }
    addMACD() {
    }
    applyLogScale() {
    }
}