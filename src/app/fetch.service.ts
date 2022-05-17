import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private _http: HttpClient) {
  }

  private header = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJhc2tAdW5pdmVyc2FsLXR1dG9yaWFsLmNvbSIsImFwaV90b2tlbiI6IlQ2VlBOUmZXbkxFbmdsMHd2djctZ1d2Y09KRHFPSkptc3ZoNkNOdGo5a3p1Z1RSYkhvdXVET1NXeTdzYmJzdG5taDAifSwiZXhwIjoxNjUyNDE2MTkyfQ.a3Wn0WRcvgJeJWd0ArjxYj_ONTlt1yYqVAPHnEtta6w'

  getCountryData() {
    return this._http.get(`https://www.universal-tutorial.com/api/countries/`, {
      headers: {
        'Authorization': this.header
      }
    })
  }

  getStateData(state: string) {
    return this._http.get(`https://www.universal-tutorial.com/api/states/${state}`, {
      headers: {
        'Authorization': this.header
      }
    })
  }
}
