import { fromJS } from 'immutable';

export const email = 'janet@example.com';

export const inputs = fromJS({
  email,
  password: 'something',
});

export const errorMessage = {
  msg: 'i am error',
};
