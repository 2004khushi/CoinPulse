import React from 'react'
import Image from "next/image";
import Link from "next/link";
import DataTable from "@/components/DataTable";
import {TrendingUp, TrendingDown} from "lucide-react";
import {cn} from "@/lib/utils";

// Dummy trending coins data
const dummyTrendingCoins: TrendingCoin[] = [
    {
        item: {
            id: "bitcoin",
            name: "Bitcoin",
            symbol: "BTC",
            market_cap_rank: 1,
            thumb: "/logo.svg",
            large: "/logo.svg",
            data: {
                price: 89113.00,
                price_change_percentage_24h: {
                    usd: 2.5
                }
            }
        }
    },
    {
        item: {
            id: "ethereum",
            name: "Ethereum",
            symbol: "ETH",
            market_cap_rank: 2,
            thumb: "/logo.svg",
            large: "/logo.svg",
            data: {
                price: 3500.75,
                price_change_percentage_24h: {
                    usd: -1.2
                }
            }
        }
    },
    {
        item: {
            id: "cardano",
            name: "Cardano",
            symbol: "ADA",
            market_cap_rank: 3,
            thumb: "/favicon.ico",
            large: "/favicon.ico",
            data: {
                price: 0.58,
                price_change_percentage_24h: {
                    usd: 3.7
                }
            }
        }
    },
    {
        item: {
            id: "solana",
            name: "Solana",
            symbol: "SOL",
            market_cap_rank: 4,
            thumb: "/converter.svg",
            large: "/converter.svg",
            data: {
                price: 175.25,
                price_change_percentage_24h: {
                    usd: 5.2
                }
            }
        }
    }
];

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
                    ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
            );
        }
    },
]

const Page = () => {
    return (
        <main className="main-container">
            <section className="home-grid">
                <div id="coin-overview">
                    <div className="header pt-2">
                        <Image src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png" alt="BITcoin" width={56} height={56}/>
                        <div className="info">
                            <p>BitCoin / BTC</p>
                            <h1>$89,113.00</h1>
                        </div>
                    </div>
                </div>

                <p> Trending Coins</p>
                <DataTable
                    data={dummyTrendingCoins}
                    columns={columns}
                    rowKey={(coin) => coin.item.id}
                />
            </section>

            <section className="w-full mt-7 space-y-4">
                <p>Categories</p>
            </section>
        </main>
    )
}
export default Page
