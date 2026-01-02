'use server';

// If you import a function from a regular .ts file into a Client Component
// (a file with "use client"), Next.js "copies and pastes" that code into the bundle
// sent to the user's browser.

// When you add "use server" to the top of a file, you are bolting that file to the server floor.
//It changes the behavior from "default" to "restricted."
//Even if a Client Component invites (imports) a function from this file, Next.js refuses to send the actual code to the browser.
//Instead, it creates a "Phone Call" (an HTTP POST request).
//When the user clicks a button in the browser, it "calls" the server, the server runs the code in private, and just yells the result back to the browser.

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