import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { DataProvider } from './data-provider.service';
import { MikroOrmModule } from 'nestjs-mikro-orm';
import { SavedExchangeRates } from './entities/exchange-rates.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [SavedExchangeRates] }),
  ],
  controllers: [DashboardController],
  providers: [
    DashboardService,
    DataProvider,
  ],
})
export class DashboardModule {
}
