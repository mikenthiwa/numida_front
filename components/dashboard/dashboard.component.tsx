import React, { Fragment } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { ApolloError, useQuery } from '@apollo/client';
import { useRouter } from 'expo-router';
import { getLoanProducts } from '@/apolloClient/loan_products';
import { LoanCardComponent } from '@/components/loan-card/loan-card.component';
import { LoanProductsData } from '@/apolloClient/model/loan_products.model';

const DashboardComponent: React.FC = () => {
  const { loading, error, data }: { loading: boolean; data: LoanProductsData | undefined; error?: ApolloError } = useQuery(getLoanProducts);
  const router = useRouter();

  if (error) {
    return <ErrorText>Something went wrong. Please try again later.</ErrorText>;
  }

  const renderLoanCardsContainer = () => {
    return (
      <Fragment>
        <LoanCardContainer>
          {data?.loanProducts.map((product: any) => (
            <LoanCardComponent key={product.id} title={product.name} interestRate={product.interestRate} maximumAmount={product.maximumAmount} />
          ))}
        </LoanCardContainer>
        <SubmitButton onPress={() => router.navigate('./apply-loan')}>
          <ButtonText>APPLY FOR A LOAN</ButtonText>
        </SubmitButton>
      </Fragment>
    );
  };

  const renderLoading = () => {
    return <ActivityIndicator size='large' color='#30c2e3' style={{ marginTop: '50%' }} />;
  };

  return (
    <View>
      <TitleContainer>
        <Title>Loan Application Dashboard</Title>
      </TitleContainer>
      <Content>{loading ? renderLoading() : renderLoanCardsContainer()}</Content>
    </View>
  );
};

const TitleContainer = styled.View`
  width: 80%;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ErrorText = styled.Text`
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const LoanCardContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: 20px;
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

const Content = styled.View`
  width: 100%;
`;

export default DashboardComponent;
