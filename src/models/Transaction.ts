import { Category } from './Category';

export interface Transaction {
  id: string;
  date: string;
  operation: string;
  category: Category;
  amount: number;
}
