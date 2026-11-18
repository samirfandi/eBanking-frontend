import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { accountDetailsModel } from '../models/accountDetailsModel';
import { AccountModel } from '../models/accountModel';

@Service()
export class AccountService {

  http: HttpClient = inject(HttpClient);

  public getAccount(accountId: string, page: number, size: number ): Observable<accountDetailsModel> {

    return this.http.get<accountDetailsModel>(
      `${environment.backendHost}/accounts/${accountId}/operationsPage?page=${page}&size=${size}`);
  }

  public debit(accountId: string, amount: number, description: string){

    let data = {
        "accountId": accountId,
        "amount":  amount,
        "description": description
    }
    return this.http.post(environment.backendHost + "/accounts/debit", data);
  }

  public credit(accountId: string, amount: number, description: string){

    let data = {
        "accountId": accountId,
        "amount":  amount,
        "description": description
    }
    return this.http.post(environment.backendHost + "/accounts/credit", data);
  }

  public transfer(accountSource: string,accoundDestination: string, amount: number, description: string){

    let data = {"accounSource": accountSource,
        "accounDestination": accoundDestination,
         "amount": amount,
         "description": description
        }
    return this.http.post(environment.backendHost + "/accounts/transfer", data);
  }

  public customerAccounts(customerId: string): Observable<Array<AccountModel>>{

    return this.http.get<Array<AccountModel>>(environment.backendHost + "/accounts/customer/"+customerId);
  }



}

