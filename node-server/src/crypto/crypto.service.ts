import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import coinbase from "coinbase";
import { DBService } from "./db.service";
import { CURRENCY, DEFAULT_LOADING_TIME_FRAME, DEFAULT_TIME_FRAME, EXCHANGE } from "./constants";
import { Interval } from "@nestjs/schedule";
import { dataMapper } from "./utils";

@Injectable()
export class CryptoService {
  private coinbase: coinbase.Client;

  constructor(private configService: ConfigService, private dbService: DBService) {
    const apiKey = this.configService.get<string>('API_KEY');
    const apiSecret = this.configService.get<string>('API_SECRET');
    this.coinbase = new coinbase.Client({ apiKey, apiSecret, strictSSL: false });
    this.storeExchangeRates()
  }

  @Interval(DEFAULT_LOADING_TIME_FRAME)
  async storeExchangeRates(): Promise<any> {
    const dataBtc = await this.getExchangeRates(EXCHANGE.BTC);
    const dataEth = await this.getExchangeRates(EXCHANGE.ETH);
    const now = Date.now();
    this.dbService.store(`/${EXCHANGE.BTC}/${now}`, { ...dataBtc, date: now, type: EXCHANGE.BTC });
    this.dbService.store(`/${EXCHANGE.ETH}/${now}`, { ...dataEth, date: now, type: EXCHANGE.ETH });
  }

  getCryptoExchange(currency = CURRENCY.BTC_USD, timeFrame = DEFAULT_TIME_FRAME) {
    const [crypto, coin] = currency.split('_')
    const startDate = new Date(Date.now() - timeFrame).getTime()
    const data = this.dbService.getData(`/${crypto.toUpperCase()}`);
    const coinKey = coin.toUpperCase();
    return data
      .filter((item: any) => item.date >= startDate)
      .map((item) => dataMapper(item, coinKey))
  }

  deleteCryptoExchange(id) {
    console.log('deleting entry with id', id)
    if (!id) {
      return []
    }
    const data = this.dbService.getData(`/`);
    const filtered = data.filter((item: any) => item.id !== id)
    this.dbService.storeAll(filtered);
    return { id }
  }

  private getExchangeRates(currency): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.coinbase.getExchangeRates({ currency }, (err, ratesData) => {
          if (err) {
            reject(err)
          } else {
            const { currency, rates: { USD, EUR } } = ratesData.data
            resolve({ currency, USD, EUR })
          }
        })
      }
    )
  }

}
