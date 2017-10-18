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

export const LegalModal: React.SFC<InjectedFormProps & ILegalModalProps> = ({
  invalid,
  handleSubmit,
  isAccepted,
  reservationAgreement,
  tokenHolderAgreement,
}) => {
  return (
    <Modal show={!isAccepted} onHide={noop} bsSize="large" className={styles.modal}>
      <Modal.Header>
        <Modal.Title>Legal Agreements</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.scrollable}>
          <IFrame content={reservationAgreement} className={styles.documentFrame} />
          <hr />
          <IFrame content={tokenHolderAgreement} className={styles.documentFrame} />
        </div>
        <CheckboxField
          name="reservationAgreement"
          component={Checkbox}
          className={styles.checkbox}
          props={{
            label: (
              <span>
                I accept <span className={styles.documentAccent}>Reservation Agreement</span>
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
                I accept{" "}
                <span className={styles.documentAccent}>Neumark Token Holder Agreement</span>
              </span>
            ),
          }}
          validate={[requiredFieldValidator]}
        />
      </Modal.Body>
      <Modal.Footer>
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

export default compose(
  connect(stateToProps),
  reduxForm<ILegalModalForm, ILegalModalProps>({
    form: "legalApprovalPopupForm",
    onSubmit: (_values, dispatch) => {
      dispatch(legalAgreementsAcceptedAction());
    },
  })
)(LegalModal);
