import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { catchError, Observable, throwError } from 'rxjs';
import { accountDetailsModel } from '../models/accountDetailsModel';
import { AccountService } from '../services/account-service';
import { AsyncPipe, DecimalPipe, DatePipe, JsonPipe } from '@angular/common';
@Component({
  imports: [ReactiveFormsModule, AsyncPipe, DecimalPipe, DatePipe, JsonPipe],
  selector: 'app-accounts',
  styleUrl: './accounts.css',
  templateUrl: './accounts.html',
})
export class Accounts implements OnInit{



  
  accountFormGroup! : FormGroup
  operationFormGroup! : FormGroup

  currentPage: number = 0;
  size: number = 5;

  private accountDetailsObservable =
  signal<Observable<accountDetailsModel> |undefined>(undefined);

  private accountError = signal<string | undefined>(undefined);

  private submitted = signal<boolean>(false);

  constructor(private fb: FormBuilder, private accountService: AccountService){}



  ngOnInit(): void {

    // account form
    this.accountFormGroup = this.fb.group({
      accountId : this.fb.control("")
    });

    // operation form
    this.operationFormGroup = this.fb.group({
      operationType : this.fb.control(null),
      amount : this.fb.control(0),
      description : this.fb.control(""),
      accoundDestination : this.fb.control(null)
    });
  }


  handleSearchAccount(){

    this.submitted.set(true);
    this.accountDetailsObservable.set(this.accountService.getAccount(this.accountFormGroup.value.accountId, this.currentPage, this.size).pipe(
      catchError(err => {
        this.accountError.set(err.message);
        return throwError(() => err);
      })
    ));
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.handleSearchAccount();
  }


  handleAccountOperation() {
   
    let sourceId: string = this.accountFormGroup.value.accountId;
    let type: string = this.operationFormGroup.value.operationType;

    //data
    let amount: number = this.operationFormGroup.value.amount;
    let description: string = this.operationFormGroup.value.description;


    if(type === "DEBIT"){

      this.accountService.debit(sourceId, amount, description).subscribe({
        next: (_ =>{
          alert("Success debit"); this.handleSearchAccount();}),
        error:( (err)=> {
          console.log(err)
        })  
      });

    }else if(type === "CREDIT"){

      this.accountService.credit(sourceId, amount, description).subscribe({
        next: (_ => {
          alert("Success credit"); this.handleSearchAccount();}),
         error:( (err)=> {
          console.log(err)
        })
      });

    }else if(type === "TRANSFER"){

      let destinationId: string = this.operationFormGroup.value.accoundDestination;
      this.accountService.transfer(sourceId, destinationId, amount, description).subscribe({
        next: (_ => {
          alert("Success transfer"); this.handleSearchAccount();}),
         error:( (err)=> {
          console.log(err)
        })
      });;
    }


    this.operationFormGroup.reset();
  }

}