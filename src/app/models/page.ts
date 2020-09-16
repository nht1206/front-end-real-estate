export interface Page<O> {
  content: O[];
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  number: number;
  last: boolean;
  first: boolean;
  size: number;
  empty: boolean;
}
