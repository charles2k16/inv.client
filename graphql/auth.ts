import gql from 'graphql-tag';

export const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      success
      user { id firstName referralCode hasPin }
      errors { field message code }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      success
      accessToken
      refreshToken
      user { id firstName lastName mobileNumber kycStatus referralCode hasPin }
      errors { field message code }
    }
  }
`;

export const LOGIN_WITH_PIN = gql`
  mutation LoginWithPin($input: LoginWithPinInput!) {
    loginWithPin(input: $input) {
      success
      accessToken
      refreshToken
      user { id firstName lastName mobileNumber kycStatus referralCode hasPin }
      errors { field message code }
    }
  }
`;

export const SET_PIN = gql`
  mutation SetPin($input: SetPinInput!) {
    setPin(input: $input) {
      success
      user { id firstName lastName mobileNumber kycStatus referralCode hasPin }
      errors { field message code }
    }
  }
`;

export const RESET_PIN_WITH_PASSWORD = gql`
  mutation ResetPinWithPassword($input: ResetPinWithPasswordInput!) {
    resetPinWithPassword(input: $input) {
      success
      user { id firstName lastName mobileNumber kycStatus referralCode hasPin }
      errors { field message code }
    }
  }
`;

export const ME = gql`
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
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      success
      user { id firstName lastName hasPin }
      errors { field message code }
    }
  }
`;
