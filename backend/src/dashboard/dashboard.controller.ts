import { Controller, Get, Post } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { SavedExchangeRates } from './entities/exchange-rates.entity';

@Controller('dashboard')
export class DashboardController {

  constructor(private dashboardService: DashboardService) {
  }

  @Get()
  @ApiOkResponse({ description: 'Returns Bitcoin exchange rates.' })
  getExchangeRates(): Promise<SavedExchangeRates> {
    return this.dashboardService.getData();
  }

  @Post('update')
  @ApiOkResponse({ description: 'Refreshes and returns Bitcoin exchange rates.', type: SavedExchangeRates })
  updateExchangeRates(): Promise<SavedExchangeRates> {
    return this.dashboardService.getNewDataAndSave();
  }
}
