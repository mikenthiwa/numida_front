import React from 'react';
import { render, waitFor, act } from '@testing-library/react-native';
import { useQuery } from '@apollo/client';
import Dashboard from '../dashboard.component';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
}));

describe('Dashboard', () => {
  it('should render the component', async () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: undefined,
      data: {
        loanProducts: [
          {
            id: '1',
            name: 'Personal Loan',
            interestRate: 5,
            maximumAmount: 10000,
          },
        ],
      },
      refetch: jest.fn(),
    });

    const { getByText } = render(<Dashboard />);
    await waitFor(() => {
      expect(getByText('Personal Loan')).toBeDefined();
      expect(getByText('Maximum Amount')).toBeDefined();
      expect(getByText('$10000')).toBeDefined();
    });
  });

  it('should render the loading state', async () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: true,
      error: undefined,
      data: undefined,
      refetch: jest.fn(),
    });

    const { getByTestId } = render(<Dashboard />);
    await waitFor(() => {
      expect(getByTestId('loading')).toBeDefined();
    });
  });

  it('should render the error state', async () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: { message: 'Error' },
      data: undefined,
      refetch: jest.fn(),
    });

    const { getByText } = render(<Dashboard />);
    await waitFor(() => {
      expect(getByText('Oops!, Something went wrong. Please try again later.')).toBeDefined();
    });
  });

  it('should refresh the data', async () => {
    const refetch = jest.fn();
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: undefined,
      data: {
        loanProducts: [
          {
            id: '1',
            name: 'Personal Loan',
            interestRate: 5,
            maximumAmount: 10000,
          },
        ],
      },
      refetch,
    });

    const { getByTestId } = render(<Dashboard />);
    const scrollView = getByTestId('refresh');
    expect(scrollView).toBeDefined();
    const { refreshControl } = scrollView.props;
    await act(async () => {
      refreshControl.props.onRefresh();
    });
  });
});
