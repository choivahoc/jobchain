import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  baseUrl = environment.baseUrl;
  constructor(
    private http: HttpClient
  ) { }

  getInfoTransactions(body: any): Observable<any> {
    return this.http.post(this.baseUrl + '/contracts/search-transactions', body);
  }

  getDetailTransactions(id: any): Observable<any> {
    return this.http.get(this.baseUrl + '/transactions/' + id);
  }


}
