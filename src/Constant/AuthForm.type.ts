export interface IFormInput {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
}

export const defaultLoginFormValues = {
  email: '',
  password: ''
};

export const defaultSignupFormValues = {
  email: '',
  nickname: '',
  password: '',
};

export const validate = {
  // 추후 조드로 번경
  email: {
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // 정규식 대소문자 구분 없음
      message: '올바른 이메일 주소가 아닙니다.', // pattern.value를 만족하지 못할 경우 errors에 message가 전달됩니다.
    },
    required: '이메일을 입력해 주세요.', // 값이 없을 경우 errors에 message가 전달됩니다.
  },
  nickname: {
    minLength: {
      value: 2,
      message: '닉네임은 2글자 이상으로 작성해 주세요'
    },
    maxLength: {
      value: 10,
      message: '닉네임은 10글자 이하로 작성해 주세요'
    },
    required: '닉네임을 입력해 주세요.'
  },
  password: {
    pattern: {
      value: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/,
      message: '최소 한 개 이상의 특수문자를 포함해주세요.'
    },
    minLength: {
      value: 8,
      message: '비밀번호는 8자리 이상이어야 합니다.'
    },
    required: '비밀번호를 입력해 주세요.'
  },
  type: {
    required: '타입을 선택해주세요'
  }
};

export const status = {
  login: {
    formLabel: ['이메일', '비밀번호'],
    registerListName: ['email', 'password'],
    buttonText: '로그인 하기',
    footerText: '회원이 아니신가요?',
    footerLink: '/signup',
    footerLinkText: '회원가입하기',
    errorMessage: ['이메일 형식으로 작성해 주세요.', '8자 이상으로 입력해주시고, 특수문자를 1개 이상 포함해주세요.'],
    redirectPath: '/'
  },
  signup: {
    formLabel: ['이메일', '비밀번호', '비밀번호 확인'],
    registerListName: ['email', 'password'],
    buttonText: '가입하기',
    footerText: '이미 가입하셨나요?',
    footerLink: '/login',
    footerLinkText: '로그인하기',
    errorMessage: [
      '이메일 형식으로 작성해 주세요.',
      '8자 이상으로 입력해주시고, 특수문자를 1개 이상 포함해주세요.',
      '비밀번호를 확인해주세요.'
    ],
    redirectPath: '/'
  }
};

export type LoginErrorMessage = {
  message: string;
};
export type SignupErrorMessage = {
  message: string;
};