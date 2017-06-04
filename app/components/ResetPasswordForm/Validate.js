export const validate = (values) => {
  const email = values.get('email');
  const password = values.get('password');
  const confirmPassword = values.get('confirmPassword');
  const errors = {};
  if (!email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address';
  }
  if (!password) {
    errors.password = 'Required';
  }
  if (!confirmPassword) {
    errors.confirmPassword = 'Required';
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = 'These passwords don\'t match. Try again?';
  }
  return errors;
};
