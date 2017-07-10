import { fromJS } from 'immutable';

export const students = fromJS([
  {
    id: 1,
    name_first: 'Paul',
    name_last: 'McCartney',
    rank_stripes: 2,
    rank_type: 'blue',
    program: 'gorilla',
  },
  {
    id: 2,
    name_first: 'Ringo',
    name_last: 'Starr',
    rank_stripes: 0,
    rank_type: 'purple',
    program: 'leader',
  },
  {
    id: 3,
    name_first: 'John',
    name_last: 'Lennon',
    rank_stripes: 3,
    rank_type: 'grey',
    program: 'submission samurai',
  },
  {
    id: 4,
    name_first: 'George',
    name_last: 'Harrison',
    rank_stripes: 4,
    rank_type: 'white',
    program: 'monkey',
  },
]);

export const studentClassInstance = fromJS([
  {
    id: 1,
    student_id: 1,
    class_instance_id: 1,
    attendance: 'P',
  },
  {
    id: 2,
    student_id: 2,
    class_instance_id: 1,
    attendance: 'A',
  },
]);

export const classInstance = fromJS({
  substitute_coach_id: null,
  id: 1,
  notes: null,
  class_schedule_id: 1,
  date: 'Mon, 05/02/16',
});

export const errorMessage = {
  msg: 'i am error',
};

export const currentClass = 1;

export const tardyAttendance = 'T';

export const studentClassInstanceId = 1;

export const email = 'janet@example.com';
export const emailUpperCase = 'Janet@example.com';

export const password = 'something';

export const data = fromJS({
  email,
  password,
});

export const dataJS = data.toJS();

export const dataUpperCaseEmail = fromJS({
  email: emailUpperCase,
  password,
});

export const nameFirst = 'Janet';
export const nameLast = 'Kenmotsu';

export const registerData = fromJS({
  email,
  password,
  nameFirst,
  nameLast,
});

export const registerDataJS = registerData.toJS();

export const registerDataUpperCaseEmail = fromJS({
  email: emailUpperCase,
  password,
  nameFirst,
  nameLast,
});

export const isAuthorized = true;

export const EMPTY_FUNCTION = () => {};
export const EMPTY_OBJECT = {};
export const EMPTY_IMMUTABLE_OBJECT = fromJS(EMPTY_OBJECT);

export const fakeInput = {
  name: 'email',
  onBlur: EMPTY_FUNCTION,
  onChange: EMPTY_FUNCTION,
  onDragStart: EMPTY_FUNCTION,
  onDrop: EMPTY_FUNCTION,
  onFocus: EMPTY_FUNCTION,
  value: '',
};

export const meta = {
  touched: false,
  error: false,
};

export const token = 'vxchioulnkjasguhi.as.df584';

export const emailNotConfirmedData = fromJS({
  emailConfirmed: false,
});

export const emailConfirmedData = fromJS({
  emailConfirmed: true,
});
