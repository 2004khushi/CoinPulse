import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export const CoinOverviewFallback = () => {
  return (
    <div id="coin-overview-fallback">
      <div className="header pt-2">
        <div className="w-[56px] h-[56px] rounded-full bg-dark-400 animate-pulse" />
        <div className="info">
          <div className="w-32 h-5 bg-dark-400 animate-pulse rounded mb-2" />
          <div className="w-40 h-8 bg-dark-400 animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
};

export const TrendingCoinsFallback = () => {
  // Create an array of 6 empty items to match the slice(0,6) in the original component
  const skeletonRows = Array(6).fill(null);
  
  return (
    <div id="trending-coins-fallback">
      <h4>Trending Coins</h4>
      
      <div id="trending-coins">
        <Table className="custom-scrollbar trending-coins-table">
          <TableHeader>
            <TableRow className="hover:bg-transparent!">
              <TableHead className="bg-dark-400 text-purple-100 py-4 first:pl-5 last:pr-5">
                Name
              </TableHead>
              <TableHead className="bg-dark-400 text-purple-100 py-4 first:pl-5 last:pr-5">
                24Hr Change
              </TableHead>
              <TableHead className="bg-dark-400 text-purple-100 py-4 first:pl-5 last:pr-5">
                Price
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skeletonRows.map((_, index) => (
              <TableRow 
                key={index}
                className="overflow-hidden rounded-lg border-b border-purple-100/5 hover:bg-dark-400/30! relative"
              >
                <TableCell className={cn('py-2! first:pl-5 last:pr-5')}>
                  <div className="flex items-center gap-2">
                    <div className="w-[36px] h-[36px] rounded-full bg-dark-400 animate-pulse" />
                    <div className="w-24 h-5 bg-dark-400 animate-pulse rounded" />
                  </div>
                </TableCell>
                <TableCell className={cn('py-2! first:pl-5 last:pr-5')}>
                  <div className="w-16 h-5 bg-dark-400 animate-pulse rounded" />
                </TableCell>
                <TableCell className={cn('py-2! first:pl-5 last:pr-5')}>
                  <div className="w-20 h-5 bg-dark-400 animate-pulse rounded" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};