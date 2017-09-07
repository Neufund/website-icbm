import * as React from "react";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import * as styles from "./CommitNavbar.scss";

export const CommitNavbar: React.SFC = ({ children }) =>
  <Navbar inverse collapseOnSelect className={styles.header}>
    <Navbar.Header>
      <Navbar.Brand className={styles.brand}>
        {/* it is assumed that the link below doesn't change the state*/}
        <a href="#" />
      </Navbar.Brand>
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem>
          {children}
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>;