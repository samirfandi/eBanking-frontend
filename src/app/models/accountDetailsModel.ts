export interface accountDetailsModel {
    accountId:     string;
    balance:       number;
    currentPage:   number;
    totalPages:    number;
    sizeOfPage:    number;
    operationsDTO: AccountOperation[];
}

export interface AccountOperation {
    id:            number;
    operationDate: Date;
    amount:        number;
    type:          string;
    description:   string;
}