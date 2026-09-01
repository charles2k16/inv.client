import{t as e}from"./BCeQ66YF.js";var t=e`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      success
      user { id firstName referralCode hasPin }
      errors { field message code }
    }
  }
`,n=e`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      success
      accessToken
      refreshToken
      user { id firstName lastName mobileNumber kycStatus referralCode hasPin }
      errors { field message code }
    }
  }
`,r=e`
  mutation LoginWithPin($input: LoginWithPinInput!) {
    loginWithPin(input: $input) {
      success
      accessToken
      refreshToken
      user { id firstName lastName mobileNumber kycStatus referralCode hasPin }
      errors { field message code }
    }
  }
`,i=e`
  mutation SetPin($input: SetPinInput!) {
    setPin(input: $input) {
      success
      user { id firstName lastName mobileNumber kycStatus referralCode hasPin }
      errors { field message code }
    }
  }
`,a=e`
  mutation ResetPinWithPassword($input: ResetPinWithPasswordInput!) {
    resetPinWithPassword(input: $input) {
      success
      user { id firstName lastName mobileNumber kycStatus referralCode hasPin }
      errors { field message code }
    }
  }
`,o=e`
  query Me {
    me {
      id
      firstName
      lastName
      mobileNumber
      dateOfBirth
      status
      kycStatus
      referralCode
      hasPin
      mobileVerifiedAt
      createdAt
    }
  }
`,s=e`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      success
      user { id firstName lastName hasPin }
      errors { field message code }
    }
  }
`;export{a,t as i,r as n,i as o,o as r,s,n as t};