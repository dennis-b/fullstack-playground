import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DBService {
  private db: JsonDB;

  constructor(private configService: ConfigService) {
    this.db = new JsonDB(new Config("cryptoDB", true, false, '/'));
    this.store('/', [])
  }


  store(key: string, value: any): any {
    return this.db.push(key, { ...value, id: uuidv4() });
  }

  storeAll(data): any {
    return this.db.push('/', data);
  }

  getData(key = '/') {
    try {
      return Object.values(this.db.getData(key));
    } catch (e) {
      console.log(e)
      return []
    }
  }
}
