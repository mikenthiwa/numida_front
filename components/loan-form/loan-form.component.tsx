import styled from 'styled-components/native';
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import ApplyLoanService from '@/services/apply-loan.service';
import * as Yup from 'yup';
import { useRouter } from 'expo-router';
import { LoanFormModel } from '@/services/model/loan-form.model';
import { useState } from 'react';

const LoanFormSchema = Yup.object().shape({
  full_name: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  loan_amount: Yup.number().typeError('Loan Amount must be a number').required('Loan Amount is required'),
  loan_purpose: Yup.string().required('Loan Purpose is required'),
});

const LoanFormComponent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleApplyLoan = async (data: LoanFormModel) => {
    setLoading(true);
    const { success } = await ApplyLoanService(data);
    setLoading(false);
    if (success) router.navigate('/');
  };

  return (
    <View>
      <Title>Apply For a Loan</Title>
      <ScrollView>
        <Formik
          initialValues={{ full_name: '', email: '', loan_amount: '', loan_purpose: '' }}
          validationSchema={LoanFormSchema}
          onSubmit={(data) => handleApplyLoan(data)}
          validateOnMount={true}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => {
            return (
              <View>
                <Label>Full Name</Label>
                <Input
                  testID='full-name'
                  onChangeText={handleChange('full_name')}
                  onBlur={handleBlur('full_name')}
                  value={values.full_name}
                  placeholder='Full Name'
                />
                {errors.full_name && touched.full_name ? <Text style={{ color: 'red' }}>{errors.full_name}</Text> : null}

                <Label>Email</Label>
                <Input
                  testID='email-input'
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder='yourname@example.com'
                />
                {errors.email && touched.email ? <Text style={{ color: 'red' }}>{errors.email}</Text> : null}

                <Label>Loan Amount</Label>
                <Input
                  testID='loan-amount'
                  onChangeText={handleChange('loan_amount')}
                  onBlur={handleBlur('loan_amount')}
                  value={values.loan_amount}
                  placeholder='UGX'
                />
                {errors.loan_amount && touched.loan_amount ? <Text style={{ color: 'red' }}>{errors.loan_amount}</Text> : null}

                <Label>Loan Purpose</Label>
                <Input
                  testID='loan-purpose'
                  onChangeText={handleChange('loan_purpose')}
                  onBlur={handleBlur('loan_purpose')}
                  value={values.loan_purpose}
                  placeholder='Loan Purpose'
                />
                {errors.loan_purpose && touched.loan_purpose ? <Text style={{ color: 'red' }}>{errors.loan_purpose}</Text> : null}

                <SubmitButton testID='submit-button' onPress={handleSubmit} disabled={!isValid} loading={loading}>
                  {loading ? <ActivityIndicator size='small' color='#00ff00' testID='loading-indicator' /> : <ButtonText>Submit</ButtonText>}
                </SubmitButton>
              </View>
            );
          }}
        </Formik>
      </ScrollView>
    </View>
  );
};

const SubmitButton = styled.TouchableOpacity<{ disabled: boolean; loading: boolean }>`
  background: ${({ disabled, loading }) => (disabled || loading ? '#ccc' : '#30c2e3')};
  padding: 16px 12px;
  border-radius: 10px;
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  text-align: center;
  font-weight: bold;
  font-size: 32px;
  margin-bottom: 20px;
`;

const Label = styled.Text`
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 16px;
`;

const Input = styled.TextInput`
  border: 1px solid #ccc;
  padding: 12px 13px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const ButtonText = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 16px;
`;

export default LoanFormComponent;
