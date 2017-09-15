import * as invariant from "invariant";
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
import * as styles from "./LegalModal.scss";

const CheckboxField = Field as { new (): Field<CheckboxProps> };

// tslint:disable-next-line
const noop = () => {};

interface ILegalModalProps {
  accepted: boolean;
  legalAgreementsAcceptedAction: () => {};
}

export const LegalModal: React.SFC<InjectedFormProps & ILegalModalProps> = ({
  invalid,
  handleSubmit,
  accepted,
}) => {
  return (
    <Modal show={!accepted} onHide={noop}>
      <Modal.Header>
        <Modal.Title>Terms of use</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <CheckboxField
            name="termsOfUseAgreement"
            component={Checkbox}
            props={{
              label: (
                <span>
                  I accept <span className={styles.documentAccent}>Terms of Use</span>
                </span>
              ),
            }}
            validate={[requiredFieldValidator]}
          />
        </div>
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
    accepted: state.legalAgreementState.accepted,
  };
}

export default compose(
  connect(stateToProps),
  reduxForm<ILegalModalForm, ILegalModalProps>({
    form: "legalApprovalPopupForm",
    onSubmit: (values, dispatch) => {
      invariant(values.termsOfUseAgreement, "You need to accept agreements!");
      dispatch(legalAgreementsAcceptedAction());
    },
  })
)(LegalModal);
