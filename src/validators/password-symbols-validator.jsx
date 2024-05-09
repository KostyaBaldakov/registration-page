export const passwordSymbolsValidator = (value) =>
  /^\S+$/.test(value) &&
  /[a-zA-Z]+/.test(value) &&
  /[0-9]+/.test(value) &&
  /\w+/.test(value)
    ? null
    : "Пароль должен состоять из букв, цифр и символов";
