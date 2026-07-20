import gql from 'graphql-tag';

export const MY_REFERRAL_DASHBOARD = gql`
  query MyReferralDashboard {
    myReferralDashboard {
      referralCode
      referralLink
      totalReferrals
      pendingReferrals
      successfulReferrals
      totalReferralEarnings
      withdrawnReferralEarnings
      availableReferralEarnings
    }
  }
`;

export const MY_REFERRALS = gql`
  query MyReferrals {
    myReferrals {
      id
      status
      createdAt
      referredUser { firstName lastInitial joinedAt }
      bonus { amount status paidAt }
    }
  }
`;
