import React from 'react'
import {fetcher} from "@/lib/coingecko.actions";
import Image from "next/image";
import {formatCurrency} from "@/lib/utils";
import {CoinOverviewFallback} from "@/components/home/fallback";
import CandleStickChart from "@/components/CandleStickChart";

const CoinOverview = async () => {

    let coin, coinOHLCData;

   try{

       [coin,coinOHLCData] = await Promise.all([

           await fetcher<CoinDetailsData>('/coins/bitcoin', {
                   dex_pair_format:'symbol'
           }),

           await fetcher<OHLCData[]>('/coins/bitcoin/ohlc', {
                   vs_currency:'usd',
                   days:1,
           }),

       ]);





   } catch (e) {
        console.log(e)
       return <CoinOverviewFallback />
   }

    return (
        <div id="coin-overview">

            <CandleStickChart data={coinOHLCData} coinId = 'bitcoin'>

                <div className="header pt-2">
                    <Image src={coin.image.large} alt={coin.name} width={56} height={56}/>
                    <div className="info">
                        <p>{coin.name } / {coin.symbol.toUpperCase()}</p>
                        <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
                    </div>
                </div>

            </CandleStickChart>

        </div>
    );



}



export default CoinOverview
