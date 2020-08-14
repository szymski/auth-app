import { Test, TestingModule } from '@nestjs/testing';
import { DataProvider } from './data-provider.service';
import { ApiDataFetcher } from './api-data-fetcher';
import { ExchangeRates } from './interfaces/exchange-rates';
import { SavedExchangeRates } from './entities/exchange-rates.entity';

describe('DataProvider', () => {
  let service: DataProvider;
  let store: SavedExchangeRates[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataProvider,
        {
          provide: ApiDataFetcher,
          useClass: class implements ApiDataFetcher {
            async fetchData(): Promise<ExchangeRates> {
              return {
                'usd': {
                  last: 1,
                  buy: 2,
                  symbol: '$',
                  '15m': 3,
                  sell: 4,
                },
              };
            }
          },
        },
        {
          provide: 'SavedExchangeRatesRepository',
          useClass: class {
            async find() {
              return store;
            };

            async remove() {
              store = [];
            };

            async persistAndFlush(entity: SavedExchangeRates) {
              store.push(entity);
            }
          },
        },
      ],
    }).compile();

    service = module.get<DataProvider>(DataProvider);
    store = [];
  });

  it('should fetch new data if not saved in db', async () => {
    const data = await service.getNewDataAndSave();

    expect(store)
      .toContain(data);
  });

  it('should return new data if requested', async () => {
    const data = await service.getNewDataAndSave();
    const newData = await service.getNewDataAndSave();

    expect(newData)
      .not.toBe(data);
  });

  it('should return stored data', async () => {
    const data = await service.getData();
    const newData = await service.getData();

    expect(data)
      .toBe(newData);
  });
});
