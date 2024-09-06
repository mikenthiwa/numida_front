import React from 'react';
import { render } from '@testing-library/react-native';
import { LoanCardComponent } from '../loan-card.component';

describe('LoanCardComponent', () => {
  it('should render the component', () => {
    const { getByText } = render(<LoanCardComponent title='Personal Loan' maximumAmount={10000} interestRate={5} />);
    expect(getByText('Personal Loan')).toBeDefined();
    expect(getByText('Maximum Amount')).toBeDefined();
    expect(getByText('$10000')).toBeDefined();
  });
});
