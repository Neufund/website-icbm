import * as React from "react";

interface IWatchActionHocState {
  timerId: number;
}

export const watchAction = (interval: number, actionName: string) => (Component: any) => {
  return class WatchActionHoc extends React.Component<any, IWatchActionHocState> {
    public componentDidMount() {
      const timerId = window.setInterval(this.props[actionName], interval);
      this.setState({
        timerId,
      });
    }

    public componentWillUnmount() {
      window.clearInterval(this.state.timerId);
    }

    public render() {
      return <Component {...this.props} />;
    }
  };
};
