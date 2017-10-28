import * as React from "react";
import { Col, Row } from "react-bootstrap";
import * as styles from "./MailchimpForm.scss";

export default () =>
  <Row>
    <Col md={12}>
      <p>Be the first to know subscribe now to out newsletter:</p>
      <form
        action="https://neufund.us14.list-manage.com/subscribe/post?u=c2bd93d42fef6e010809046de&amp;id=2d844e39be"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        className="validate"
      >
        <span className={styles.cursor}>|</span>
        <input
          className={styles.subscribeInput}
          type="text"
          name="b_c2bd93d42fef6e010809046de_fa0fc41e50"
          placeholder="example@email.com"
        />
        <input
          type="submit"
          value="Subscribe"
          name="subscribe"
          id="mc-embedded-subscribe"
          className={"btn " + styles.btnSubmit}
        />
      </form>
    </Col>
  </Row>;
