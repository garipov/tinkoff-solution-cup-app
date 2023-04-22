import { Transaction } from '../models/Transaction';
import { FetchOptions } from '../utils/fetch';
import { storage } from '../utils/storage';
import { generateTransactions } from './generateTransactions';

interface Mock {
  GET?: (data: FetchOptions) => unknown;
  POST?: (data: FetchOptions) => { id: string };
  PUT?: (data: FetchOptions) => void;
  PATCH?: (data: FetchOptions) => void;
  DELETE?: (data: FetchOptions) => void;
}

const transactionsStorage = storage.new<Transaction[]>('transactions');

export const mocks: Record<string, Mock> = {
  transactions: {
    GET: (options = {}) => {
      if (!transactionsStorage.get()) {
        transactionsStorage.set(generateTransactions());
      }

      let items = transactionsStorage.get() || [];

      const categories = options.params?.category?.split(',');
      if (categories?.length) {
        items = items.filter((item) => categories.includes(item.category.title));
      }

      const page = Number(options.params?.page) || 0;
      const pageSize = Number(options.params?.pageSize) || 10;
      const pageData = items.slice(page * pageSize, page * pageSize + pageSize);

      return {
        data: pageData,
        total: items.length,
      };
    },
    POST: (options) => {
      const items = transactionsStorage.get() || [];
      const maxId = Math.max(...items.map((i) => Number(i.id)));
      const id = String(maxId + 1);
      const body = options.body;
      if (!body) throw new Error(`"body" can't be empty for transactions`);
      items.push({ id, ...body } as Transaction);
      transactionsStorage.set(items);
      return { id };
    },
  },
};
