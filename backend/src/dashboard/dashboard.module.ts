import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { DataProvider } from './data-provider.service';

@Module({
  controllers: [DashboardController],
  providers: [
    DashboardService,
    DataProvider,
  ]
})
export class DashboardModule {}
