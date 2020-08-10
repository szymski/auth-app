import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('dashboard')
export class DashboardController {

  constructor(private dashboardService: DashboardService) {
  }

  @Get()
  @ApiOkResponse({description:"Returns Bitcoin exchange rates"})
  async getExchangeRates() {
    return await this.dashboardService.getData();
  }
}
