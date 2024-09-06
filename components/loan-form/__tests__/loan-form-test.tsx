import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoanFormComponent from '../loan-form.component';
import ApplyLoanService from '@/services/apply-loan.service';
import { useRouter } from 'expo-router';

jest.mock('@/services/apply-loan.service');

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

describe('LoanFormComponent', () => {
  it('should render the component', async () => {
    const { findByText } = render(<LoanFormComponent />);
    expect(findByText('Apply For a Loan')).toBeDefined();
  });

  //display validation errors
  it('should display validation errors', async () => {
    const { getByText, getByTestId, findByText } = render(<LoanFormComponent />);
    await waitFor(() => {
      fireEvent.changeText(getByTestId('full-name'), '');
    });
    await waitFor(() => {
      fireEvent.changeText(getByTestId('email-input'), '');
    });

    await waitFor(() => {
      fireEvent.changeText(getByTestId('loan-amount'), '');
    });

    await waitFor(() => {
      fireEvent.changeText(getByTestId('loan-purpose'), '');
    });
    fireEvent.press(getByText('Submit'));
    expect(findByText('Full Name is required')).toBeDefined();
    expect(findByText('Email is required')).toBeDefined();
    expect(findByText('Loan Amount is required')).toBeDefined();
    expect(findByText('Loan Purpose is required')).toBeDefined();
  });

  it('should display loading indicator when submitting', async () => {
    const mockNavigate = jest.fn();
    (ApplyLoanService as jest.Mock).mockResolvedValue({ success: true });
    (useRouter as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
    });
    const { getByTestId, findByTestId } = render(<LoanFormComponent />);
    const submitButton = getByTestId('submit-button');
    await waitFor(() => {
      fireEvent.changeText(getByTestId('full-name'), 'John Doe');
    });
    await waitFor(() => {
      fireEvent.changeText(getByTestId('email-input'), 'joe@gmail.com');
    });

    await waitFor(() => {
      fireEvent.changeText(getByTestId('loan-amount'), '1000');
    });

    await waitFor(() => {
      fireEvent.changeText(getByTestId('loan-purpose'), 'Business');
    });

    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(findByTestId('loading-indicator')).toBeTruthy();
    });
  });

  it('should navigate to home on successful submission', async () => {
    const mockNavigate = jest.fn();
    (ApplyLoanService as jest.Mock).mockResolvedValue({ success: true });
    (useRouter as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
    });
    const { getByTestId } = render(<LoanFormComponent />);
    const submitButton = getByTestId('submit-button');

    await waitFor(() => {
      fireEvent.changeText(getByTestId('full-name'), 'John Doe');
    });
    await waitFor(() => {
      fireEvent.changeText(getByTestId('email-input'), 'joe@gmail.com');
    });

    await waitFor(() => {
      fireEvent.changeText(getByTestId('loan-amount'), '1000');
    });

    await waitFor(() => {
      fireEvent.changeText(getByTestId('loan-purpose'), 'Business');
    });

    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('should display error message on failed submission', async () => {
    (ApplyLoanService as jest.Mock).mockResolvedValue({ success: false });
    const { getByTestId, findByText } = render(<LoanFormComponent />);

    await waitFor(() => {
      fireEvent.changeText(getByTestId('full-name'), 'John Doe');
    });
    await waitFor(() => {
      fireEvent.changeText(getByTestId('email-input'), 'joe@gmail.com');
    });

    await waitFor(() => {
      fireEvent.changeText(getByTestId('loan-amount'), '1000');
    });

    await waitFor(() => {
      fireEvent.changeText(getByTestId('loan-purpose'), 'Business');
    });
    expect(findByText('An error occurred while submitting your loan application')).toBeDefined();
  });
});
