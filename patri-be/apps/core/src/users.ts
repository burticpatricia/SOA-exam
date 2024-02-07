import { hashSync } from 'bcrypt';

export interface User {
  id: string;
  email: string;
  password: string;
}

export const users: User[] = [
  {
    id: '59ff9ecc-1cde-4b77-b66e-c6f0897ff3ce',
    email: 'test@test.com',
    password: hashSync('testtest123!!', 10),
  },
];
