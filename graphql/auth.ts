import gql from 'graphql-tag';

export const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      success
      user { id firstName referralCode }
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
      user { id firstName lastName mobileNumber kycStatus referralCode }
      errors { field message code }
    }
  }
`;

export const REQUEST_OTP = gql`
  mutation RequestOtp($mobileNumber: String!, $purpose: OtpPurpose!) {
    requestOtp(mobileNumber: $mobileNumber, purpose: $purpose) {
      success
      expiresInSeconds
      errors { message code }
    }
  }
`;

export const VERIFY_OTP = gql`
  mutation VerifyOtp($mobileNumber: String!, $code: String!, $purpose: OtpPurpose!) {
    verifyOtp(mobileNumber: $mobileNumber, code: $code, purpose: $purpose) {
      success
      errors { message code }
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($mobileNumber: String!) {
    forgotPassword(mobileNumber: $mobileNumber) {
      success
      expiresInSeconds
      errors { message code }
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      success
      errors { message code }
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
      mobileVerifiedAt
      createdAt
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      success
      user { id firstName lastName }
      errors { field message code }
    }
  }
`;
