import {Reason} from './reason';

export interface Support {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  reason: Reason;
  content: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  checked: boolean;
}
