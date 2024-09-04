import styled from 'styled-components/native';
import { View, ScrollView } from 'react-native';
import { Formik } from 'formik';
import ApplyLoanService from '@/services/apply-loan.service';

const LoanFormComponent = () => {
  return (
    <View>
      <Title>Apply For a Loan</Title>
      <ScrollView>
        <Formik initialValues={{ full_name: '', email: '', loan_amount: '', loan_purpose: '' }} onSubmit={(data) => ApplyLoanService(data)}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <Label>Full Name</Label>
              <Input onChangeText={handleChange('full_name')} onBlur={handleBlur('full_name')} value={values.full_name} placeholder='Full Name' />

              <Label>Email</Label>
              <Input onChangeText={handleChange('email')} onBlur={handleBlur('email')} value={values.email} placeholder='yourname@example.com' />

              <Label>Loan Amount</Label>
              <Input onChangeText={handleChange('loan_amount')} onBlur={handleBlur('loan_amount')} value={values.loan_amount} placeholder='UGX' />

              <Label>Loan Purpose</Label>
              <Input
                onChangeText={handleChange('loan_purpose')}
                onBlur={handleBlur('loan_purpose')}
                value={values.loan_purpose}
                placeholder='Loan Purpose'
              />

              <SubmitButton onPress={handleSubmit}>
                <ButtonText>Submit</ButtonText>
              </SubmitButton>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

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

const SubmitButton = styled.TouchableOpacity`
  background: #30c2e3;
  padding: 16px 12px;
  border-radius: 10px;
  margin-top: 40px;
`;

const ButtonText = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 16px;
`;

export default LoanFormComponent;
