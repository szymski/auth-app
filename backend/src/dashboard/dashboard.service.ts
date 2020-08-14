import { Injectable } from '@nestjs/common';
import { DataProvider } from './data-provider.service';
import { SavedExchangeRates } from './entities/exchange-rates.entity';

@Injectable()
export class DashboardService {

  constructor(private dataProvider: DataProvider) {
  }

  /**
   * Gets stored data or fetches new.
   */
  public async getData(): Promise<SavedExchangeRates> {
    return await this.dataProvider.getData();
  }

  /**
   * Fetches and saves new data explicitly.
   */
  public async getNewDataAndSave(): Promise<SavedExchangeRates> {
    return await this.dataProvider.getNewDataAndSave();
  }
}
