export const validate = (values) => {
  const email = values.get('email');
  const password = values.get('password');
  const errors = {};
  if (!email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address';
  }
  if (!password) {
    errors.password = 'Required';
  }
  return errors;
};
