import gql from 'graphql-tag';

export const INVESTMENT_CATEGORIES = gql`
  query InvestmentCategories {
    investmentCategories { id type name description isActive }
  }
`;

export const INVESTMENT_PLANS = gql`
  query InvestmentPlans($categoryType: InvestmentCategoryType) {
    investmentPlans(categoryType: $categoryType) {
      id
      name
      description
      minAmount
      maxAmount
      stepAmount
      durationDays
      monthlyReturnPercent
      supportedFrequencies
      riskLevel
      category { type name }
    }
  }
`;

export const INVESTMENT_PLAN = gql`
  query InvestmentPlan($id: ID!) {
    investmentPlan(id: $id) {
      id
      name
      description
      minAmount
      maxAmount
      stepAmount
      durationDays
      monthlyReturnPercent
      supportedFrequencies
      riskLevel
      category { type name }
    }
  }
`;

export const MY_INVESTMENTS = gql`
  query MyInvestments {
    myInvestments {
      id
      amount
      distributionFrequency
      status
      projectedEarnings
      actualEarningsToDate
      riskLevel
      startDate
      endDate
      createdAt
      plan { name category { type name } }
    }
  }
`;

export const INVESTMENT_DETAIL = gql`
  query InvestmentDetail($id: ID!) {
    investment(id: $id) {
      id
      amount
      distributionFrequency
      status
      projectedMonthlyReturnPercent
      projectedEarnings
      actualEarningsToDate
      riskLevel
      startDate
      endDate
      createdAt
      plan { name category { type name } }
    }
  }
`;

export const CREATE_INVESTMENT = gql`
  mutation CreateInvestment($input: CreateInvestmentInput!) {
    createInvestment(input: $input) {
      success
      investment { id status projectedEarnings }
      deposit { id status providerCode }
      errors { field message code }
    }
  }
`;
