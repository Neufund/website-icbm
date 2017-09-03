import * as React from "react";
import { Nav, Navbar } from "react-bootstrap";
import * as styles from "./CommitNavbar.scss";

// it is currently assumed that Cancel component will change the state and clear everything
export const CancelCommit: React.SFC = () => <a href="#" className={styles.clear} />;

export const CommitNavbar: React.SFC = () =>
  <Navbar inverse collapseOnSelect className={styles.header}>
    <Navbar.Header>
      <Navbar.Brand className={styles.brand}>
        {/* it is assumed that the link below doesn't change the state*/}
        <a href="#" />
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <div className={styles.commit}>Commit Funds in Neufund Commitment Oppirtunity</div>
      </Nav>
      <Nav pullRight>
        <CancelCommit />
      </Nav>
    </Navbar.Collapse>
  </Navbar>;
