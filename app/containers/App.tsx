import * as moment from "moment";
import * as React from "react";
import { connect } from "react-redux";

import { AppState } from "../actions/constants";
import { FatalErrorComponent } from "../components/FatalErrorComponent";
import config, { IAnnouncedCfg } from "../config";
import { IAppState } from "../reducers/index";
import AnnouncedIco from "./AnnouncedIco";
import BeforeAnnouncementIco from "./BeforeAnnouncementIco";
import Ico from "./Ico";

interface IcoProps {
  fatalError: string;
  appState: AppState;
}

export function checkIfCanShowCounter(now: moment.Moment, config: IAnnouncedCfg): boolean {
  if (!config.showCountdownAfter) {
    return true;
  }
  return now.isAfter(config.showCountdownAfter);
}

export const App: React.SFC<IcoProps> = ({ fatalError, appState }) => {
  if (fatalError) {
    return <FatalErrorComponent fatalError={fatalError} />;
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
    fatalError: state.fatalErrorState.fatalError,
    appState: config.appState,
  };
}

export default connect(mapStateToProps)(App);
