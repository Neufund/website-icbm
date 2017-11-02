import * as moment from "moment";
import * as React from "react";
import { connect } from "react-redux";

import { AppState } from "../actions/constants";
import { ErrorComponent } from "../components/ErrorComponent";
import config, { IAnnouncedCfg } from "../config";
import { IAppState } from "../reducers/index";
import AnnouncedIco from "./AnnouncedIco";
import BeforeAnnouncementIco from "./BeforeAnnouncementIco";
import Ico from "./Ico";

interface IcoProps {
  error: string;
  appState: AppState;
}

export function checkIfCanShowCounter(now: moment.Moment, config: IAnnouncedCfg): boolean {
  if (!config.showCountdownAfter) {
    return true;
  }
  return now.isAfter(config.showCountdownAfter);
}

export const App: React.SFC<IcoProps> = ({ error, appState }) => {
  if (error) {
    return <ErrorComponent error={error} />;
  }

  switch (appState) {
    case AppState.BEFORE_ANNOUNCEMENT:
      return <BeforeAnnouncementIco />;
    case AppState.ANNOUNCED:
      return checkIfCanShowCounter(moment.utc(), config.announcedCfg)
        ? <AnnouncedIco />
        : <BeforeAnnouncementIco />;
    case AppState.CONTRACTS_DEPLOYED:
      return <Ico />;
    default:
      throw new Error("Not supported");
  }
};

function mapStateToProps(state: IAppState): IcoProps {
  return {
    error: state.errorState.error,
    appState: config.appState,
  };
}

export default connect(mapStateToProps)(App);
