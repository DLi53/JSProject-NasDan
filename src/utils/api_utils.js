import axios from 'axios';

// const token = `sk_a618e14a285e467fa973af590a42a321`
// const token = `sk_992658d61dc7482d8da26ae70be9b06b`
// const token = `sk_8ac5181cdf8e4ba4a5d029e46aefc7b8`
// const token = `sk_fa744cb471d84b119d16d1c0cd39768d`
// const token = `sk_d0237dad2c8a4f73971d2a0828756e54`
// const token = 'sk_4b96220917104cc787963397cf74a7df'
// const token = 'sk_c26aec869ab64641a7957832426051fc'
// const token = 'sk_7df1a82f28e74cdba723bc09daad63c3'
const token = 'sk_8805f42c08f84be99d44789c5bf13609'

const tokenA = 'GJUQ4UJFZ15E0MOY'




export const getTickerData = (ticker) => {
    
    return Promise.resolve(
        // console.log('hi')
        // axios.get(`https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${token}`)
        // axios.get(`https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=sk_3d2eb0ffc27c4c3bbfb0a159f4a0112d`)
        axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${ticker}&apikey=${tokenA}`)
    );
}

// export const getHistoricalData = (ticker,range='1m') => {
export const getHistoricalData = (ticker,range='TIME_SERIES_WEEKLY') => {
    return Promise.resolve(
        // axios.get(`https://cloud.iexapis.com/stable/stock/${ticker}/chart/${range}/?token=${token}`)
        // axios.get(`https://cloud.iexapis.com/stable/stock/${ticker}/chart/${range}/?token=sk_3d2eb0ffc27c4c3bbfb0a159f4a0112d`) 
        // axios.get(`https://api.twelvedata.com/time_series?symbol=${ticker}&interval=${range}&apikey=b0258fd3199a4e6ea92790d4e7db7382`)
        axios.get(`https://www.alphavantage.co/query?function=${range}&symbol=${ticker}&apikey=${tokenA}`)
    );
}

// https://cloud.iexapis.com/stable/stock/aapl/chart/date/20210104?token=MY_TOKEN

// export const yahooData = (ticker, range = '1month') => {
//     return Promise.resolve(
//         axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/aapl`)
//     );
// }



// 1. https://cloud.iexapis.com/stable
// 2. /stock/${ticker}
//       /stock/aapl/chart/1y
// 3. /quote?token=sk_3d2eb0ffc27c4c3bbfb0a159f4a0112d

// 12Data: b0258fd3199a4e6ea92790d4e7db7382
// https://api.twelvedata.com
// ?symbol = AAPL & interval=5min & output=200

// https://api.twelvedata.com/time_series?symbol=AAPL&interval=1month&apikey=b0258fd3199a4e6ea92790d4e7db7382

// 1min, 5min, 15min, 30min, 45min, 1h, 2h, 4h, 8h, 1day, 1week, 1month"

//IEXCLOUD
// 5d, 1mm, 1m, 3m, 6m, ytd, 1y, 2y, 5y, max