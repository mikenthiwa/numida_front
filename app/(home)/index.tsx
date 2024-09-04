import styled from 'styled-components/native';
import { Text } from 'react-native';
import DashboardComponent from '@/components/dashboard/dashboard.component';

export default function Index() {
  return (
    <Container>
      <DashboardComponent />
    </Container>
  );
}

const Container = styled.View`
  margin: 50px 30px;
`;
