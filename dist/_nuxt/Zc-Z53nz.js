import{t as e}from"./BCeQ66YF.js";var t=e`
  query InvestmentCategories {
    investmentCategories { id type name description isActive }
  }
`,n=e`
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
`,r=e`
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
`,i=e`
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
`,a=e`
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
`,o=e`
  mutation CreateInvestment($input: CreateInvestmentInput!) {
    createInvestment(input: $input) {
      success
      investment { id status projectedEarnings }
      deposit { id status providerCode }
      errors { field message code }
    }
  }
`;export{n as a,r as i,t as n,i as o,a as r,o as t};