export type ExchangeRates = { [currency: string]: CurrencyExchangeRate };

export interface CurrencyExchangeRate {
  ['15m']: number;
  last: number;
  buy: number;
  sell: number;
  symbol: string;
}
