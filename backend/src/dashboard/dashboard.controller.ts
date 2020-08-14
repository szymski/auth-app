import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SavedExchangeRates } from './entities/saved-exchange-rates.entity';
import { AuthGuard } from '@nestjs/passport';
import { SavedExchangeRatesDto } from './dtos/saved-exchange-rates.dto';

@Controller('dashboard')
@UseGuards(AuthGuard())
@ApiTags('dashboard')
export class DashboardController {

  constructor(private dashboardService: DashboardService) {
  }

  @Get()
  @ApiOkResponse({ description: 'Returns Bitcoin exchange rates.', type: SavedExchangeRatesDto })
  getExchangeRates(): Promise<SavedExchangeRates> {
    return this.dashboardService.getData();
  }

  @Post('update')
  @ApiOkResponse({ description: 'Refreshes and returns Bitcoin exchange rates.', type: SavedExchangeRatesDto })
  updateExchangeRates(): Promise<SavedExchangeRates> {
    return this.dashboardService.getNewDataAndSave();
  }
}
