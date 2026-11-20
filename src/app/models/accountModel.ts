
export interface AccountModelI {
  id: string;
  Balance: number;
  createdAt: Date;
  status: string;

}

export interface CurrentAccountModel extends AccountModelI {
  type: 'CurrentAccount';
  overDraft: number;
}

export interface SavingAccountModel extends AccountModelI {
   type: 'SavingAccount';
  interestRate: number;
}


export type AccountModel = CurrentAccountModel | SavingAccountModel;