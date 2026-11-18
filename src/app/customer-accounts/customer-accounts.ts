import { Component, OnInit, signal, Signal } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CustomerModel } from '../models/customer';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { AccountModel } from '../models/accountModel';
import { AccountService } from '../services/account-service';
import { Observable } from 'rxjs';

@Component({
  imports: [JsonPipe, AsyncPipe],
  selector: 'app-customer-accounts',
  styleUrl: './customer-accounts.css',
  templateUrl: './customer-accounts.html',
})
export class CustomerAccounts implements OnInit{


  private accountId! :string;
  private customer! :CustomerModel;

  private customerAccounts = signal<Observable<Array<AccountModel>> | undefined>(undefined);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private accountService: AccountService){
  }



  ngOnInit(): void {
    this.accountId = this.route.snapshot.params["id"];  
    //this.customer = this.router.getCurrentNavigation()?.extras.state as CustomerModel;
    this.customer = history.state.customer as CustomerModel;


    this.customerAccounts.set(this.accountService.customerAccounts(this.accountId));
  }





}
