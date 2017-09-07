interface IStandardReduxAction<T> {
  type: string;
  payload: T;
}
