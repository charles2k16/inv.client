import{t as e}from"./BCeQ66YF.js";var t=e`
  query MyWallets {
    myWallets {
      investment { id type balance lockedBalance }
      referral { id type balance lockedBalance }
      withdrawable { id type balance lockedBalance }
    }
  }
`,n=e`
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
`,r=e`
  mutation RequestWithdrawal($input: RequestWithdrawalInput!) {
    requestWithdrawal(input: $input) {
      success
      withdrawal { id amount status }
      errors { field message code }
    }
  }
`;e`
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
`;export{n,r,t};