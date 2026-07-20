import gql from 'graphql-tag';

export const MY_WALLETS = gql`
  query MyWallets {
    myWallets {
      investment { id type balance lockedBalance }
      referral { id type balance lockedBalance }
      withdrawable { id type balance lockedBalance }
    }
  }
`;

export const MY_WALLET_TRANSACTIONS = gql`
  query MyWalletTransactions($walletType: WalletType) {
    myWalletTransactions(walletType: $walletType) {
      id
      type
      status
      amount
      balanceAfter
      description
      createdAt
    }
  }
`;

export const REQUEST_WITHDRAWAL = gql`
  mutation RequestWithdrawal($input: RequestWithdrawalInput!) {
    requestWithdrawal(input: $input) {
      success
      withdrawal { id amount status }
      errors { field message code }
    }
  }
`;

export const MY_WITHDRAWALS = gql`
  query MyWithdrawals {
    myWithdrawals {
      id
      amount
      momoNumber
      network
      status
      rejectionReason
      paidAt
      createdAt
    }
  }
`;
