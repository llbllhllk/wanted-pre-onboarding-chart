export interface IMockItem {
  id: string;
  value_area: number;
  value_bar: number;
}

export interface IMockResponse {
  [key: string]: IMockItem;
}

export interface IMock {
  type: string;
  version: number;
  response: IMockResponse;
}
