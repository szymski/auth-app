import { Entity, PrimaryKey, Property } from 'mikro-orm';
import { ExchangeRates } from '../interfaces/exchange-rates';
import { ObjectId } from 'mongodb';

@Entity()
export class SavedExchangeRates {
  @PrimaryKey()
  _id: ObjectId;

  @Property()
  savedAt: Date;

  @Property()
  data: ExchangeRates;
}
