import { ApiProperty } from '@nestjs/swagger';
import { ExchangeRates } from '../interfaces/exchange-rates';
import { ExchangeRatesDto } from './exchange-rates.dto';

export class SavedExchangeRatesDto {

  @ApiProperty()
  savedAt: Date;

  @ApiProperty()
  data: ExchangeRatesDto;

}
