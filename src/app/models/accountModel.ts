
export interface AccountModel {
  id: string;
  Balance: number;
  createdAt: Date;
  status: string;
}

export interface CurrentAccountModel extends AccountModel {
  type: 'CurrentAccount';
  overDraft: number;
}

export interface SavingAccount extends AccountModel {
  type: 'SavingAccount';
  interestRate: number;
}