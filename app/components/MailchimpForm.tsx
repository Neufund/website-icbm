import * as cn from "classnames";
import * as React from "react";
import { Alert, Col, Row } from "react-bootstrap";
import * as styles from "./MailchimpForm.scss";

interface IMailchimpFormComponent {
  showThanksHeader: string;
  showThanksMsg: JSX.Element;
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

const MailchimpFormComponent: React.SFC<IMailchimpFormComponent & IMailchimpForm> = ({
  showThanksHeader,
  showThanksMsg,
  hideForm,
}) =>
  <Row className={styles.formComponent}>
    {showThanksHeader
      ? <Col md={12}>
          <Alert bsStyle="info">
            <h4>
              {showThanksHeader}
            </h4>
            {showThanksMsg}
          </Alert>
        </Col>
      : !hideForm && <Form />}
  </Row>;

interface IMailchimpForm {
  hideForm?: boolean;
}

export class MailchimpForm extends React.Component<IMailchimpForm, IMailchimpFormComponent> {
  constructor() {
    super();
    this.state = {
      showThanksHeader: null,
      showThanksMsg: null,
    };
  }

  public componentDidMount() {
    const params = new URLSearchParams(document.location.search.substring(1));
    const subscribe = params.get("subscribe");

    if (subscribe !== null) {
      history.replaceState({}, null, "/");
      if (subscribe === "thanks") {
        this.setState({
          showThanksHeader: "Thank you for your interest!",
          showThanksMsg: (
            <p>
              To complete the subscription process, please click the link in the email we just sent
              you.
            </p>
          ),
        });
      } else if (subscribe === "confirmed") {
        this.setState({
          showThanksHeader: "Subscription Confirmed",
          showThanksMsg: (
            <p>
              Your subscription to our list has been confirmed.<br />Thank you for subscribing!
            </p>
          ),
        });
      }
    }
  }

  public render() {
    return (
      <MailchimpFormComponent
        showThanksHeader={this.state.showThanksHeader}
        showThanksMsg={this.state.showThanksMsg}
        hideForm={this.props.hideForm}
      />
    );
  }
}
