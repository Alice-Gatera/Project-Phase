import { generateToken } from '../src/utils/auth';
import roles from '../src/utils/roles';
// signup data

export const validUser = {
  first_name: 'TestName',
  last_name: 'TestName',
  username: 'TestAdmin',
  occupation: 'software development',
  email: 'renedeolynda@gmail.com',
  password: 'pa13332335',
  address: 'Kigali',
  language: 'English',
  profile_picture: 'image.png'
};

export const invalidUser = {
  first_name: 'TestName',
  last_name: 'TestName',
  username: 'TestAdmin',
  email: '123',
  password: 'pa13332335',
  address: 'Kigali',
  language: 'English',
  profile_picture: 'image.png'
};

export const validData = {
  first_name: 'TestName',
  last_name: 'TestName',
  username: 'TestName1212',
  occupation: 'software development',
  password: 'pa13332335',
  address: 'Kigali',
  language: 'English',
  profile_picture: 'image.png'
};

export const invalidData = {
  first_name: 'TestName',
  last_name: 'TestName',
  username: 'TestName1212',
  occupation: 'm',
  password: 'pa13332335',
  address: 'Kigali',
  language: 'English',
  profile_picture: 'image.png'
};
const payload = { username: validUser.username, user_role_id: roles.REQUESTER };

export const validToken = generateToken(payload);

export const invalidToken = `${validToken}234`;
export const validDataToken = generateToken({ username: 'With_LineManager', user_role_id: roles.MANAGER });
export const invalidDataToken = generateToken({ username: 'fakeUser' });
export const { email, password } = validUser;
// Login data

const loginUser = {
  email: 'habajeunes2@gmail.com',
  password: '1234567890'
};

export const userToken = generateToken(loginUser);

// super admin

export const adminCredentials = {
  email: 'superadmin@gmail.com',
  password: 'Superadmin'
};
// export const token = generateToken(adminCredentials);

export const reqTest = {
  role: 'test',
  description: 'this is a test'
};

export const testPerm = { role: 'test', permissions: { 'edit profile': 0 } };

export const updateRole = {
  req: {
    email: 'manager_id@gmail.com',
    role: 'manager'
  },
  nonExistingUser: {
    email: 'notexist@gmail.com',
    role: 'manager'
  },
  nonExistingRole: {
    email: 'manager_id@gmail.com',
    role: 'notExistRole'
  }
};

export const line_manager = {
  req: { email: 'manager_id@gmail.com', manager_id: roles.LINE_MANAGER },
  invalidManager: { email: 'manager_id@gmail.com', manager_id: roles.MANAGER },
  invalidUser: { email: 'invalidUser@gmail.com', manager_id: roles.LINE_MANAGER },
  invalidInput: { email: 'invalidInput@gmail.com', manager_id: '123456' }
};

export const deleteReq = {
  email: 'manager_id@gmail.com'
};

export const travelAdmin = {
  email: 'traveladmin@gmail.com',
  password: 'password'
};

export const validLocation = {
  LocationName: 'Capetown',
  country: 'South Africa',
  description: 'Some random description',
  link: 'safari.com'
};

export const invalidLocation = {
  LocationName: 'Capetown',
  country: 'South Africa',
  description: 'Some random description',
};

export const updateLocation = {
  LocationName: 'Joburg',
  country: 'South Africa',
  description: 'Some random description',
  link: 'safari.com'
};
