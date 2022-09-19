import axios from 'axios';

export const getTickerData = (ticker) => {
    return Promise.resolve(
        axios.get(`https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=sk_3d2eb0ffc27c4c3bbfb0a159f4a0112d`)
    );
}