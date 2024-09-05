import React, { Fragment, useState } from 'react';
import { View, ActivityIndicator, ScrollView, Dimensions, RefreshControl } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import styled from 'styled-components/native';
import { ApolloError, useQuery } from '@apollo/client';
import { useRouter } from 'expo-router';
import { getLoanProducts } from '@/apolloClient/loan_products';
import { LoanCardComponent } from '@/components/loan-card/loan-card.component';
import { LoanProductsData } from '@/apolloClient/model/loan_products.model';

type RefetchType = () => Promise<{ data: LoanProductsData }>;
const DashboardComponent: React.FC = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { loading, error, data, refetch }: { loading: boolean; data: LoanProductsData | undefined; error?: ApolloError; refetch: RefetchType } =
    useQuery(getLoanProducts);
  const router = useRouter();
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
    }
  };

  if (error) {
    return (
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <CenteredContainer>
          <Ionicons name='alert-circle' size={50} color='#30c2e3' />
          <ErrorText>Oops!, Something went wrong. Please try again later.</ErrorText>
        </CenteredContainer>
      </ScrollView>
    );
  }

  const renderLoading = () => {
    return (
      <CenteredContainer>
        <ActivityIndicator size='large' color='#30c2e3' />
      </CenteredContainer>
    );
  };

  const renderLoanCards = () => {
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

  return (
    <View>
      <Content>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          {loading ? renderLoading() : renderLoanCards()}
        </ScrollView>
      </Content>
    </View>
  );
};

const LoanCardContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CenteredContainer = styled.View`
  align-items: center;
  margin-top: ${(Dimensions.get('window').height - 250) / 2}px;
`;

const ErrorText = styled.Text`
  text-align: center;
  font-weight: bold;
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

const Content = styled.View``;

export default DashboardComponent;
