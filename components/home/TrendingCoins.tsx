import React from 'react'
import {fetcher} from "@/lib/coingecko.actions";
import DataTable from "@/components/DataTable";
import Link from "next/link";
import Image from "next/image";
import {cn, formatCurrency} from "@/lib/utils";
import {TrendingDown, TrendingUp} from "lucide-react";

const TrendingCoins =async () => {
    const trendingCoins = await fetcher<{coins: TrendingCoin[]
    }>('/search/trending', undefined, 300)

    const columns:DataTableColumn<TrendingCoin>[] =  [
        {
            header:'Name' ,
            cellClassName:'name-cell',
            cell:(coin) => {
                const item = coin.item;
                return(
                    <Link href={`/coin/${item.id}`} className="flex items-center gap-2">
                        <Image src={item.large} alt={item.name} width={36} height={36} />
                        <p className="font-medium">{item.name}</p>
                    </Link>
                )
            },
        },
        {
            header:'24Hr Change',
            cellClassName:'name-cell',
            cell:(coin) => {
                const item = coin.item;
                const changePercentage = item.data.price_change_percentage_24h.usd;
                const isTrendingUp = changePercentage > 0;
                const absChangePercentage = Math.abs(changePercentage).toFixed(2);

                return(
                    <div className={cn('price-change flex items-center gap-1', isTrendingUp ? 'text-green-500' : 'text-red-500')}>
                        {isTrendingUp ? (
                            <TrendingUp width={16} height={16} />
                        ) : (
                            <TrendingDown width={16} height={16} />
                        )}
                        <span>{absChangePercentage}%</span>
                    </div>
                )
            }
        },
        {
            header: 'Price',
            cellClassName: 'price-cell',
            cell: (coin) => {
                const price = coin.item.data.price;
                return (
                    <span className="font-medium">
                    {formatCurrency(price)}
                </span>
                );
            }
        },
    ]


    return (
        <div id="trending-coins">
            <h4> Trending Coins</h4>

            <div id='trending-coins'>
               <DataTable
                   data={trendingCoins.coins.slice(0,6) || [] }
                   columns={columns}
                   rowKey={(coin) => coin.item.id}
                   tableClassName="trending-coins-table"
                   bodyCellClassName="py-2!"
                   headerCellClassName="py-3!"
               />
            </div>
        </div>
    )
}
export default TrendingCoins
