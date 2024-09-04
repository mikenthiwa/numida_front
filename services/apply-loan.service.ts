import { ToastAndroid } from 'react-native';
import { LoanFormModel } from '@/services/model/loan-form.model';

const apply_loan = async (payload: LoanFormModel) => {
  const url = 'http://192.168.1.3:5000/apply-loan';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    ToastAndroid.show('Loan application submitted successfully', ToastAndroid.SHORT);
    console.log('response', response);
  } catch (error) {
    ToastAndroid.show('An error occurred while submitting your loan application', ToastAndroid.SHORT);
  }
};

export default apply_loan;
