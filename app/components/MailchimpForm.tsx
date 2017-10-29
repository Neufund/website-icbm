import * as cn from "classnames";
import * as React from "react";
import { Col, Row } from "react-bootstrap";
import * as styles from "./MailchimpForm.scss";

export const MailchimpForm = () =>
  <Row>
    <Col md={12}>
      <p>Be the first to know - Subscribe now to our newsletter:</p>
      <form
        action="https://neufund.us14.list-manage.com/subscribe/post?u=c2bd93d42fef6e010809046de&amp;id=2d844e39be"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        className="validate"
      >
        <input
          id="mce-EMAIL"
          className={styles.subscribeInput}
          type="email"
          name="EMAIL"
          placeholder="example@email.com"
        />
        <div aria-hidden="true" className={styles.hiddenInput}>
          <input type="text" name="b_c2bd93d42fef6e010809046de_fa0fc41e50" tabIndex={-1} value="" />
        </div>
        <input
          type="submit"
          value="Subscribe"
          name="subscribe"
          id="mc-embedded-subscribe"
          className={cn("btn btn-primary", styles.subscribeBtn)}
        />
      </form>
    </Col>
  </Row>;
