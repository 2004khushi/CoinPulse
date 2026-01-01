import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a number as a currency string with the USD symbol
 * @param value - The number to format
 * @param options - Optional configuration for the formatter
 * @returns Formatted currency string
 */
export function formatCurrency(
  value: number, 
  options: {
    currency?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  } = {}
): string {
  const {
    currency = 'USD',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2
  } = options;

  // Use the $ symbol for USD, otherwise use the currency code
  const symbol = currency === 'USD' ? '$' : `${currency} `;

  return `${symbol}${value.toLocaleString(undefined, {
    minimumFractionDigits,
    maximumFractionDigits
  })}`;
}
