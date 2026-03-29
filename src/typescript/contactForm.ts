export const INPUT_NAMES = {
  user_name: 'user_name',
  user_email: 'user_email',
  subject: 'subject',
  message: 'message',
} as const;

export type InputName = (typeof INPUT_NAMES)[keyof typeof INPUT_NAMES];
export type FormData = { [K in InputName]: string };

export type TypeFormMessage = 'success' | 'error' | 'sending' | null;
