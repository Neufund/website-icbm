export interface IStandardReduxAction<T = any> {
  type: string;
  payload: T;
}

export type Reducer<S, A = any> = (state: S, action: IStandardReduxAction<A>) => S;

export interface IDictionary<T = string> {
  [key: string]: T;
}

export interface INanoLedgerError extends Error {
  errorCode: number;
}
