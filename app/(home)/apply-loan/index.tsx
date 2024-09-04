import styled from 'styled-components/native';
import LoanFormComponent from '@/components/loan-form/loan-form.component';

const ApplyLoanPage = () => {
  return (
    <Container>
      <LoanFormComponent />
    </Container>
  );
};

const Container = styled.View`
  margin: 50px 30px;
`;

export default ApplyLoanPage;
