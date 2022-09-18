const dataLabels = [
    "PE Ratio",
    "Avg Volume",
    "52 Week High",
    "52 Week Low"
]

export default class StockInfo {
    constructor() {
        const stockInfo = document.getElementById("stock-info");
        const dataList = document.createElement("ul");
        for (const label of dataLabels) {
            const labelElement = document.createElement("li");
            labelElement.innerHTML = label;
            dataList.appendChild(labelElement);
        }
        stockInfo.appendChild(dataList);
    }

}