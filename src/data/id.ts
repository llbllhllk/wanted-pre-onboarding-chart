import { mock } from './mock';

export const DEFAULT_BUTTON = '해제';

const resultSet = new Set<string>();

resultSet.add(DEFAULT_BUTTON);

for (const key in mock.response) {
  if (Object.prototype.hasOwnProperty.call(mock.response, key)) {
    const item = mock.response[key];
    resultSet.add(item.id);
  }
}

const idData = Array.from(resultSet);

export { idData };