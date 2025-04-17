export function validateForm(
  email: string,
  password: string,
  passwordConfirm?: string
): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(email);
  const isPasswordValid = password.length >= 6;

  // If passwordConfirm is provided (registration), check equality
  if (passwordConfirm !== undefined) {
    return isValidEmail && isPasswordValid && password === passwordConfirm;
  }
  // For login, only check email and password
  return isValidEmail && isPasswordValid;
}
