import { Entity, PrimaryKey, Property, IdEntity, Unique } from 'mikro-orm';
import { ObjectId } from 'mongodb';

export interface UserAuthMethod {
  method: string;
  data: any;
}

@Entity()
export class User {
  @PrimaryKey()
  _id: ObjectId;

  @Property()
  @Unique()
  username: string;

  @Property()
  authMethods: UserAuthMethod[];
}
