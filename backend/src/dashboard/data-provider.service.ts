import { Inject, Injectable } from '@nestjs/common';
import { ExchangeRates } from './interfaces/exchange-rates';
import fetch from "node-fetch";
import { exchangeRateApiUrl } from './consts/api-urls';

@Injectable()
export class DataProvider {

  async getData(): Promise<ExchangeRates> {
    const res = await fetch(exchangeRateApiUrl);
    const data: ExchangeRates = await res.json();
    return data;
  }

}
