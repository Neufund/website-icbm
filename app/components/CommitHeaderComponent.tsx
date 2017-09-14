import * as React from "react";
import { Col, Row } from "react-bootstrap";
import * as style from "./CommitHeaderComponent.scss";

interface ICommitHeaderComponent {
  number: string;
  title: string;
}

export const CommitHeaderComponent: React.SFC<ICommitHeaderComponent> = ({ number, title }) =>
  <Row>
    <Col sm={12}>
      <h2 className={style.header}>
        <span className={style.number}>
          {number}
        </span>
        {title}
      </h2>
    </Col>
  </Row>;
