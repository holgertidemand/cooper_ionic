// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import 'rxjs/add/operator/map';

/*
  Generated class for the PerformanceDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PerformanceDataProvider {

  constructor(private _tokenService: Angular2TokenService) {

    this._tokenService.init({
      apiBase: 'https://coopersapi.herokuapp.com/api/v1'
      
    });
  }

  saveData(data) {
    return this._tokenService.post('performance_data', data).map(data => data);
  }

  getResults() {
    return this._tokenService
      .get('performance_data')
      .map(results => results.json());
  }
}
