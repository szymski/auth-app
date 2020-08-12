import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { SavedExchangeRates } from './entities/exchange-rates.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('dashboard')
@UseGuards(AuthGuard())
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
