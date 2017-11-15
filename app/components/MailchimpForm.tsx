import * as cn from "classnames";
import * as React from "react";
import { Alert, Col, Row } from "react-bootstrap";
import * as styles from "./MailchimpForm.scss";

declare const ga: any;

interface IMailchimpFormComponent {
  showThanks: boolean;
  hideForm?: boolean;
}

const Form = () =>
  <Col md={12}>
    <p>Subscribe now to our newsletter:</p>
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
  </Col>;

const MailchimpFormComponent: React.SFC<IMailchimpFormComponent> = ({ showThanks, hideForm }) =>
  <Row className={styles.formComponent}>
    {showThanks
      ? <Col md={12}>
          <Alert bsStyle="info">
            <h4>Thank you for your interest!</h4>
            <p>
              To complete the subscription process, please click the link in the email we just sent
              you.
            </p>
          </Alert>
        </Col>
      : !hideForm ? <Form /> : ""}
  </Row>;

interface IMailchimpForm {
  hideForm?: boolean;
}

export class MailchimpForm extends React.Component<IMailchimpForm, IMailchimpFormComponent> {
  constructor() {
    super();
    this.state = {
      showThanks: false,
    };
  }

  public componentDidMount() {
    const params = new URLSearchParams(document.location.search.substring(1));
    const subscribe = params.get("subscribe");

    if (subscribe !== null) {
      history.replaceState({}, null, "/");
      ga("send", {
        hitType: "pageview",
        page: document.location.origin + "/mailchimp",
      });
      this.setState({ showThanks: true });
    }
  }

  public render() {
    return (
      <MailchimpFormComponent showThanks={this.state.showThanks} hideForm={this.props.hideForm} />
    );
  }
}
