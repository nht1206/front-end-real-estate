import { Role } from './role';
export interface User {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  avatar: string;
  status: boolean;
  activated: boolean;
  roles: Role[];
  createdAt: Date;
  updatedAt: Date;
}
