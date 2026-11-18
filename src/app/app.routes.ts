import { Routes } from '@angular/router';
import { Customers } from './customers/customers';
import { Accounts } from './accounts/accounts';
import { AddCustomer } from './add-customer/add-customer';
import { CustomerAccounts } from './customer-accounts/customer-accounts';

export const routes: Routes = [
    {path: "customers", component: Customers},
    {path:"accounts", component: Accounts},
    {path: "addCustomer",component: AddCustomer},
    {path: "customerAccounts/:id", component: CustomerAccounts}
];
