import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { DataProvider } from './data-provider.service';
import { MikroOrmModule } from 'nestjs-mikro-orm';
import { SavedExchangeRates } from './entities/saved-exchange-rates.entity';
import { ApiDataFetcher } from './api-data-fetcher';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    DashboardModule,
    MikroOrmModule.forFeature({ entities: [SavedExchangeRates] }),
  ],
  controllers: [DashboardController],
  providers: [
    DashboardService,
    DataProvider,
    ApiDataFetcher,
  ],
})
export class DashboardModule {
}
