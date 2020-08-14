import { ApiProperty } from '@nestjs/swagger';

export class ExchangeRatesDto {

  @ApiProperty()
  ['15m']: number;

  @ApiProperty()
  last: number;

  @ApiProperty()
  buy: number;

  @ApiProperty()
  sell: number;

  @ApiProperty()
  symbol: string;

}
