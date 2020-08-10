import { Inject, Injectable } from '@nestjs/common';
import { ExchangeRates } from './interfaces/exchange-rates';
import axios from 'axios';
import { exchangeRateApiUrl } from './consts/api-urls';
import { InjectRepository } from 'nestjs-mikro-orm';
import { EntityManager, EntityRepository } from 'mikro-orm';
import { SavedExchangeRates } from './entities/exchange-rates.entity';
import { raw } from 'express';

@Injectable()
export class DataProvider {

  constructor(
    @InjectRepository(SavedExchangeRates)
    private repository: EntityRepository<SavedExchangeRates>) {
  }

  /**
   * Gets stored exchange rates or fetches new if not fetched yet.
   */
  public async getData(): Promise<SavedExchangeRates> {
    const data = (await this.repository.find({}))[0];
    if(data)
      return data;
    else
      return this.getNewDataAndSave();
  }

  /**
   * Fetches and saves new data explicitly.
   */
  public async getNewDataAndSave(): Promise<SavedExchangeRates> {
    const rawData = await this.fetchDataFromApi();

    await this.repository.remove({});

    const newEntity = new SavedExchangeRates();
    newEntity.savedAt = new Date();
    newEntity.data = rawData;
    await this.repository.persistAndFlush(newEntity);

    return newEntity;
  }

  private async fetchDataFromApi(): Promise<ExchangeRates> {
    const res = await axios.get(exchangeRateApiUrl);
    const data: ExchangeRates = res.data;
    return data;
  }

}
