import styled from 'styled-components/native';
import DashboardComponent from '@/components/dashboard/dashboard.component';

export default function Index() {
  return (
    <Container>
      <TitleContainer>
        <Title>Loan Application Dashboard</Title>
      </TitleContainer>
      <DashboardComponent />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  margin: 50px 30px;
`;

const TitleContainer = styled.View`
  width: 80%;
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;
