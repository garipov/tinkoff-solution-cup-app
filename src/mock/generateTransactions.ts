import { categories } from '../const/categories';
import { Category } from '../models/Category';
import { Transaction } from '../models/Transaction';
import { chooseRandom } from '../utils/chooseRandom';

const day = 3600 * 24 * 1000;

const operationsByCateggory = new Map<Category, string[]>([
  [categories[0], ['ФНС №1', 'ФНС №2', 'ФНС №2', 'ФНС №4']],
  [categories[1], ['Макдак', 'Максимилианс']],
  [categories[2], ['Ашан', 'Пятерочка', 'Магнит', 'Мегастрой']],
  [categories[3], ['Метро', 'Запрвка №1', 'Запрвка №2', 'РЖД', 'Аэрофлот']],
]);

export const generateTransactions = (count = 1000) => {
  const items: Transaction[] = [];

  for (let i = 0; i < count; i++) {
    const timestamp = Date.now() - i * Math.ceil(Math.random() * day);

    const category = chooseRandom(categories);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const operations = operationsByCateggory.get(category)!;
    const operation = chooseRandom(operations);

    items.push({
      id: String(i + 1),
      date: new Date(timestamp).toISOString(),
      operation,
      category,
      amount: Math.floor(Math.random() * 1000000) / 100,
    });
  }

  return items;
};
