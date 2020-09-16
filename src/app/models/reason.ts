import {Support} from './support';

export interface Reason {
  id: number;
  name: string;
  supports: Support[];
}
