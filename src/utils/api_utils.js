import axios from 'axios';

export const getTickerData = (ticker) => {
    return Promise.resolve(
        axios.get(`https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=sk_3d2eb0ffc27c4c3bbfb0a159f4a0112d`)
    );
}

export const getHistoricalData = (ticker,range='1month') => {
    return Promise.resolve(
        axios.get(`https://api.twelvedata.com/time_series?symbol=${ticker}&interval=${range}&apikey=b0258fd3199a4e6ea92790d4e7db7382`)
    );
}


// (getTickerData("AAPL").then(data => {console.log(data);}));
// 1. https://cloud.iexapis.com/stable
// 2. /stock/${ticker}
//       /stock/aapl/chart/1y
// 3. /quote?token=sk_3d2eb0ffc27c4c3bbfb0a159f4a0112d

// 12Data: b0258fd3199a4e6ea92790d4e7db7382
// https://api.twelvedata.com
// ?symbol = AAPL & interval=5min & output=200

// https://api.twelvedata.com/time_series?symbol=AAPL&interval=1month&apikey=b0258fd3199a4e6ea92790d4e7db7382

// 1min, 5min, 15min, 30min, 45min, 1h, 2h, 4h, 8h, 1day, 1week, 1month"