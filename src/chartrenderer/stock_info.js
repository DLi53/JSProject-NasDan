const dataLabels = (symbol ='SPY',peRatio = "0", avgvolume = "0", wkhigh52 = "0", wklow52 = "0") =>  {
    return [
        `Ticker : ${symbol}`,
        `PE Ratios : ${peRatio}`,
        `Avg Volume : ${avgvolume}`,
        `52 Week High : ${wkhigh52}`,
        `52 Week Low : ${wklow52}`
    ]}

export default class StockInfo {
    constructor() {
        this.stockInfo = document.getElementById("stock-info");
        this.dataList = document.createElement("ul");

        for (const label of dataLabels()) {
            const labelElement = document.createElement("li");
            labelElement.innerHTML = label;
            this.dataList.appendChild(labelElement);
        }
        this.stockInfo.appendChild(this.dataList);

    }

    updateData(symbol = "SPY", peRatio = "0", avgvolume = "0", wkhigh52 = "0", wklow52 = "0") {
        console.log("stockInfo updating...");
        // dataLabels = dataLabels(data)

        let disstockInfo = this.stockInfo
        let disdataList = this.dataList
        console.log(dataLabels(disdataList));

        while (disdataList.hasChildNodes()) {
            disdataList.removeChild(disdataList.firstChild)
        }

        for (const label of dataLabels(symbol,peRatio, avgvolume, wkhigh52, wklow52)) {
            const labelElement = document.createElement("li");
            labelElement.innerHTML = label;
            disdataList.appendChild(labelElement);
        }
        disstockInfo.appendChild(disdataList);
  
    }
}