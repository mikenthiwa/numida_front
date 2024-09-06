import React from 'react';
import styled from 'styled-components/native';

export const LoanCardComponent = ({ title, maximumAmount, interestRate }: { title: string; maximumAmount: number; interestRate: number }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Details>
        <AmountWrapper>
          <MaxLabel>Maximum Amount</MaxLabel>
          <Amount>${maximumAmount}</Amount>
          <FooterWrapper>
            <InterestLabel>Interest: {interestRate}%</InterestLabel>
            <LearnMoreButton>
              <LearnMoreText>Learn More</LearnMoreText>
            </LearnMoreButton>
          </FooterWrapper>
        </AmountWrapper>
      </Details>
    </Container>
  );
};

const Container = styled.View`
  padding: 20px 10px;
  border-radius: 10px;
  background: #d4faf5;
  border: 1px solid #ccc;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Details = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const AmountWrapper = styled.View`
  flex-direction: column;
`;

const Amount = styled.Text`
  font-size: 24px;
  color: #30c2e3;
  font-weight: bold;
`;

const FooterWrapper = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const MaxLabel = styled.Text`
  font-weight: bold;
`;

const InterestLabel = styled.Text`
  font-weight: bold;
  font-size: 11px;
`;

const LearnMoreButton = styled.TouchableOpacity`
  display: flex;
  border: 1px solid #30c2e3;
  border-radius: 10px;
  padding: 5px 10px;
`;

const LearnMoreText = styled.Text`
  font-size: 8px;
`;
