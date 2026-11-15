import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  imports: [],
  selector: 'app-customers',
  styleUrl: './customers.css',
  templateUrl: './customers.html',
})
export class Customers implements OnInit{


  private customers = signal<any[]>([]);


  private http = inject(HttpClient);

  ngOnInit(): void {
    
    this.http.get<any[]>("http://localhost:8085/customers").subscribe({
      next: (res) => {this.customers.set(res);console.log(res)},
      error: (err) => {console.log(err)}
    })
  }

  





}
