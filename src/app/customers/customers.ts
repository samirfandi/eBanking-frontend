import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Customer } from '../services/customer';
import { JsonPipe } from '@angular/common';
import { CustomerModel } from '../models/customer';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [JsonPipe, AsyncPipe, ReactiveFormsModule],
  selector: 'app-customers',
  styleUrl: './customers.css',
  templateUrl: './customers.html',
})
export class Customers implements OnInit{



  private customers = signal<Observable<Array<CustomerModel>> | undefined>(undefined);
  private http = inject(HttpClient);
  private errorMessage = signal<string | undefined >(undefined);
  private searchFormGroup! : FormGroup ;

  constructor(private customerService : Customer, private fb : FormBuilder){}

  

  ngOnInit(): void {
    
    /**
    this.customers.set(this.customerService.getCustomers().pipe(
      catchError(err => {
        this.errorMessage.set(err.message);
        return throwError(() => err);
      })
    ));
    */


    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control("")
    });


    this.handleSearchCustomers();

  }

  
    
  handleSearchCustomers() {

    let kw : string = this.searchFormGroup.value.keyword;

    this.customers.set(this.customerService.searchCustomers(kw).pipe(
      catchError(err => {
        this.errorMessage.set(err.message);
        return throwError(() => err);
      }))
    );

  }


  handleDeleteCustomer(customer: CustomerModel) {

  this.customerService.deleteCustomer(customer.id).subscribe({
    next: () => {

      alert(`Customer ${customer.id} deleted successfully!`);

      this.customers.update(customers$ =>
        customers$?.pipe(
        map(data => data.filter(c => c.id !== customer.id))
        ));
    },
    error: err => {
      console.error(err);
    }
  });
}





}
