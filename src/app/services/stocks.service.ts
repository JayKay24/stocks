import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

let stocks: Array<string> = ['AAPL', 'GOOG', 'FB', 'AMZN', 'TWTR'];
let service = 'https://angular2-in-action-api.herokuapp.com';

export interface StockInterface {
  symbol: string;
  lastTradePriceOnly: number;
  change: number;
  changeInPercent: number;
}

@Injectable()
export class StocksService {

  constructor(private http: HttpClient) { }

  /**
   * Get all the stocks.
   *
   * @returns {Array<string>}
   */
  get() {
    return stocks.slice();
  }

  /**
   * Add a new stock.
   *
   * @param stock
   * @returns {Array<string>}
   */
  add(stock: string) {
    stocks.splice(stocks.indexOf(stock), 1);
    return this.get();
  }

  /**
   * Remove a stock from the list.
   *
   * @param stock
   */
  remove(stock: string) {
    stocks.splice(stocks.indexOf(stock), 1);
    return this.get();
  }

  /**
   * Load stock values from the API.
   *
   * @param symbols
   * @returns {Observable<Array<StockInterface>>}
   */
  load(symbols) {
    if (symbols) {
      return this.http.get<Array<StockInterface>>(service + '/stocks/snapshot?symbols=' + symbols.join());
    }
  }
}
