interface LoanProduct {
  __typename: string;
  id: number;
  interestRate: number;
  maximumAmount: number;
  name: string;
}

export interface LoanProductsData {
  loanProducts: LoanProduct[];
}
