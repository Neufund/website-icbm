export interface IStandardReduxAction<T = any> {
  type: string;
  payload: T;
}

export type Reducer<S, A = any> = (state: S, action: IStandardReduxAction<A>) => S;
