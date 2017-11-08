import * as React from "react";

const DEFAULT_WATCH_INTERVAL = 1000;

interface IWatchActionHocState {
  timerId: number;
}

interface IWatchActionOptions {
  actionName: string;
  interval?: number;
  runOnMount?: boolean;
}

export const watchAction = ({
  actionName,
  interval = DEFAULT_WATCH_INTERVAL,
  runOnMount = false,
}: IWatchActionOptions) => (Component: any) => {
  return class WatchActionHoc extends React.Component<any, IWatchActionHocState> {
    public componentDidMount() {
      if (runOnMount) {
        this.props[actionName]();
      }
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
