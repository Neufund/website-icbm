import { CheckboxProps } from "material-ui";
import * as React from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { compose } from "redux";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Checkbox } from "redux-form-material-ui";
import { requiredFieldValidator } from "../validators/requiredFieldValidator";

import { legalAgreementsAcceptedAction } from "../actions/legalAgreement";
import { IAppState } from "../reducers/index";
import { selectIsAccepted } from "../reducers/legalAgreementState";
import { IFrame } from "./IFrame";
import * as styles from "./LegalModal.scss";

const CheckboxField = Field as { new (): Field<CheckboxProps> };

// tslint:disable-next-line
const noop = () => {};

interface ILegalModalProps {
  isAccepted: boolean;
  legalAgreementsAcceptedAction: () => {};
  reservationAgreement: string;
  tokenHolderAgreement: string;
}

export const LegalModalComponent: React.SFC<InjectedFormProps & ILegalModalProps> = ({
  invalid,
  handleSubmit,
  isAccepted,
  reservationAgreement,
  tokenHolderAgreement,
}) => {
  return (
    <Modal
      show={!isAccepted}
      onHide={noop}
      bsSize="large"
      className={styles.modal}
      data-test-id="legal-modal"
    >
      <Modal.Header>
        <Modal.Title>Legal Agreements</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.scrollable}>
          <IFrame content={reservationAgreement} className={styles.documentFrame} />
          <hr />
          <IFrame content={tokenHolderAgreement} className={styles.documentFrame} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className={styles.checkboxes}>
          <CheckboxField
            name="reservationAgreement"
            component={Checkbox}
            className={styles.checkbox}
            props={{
              label: (
                <span>
                  Check here to confirm that you have read, understand and agree to the{" "}
                  <span className={styles.documentAccent}>Reservation Agreement</span> and{" "}
                  <span className={styles.documentAccent}>Neumark Token Holder Agreement</span>{" "}
                  presented above.
                </span>
              ),
            }}
            validate={[requiredFieldValidator]}
          />
          <CheckboxField
            name="tokenHolderAgreement"
            component={Checkbox}
            className={styles.checkbox}
            props={{
              label: (
                <span>
                  Check here to confirm that you are NOT a citizen, resident or entity of the USA or
                  any other jurisdiction in which it is not permissible to participate in token
                  crowd contributions or acting on behalf of any of them.
                </span>
              ),
            }}
            validate={[requiredFieldValidator]}
          />
        </div>

        <a href="/" className="btn btn-white">
          Cancel
        </a>
        <Button
          bsStyle="primary"
          disabled={invalid}
          onClick={handleSubmit}
          data-test-id="legal-modal-btn"
        >
          Accept
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

interface ILegalModalForm {
  termsOfUseAgreement: boolean;
}

function stateToProps(state: IAppState) {
  return {
    isAccepted: selectIsAccepted(state.legalAgreementState),
    reservationAgreement: state.legalAgreementState.reservationAgreement,
    tokenHolderAgreement: state.legalAgreementState.tokenHolderAgreement,
  };
}

export const LegalModal = compose(
  connect(stateToProps),
  reduxForm<ILegalModalForm, ILegalModalProps>({
    form: "legalApprovalPopupForm",
    onSubmit: (_values, dispatch) => {
      dispatch(legalAgreementsAcceptedAction());
    },
  })
)(LegalModalComponent);
