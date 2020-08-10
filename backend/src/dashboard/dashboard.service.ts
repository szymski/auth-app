import { Injectable } from '@nestjs/common';
import { ExchangeRates } from './interfaces/exchange-rates';
import { DataProvider } from './data-provider.service';

@Injectable()
export class DashboardService {

  constructor(private dataProvider: DataProvider) {
  }

  async getData(): Promise<ExchangeRates> {
    return await this.dataProvider.getData();
  }

}
