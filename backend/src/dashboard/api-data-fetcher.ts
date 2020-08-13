import { Injectable } from '@nestjs/common';
import { ExchangeRates } from './interfaces/exchange-rates';
import axios from 'axios';
import { exchangeRateApiUrl } from './consts/api-urls';

@Injectable()
export class ApiDataFetcher {

  public async fetchData(): Promise<ExchangeRates> {
    const res = await axios.get(exchangeRateApiUrl);
    const data: ExchangeRates = res.data;
    return data;
  }

}
