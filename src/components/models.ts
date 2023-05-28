export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Profile {
  readonly id: number;
  readonly name: string;
  readonly icon?: string;
}

export interface User {
  readonly id: number;
  readonly name: string;
  readonly authenticated: boolean,
  readonly avatar?: string;
}
