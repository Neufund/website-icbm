export interface IUserState {
  loading: boolean;
  address: string;
}

const initialState: IUserState = {
  loading: false,
  address: null,
};

export default function(state = initialState, action: IStandardReduxAction<any>): IUserState {
  const { type } = action;
  switch (type) {
    default:
      return state;
  }
}
