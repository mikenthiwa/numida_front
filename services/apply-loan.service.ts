import { ToastAndroid } from 'react-native';
import { LoanFormModel } from '@/services/model/loan-form.model';

const apply_loan = async (payload: LoanFormModel) => {
  const url = process.env.EXPO_PUBLIC_API_URL || '';
  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    ToastAndroid.showWithGravityAndOffset('Loan application submitted successfully', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    return { success: true };
  } catch (error) {
    ToastAndroid.showWithGravityAndOffset('An error occurred while submitting your loan application', ToastAndroid.LONG, ToastAndroid.TOP, 25, 50);
    return { success: false };
  }
};

export default apply_loan;
