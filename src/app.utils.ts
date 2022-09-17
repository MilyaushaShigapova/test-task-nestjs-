const PASSWORD_RULE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const PASSWORD_RULE_MESSAGE =
  'Пароль должен содержать как минимум одну цифру, одну заглавную и одну строчную буквы.';

export const REGEX = {
  PASSWORD_RULE,
};
export const MESSAGES = {
  PASSWORD_RULE_MESSAGE,
};
