import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import LoanFormComponent from '../loan-form.component';
import ApplyLoanService from '@/services/apply-loan.service';
import { useRouter } from 'expo-router';

jest.mock('@/services/apply-loan.service');

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

describe('LoanFormComponent', () => {
  // const mockNavigate = jest.fn();
  // beforeEach(() => {
  //   (useRouter as jest.Mock).mockReturnValue({
  //     navigate: mockNavigate,
  //   });
  // });
  it('should render the component', () => {
    const { getByText } = render(<LoanFormComponent />);
    expect(getByText('Apply For a Loan')).toBeDefined();
  });

  //display validation errors
  it('should display validation errors', async () => {
    const { getByText, getByPlaceholderText } = render(<LoanFormComponent />);
    await act(async () => {
      fireEvent.changeText(getByPlaceholderText('Full Name'), '');
      fireEvent.changeText(getByPlaceholderText('yourname@example.com'), '');
      fireEvent.changeText(getByPlaceholderText('UGX'), '');
      fireEvent.changeText(getByPlaceholderText('Loan Purpose'), '');
      fireEvent.press(getByText('Submit'));
    });

    await waitFor(() => {
      expect(getByText('Full Name is required')).toBeDefined();
      expect(getByText('Email is required')).toBeDefined();
      expect(getByText('Loan Amount is required')).toBeDefined();
      expect(getByText('Loan Purpose is required')).toBeDefined();
    });
  });

  xit('should display loading indicator when submitting', async () => {
    const mockNavigate = jest.fn();
    (ApplyLoanService as jest.Mock).mockResolvedValue({ success: true });
    (useRouter as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
    });
    const { getByText, getByTestId } = render(<LoanFormComponent />);

    await act(async () => {
      fireEvent.changeText(getByTestId('full-name'), 'John Doe');
      fireEvent.changeText(getByTestId('email-input'), 'joe@gmail.com');
      fireEvent.changeText(getByTestId('loan-amount'), '1000');
      fireEvent.changeText(getByTestId('loan-purpose'), 'Business');
      fireEvent.press(getByText('Submit'));
      expect(getByTestId('loading-indicator')).toBeTruthy();
    });

    await waitFor(() => {
      // expect(getByTestId('loading-indicator')).toBeTruthy();
    });
  });

  xit('should navigate to home on successful submission', async () => {
    const mockNavigate = jest.fn();
    jest.useFakeTimers();
    (ApplyLoanService as jest.Mock).mockResolvedValue({ success: true });
    (useRouter as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
    });
    const { getByText, getByPlaceholderText } = render(<LoanFormComponent />);
    await act(async () => {
      fireEvent.changeText(getByPlaceholderText('Full Name'), 'John Doe');
      fireEvent.changeText(getByPlaceholderText('yourname@example.com'), 'john@example.com');
      fireEvent.changeText(getByPlaceholderText('UGX'), '1000');
      fireEvent.changeText(getByPlaceholderText('Loan Purpose'), 'Business');
      fireEvent.press(getByText('Submit'));
    });
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'));
  });

  xit('should display error message on failed submission', async () => {
    (ApplyLoanService as jest.Mock).mockResolvedValue({ success: false });
    const { getByText, getByPlaceholderText } = render(<LoanFormComponent />);
    await act(async () => {
      fireEvent.changeText(getByPlaceholderText('Full Name'), 'John Doe');
      fireEvent.changeText(getByPlaceholderText('yourname@example.com'), 'john@example.com');
      fireEvent.changeText(getByPlaceholderText('UGX'), '1000');
      fireEvent.changeText(getByPlaceholderText('Loan Purpose'), 'Business');
      fireEvent.press(getByText('Submit'));
    });

    await waitFor(() => {
      expect(getByText('An error occurred while submitting your loan application')).toBeDefined();
    });
  });
});
