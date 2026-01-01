'use server';

import qs from 'query-string';

//EXAMPLE OF QS ->
// const params = {
//     vs_currency: 'usd',
//     order: 'market_cap_desc',
//     per_page: 10
// };
//
// const url = `https://api.coingecko.com/api/v3/coins/markets?${qs.stringify(params)}`;
// // Result: "...?vs_currency=usd&order=market_cap_desc&per_page=10"


const BASE_URL = process.env.COINGECKO_BASE_URL;
const API_KEY = process.env.COINGECKO_API_KEY;

if(!BASE_URL) throw new Error('Could not get base url');
if(!API_KEY) throw new Error('Could not get api key');

export async function fetcher<T> (

    endpoint: string,
    params?: QueryParams,
    revalidate = 60,

) : Promise<T> {

    const url = qs.stringifyUrl({
        url:`${BASE_URL}${endpoint}`,
        query: params,
    }, {skipEmptyString: true, skipNull: true});

    const response = await fetch(url, {
        headers: {

            "x-cg-pro-api-key": API_KEY,
            "Accept": "application/json", // Please send me JSON
            "Content-Type": "application/json", // I am sending you JSON

        } as Record<string, string>, //telling jbrdsti to ts ki key and value string ke fomrat hi hone h, aane h, so faaltu ki worry na kro ki oho kya pata env me string ke format nhi h and hence not throw error
        //actually header ko leke ts is very strict isliye hi ese karnaame h.
        next: {revalidate}
    });

    if(!response.ok){
        const errorBody: CoinGeckoErrorBody = await response.json()
            .catch(() => {});

        // The .catch(() => {}) says:
        //
        //     "Try to turn this error response into JSON. If it's not JSON (if it fails), just ignore that failure and return undefined."
        //
        // If you didn't have that empty catch, and the server sent back HTML, your code would crash on the .json() line, and you would never get to your throw new Error(...) line. You would just see a confusing "SyntaxError: Unexpected token < in JSON at position 0" in your console.

        throw new Error(
            `API Error: ${response.status}: ${errorBody.error || response.statusText}`);
    }

    return response.json();
}