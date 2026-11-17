import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { accountDetailsModel } from '../models/accountDetailsModel';
import { AccountService } from '../services/account-service';
import { AsyncPipe, DecimalPipe, DatePipe } from '@angular/common';
@Component({
  imports: [ReactiveFormsModule, AsyncPipe, DecimalPipe, DatePipe],
  selector: 'app-accounts',
  styleUrl: './accounts.css',
  templateUrl: './accounts.html',
})
export class Accounts implements OnInit{


  
  accountFormGroup! : FormGroup

  currentPage: number = 0;
  size: number = 5;

  private accountDetailsObservable =
  signal<Observable<accountDetailsModel> |undefined>(undefined);

  constructor(private fb: FormBuilder, private accountService: AccountService){}



  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      accountId : this.fb.control("")
    });
  }


  handleSearchAccount(){
    this.accountDetailsObservable.set(this.accountService.getAccount(this.accountFormGroup.value.accountId, this.currentPage, this.size));
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.handleSearchAccount();
  }

}