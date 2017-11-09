import * as React from "react";

const DEFAULT_WATCH_INTERVAL = 1000;

interface IWatchActionHocState {
  timerId?: number;
  doneInitialRun: boolean;
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
    private mounted: boolean;

    constructor(props: any) {
      super(props);

      this.state = {
        doneInitialRun: false,
      };
    }

    public async componentDidMount() {
      this.mounted = true;
      const timerId = window.setInterval(this.props[actionName], interval);
      this.setState({
        ...this.state,
        timerId,
      });

      if (runOnMount) {
        await this.props[actionName]();
        if (this.mounted) {
          this.setState({ ...this.state, doneInitialRun: true });
        }
      }
    }

    public componentWillUnmount() {
      window.clearInterval(this.state.timerId);
      this.mounted = false;
    }

    public render() {
      if (runOnMount && !this.state.doneInitialRun) {
        return <div />;
      } else {
        return <Component {...this.props} />;
      }
    }
  };
};
