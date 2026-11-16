import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerModel } from '../models/customer';
import { environment } from '../../environments/environment.development';

@Service()
export class Customer {

    private http = inject(HttpClient);




    //
    public getCustomers(): Observable<Array<CustomerModel>>{

        return this.http.get<Array<CustomerModel>>(environment.backendHost +  "/customers");
    }


    //
    public searchCustomers(keyword: string): Observable<Array<CustomerModel>>{

        return this.http.get<Array<CustomerModel>>(environment.backendHost +  "/customers/search?keyword=" + keyword);
    }



    //
    public saveCustomer(customer: CustomerModel): Observable<CustomerModel>{

        return this.http.post<CustomerModel>(environment.backendHost +  "/customers", customer);
    }

    //
    public deleteCustomer(customerId : number){

        return this.http.delete(environment.backendHost +  "/customers/" + customerId);
    }



}
