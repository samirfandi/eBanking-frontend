import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Customer } from '../services/customer';
import { CustomerModel } from '../models/customer';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-add-customer',
  styleUrl: './add-customer.css',
  templateUrl: './add-customer.html',
})
export class AddCustomer implements OnInit{


  newCustomerFormGroup! : FormGroup;

  constructor(private fb: FormBuilder, private customerService : Customer){}


  ngOnInit(): void {
    this.newCustomerFormGroup = this.fb.group({
      name : this.fb.control("", [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZÀ-ÿ\s'-]+$/)]),
      email : this.fb.control("", [Validators.required, Validators.email])
    })
  }


  handleSaveCustomer() {

    let customer: CustomerModel = this.newCustomerFormGroup.value;
    this.customerService.saveCustomer(customer).subscribe({
      next: res => {
        alert("The customer has been saved successfully")
      },
      error: err => {console.log(err)}
    })
  }





}
