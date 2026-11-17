import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { accountDetailsModel } from '../models/accountDetailsModel';

@Service()
export class AccountService {

  http: HttpClient = inject(HttpClient);

  public getAccount(accountId: string, page: number, size: number ): Observable<accountDetailsModel> {

    return this.http.get<accountDetailsModel>(
      `${environment.backendHost}/accounts/${accountId}/operationsPage?page=${page}&size=${size}`);
  }
}

// http://localhost:8085/accounts/16371740-fac8-40f1-93ee-e4d56bf853d5/operationsPage?size=4