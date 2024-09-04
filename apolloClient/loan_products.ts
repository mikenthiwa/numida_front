import { gql } from '@apollo/client';

export const getLoanProducts = gql`
  query {
    loanProducts {
      id
      name
      interestRate
      maximumAmount
    }
  }
`;
