import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { withRouter } from 'react-router';
import {
  login,
  signup,
  loginFacebook,
  loginGoogle,
} from 'containers/App/modules/actions';
import Button from 'components/Buttons';
import SocialLogin from './SocialLogin';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import './styles.scss';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'login',
      prevShow: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let nextState = {};
    if (nextProps.show && !prevState.prevShow) {
      // if modal has just opened set its type to prop received from parent
      nextState = {
        type: nextProps.type,
        prevShow: nextProps.show,
      };
    } else {
      // keep local type
      nextState = {
        type: prevState.type,
        prevShow: nextProps.show,
      };
    }
    return nextState;
  }

  render() {
    const {
      show,
      onHide,
      onLogin,
      onSignup,
      onLoginFacebook,
      onLoginGoogle,
      isFetching,
      ...rest
    } = this.props;

    const { type } = this.state;
    return (
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        className="login-modal"
        aria-labelledby="contained-modal-title-vcenter"
        {...rest}
      >
        <Modal.Body>
          <div className="login-content">
            {type === 'login' ? (
              <React.Fragment>
                <h1 className="login-title">Login to Learnifii</h1>
                <SocialLogin
                  type="login"
                  fbCallback={onLoginFacebook}
                  googleCallback={onLoginGoogle}
                  onHide={onHide}
                />
                <div className="or-separator">
                  <span className="or-text">OR</span>
                </div>
                <LoginForm
                  onLogin={onLogin}
                  onHide={onHide}
                  isFetching={isFetching}
                />
                <div className="login-link">
                  <span className="login-link-text">New user?</span>
                  <Button
                    variant="link"
                    disabled={isFetching}
                    onClick={() => {
                      this.setState({ type: 'signup' });
                    }}
                  >
                    Sign up here
                  </Button>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <h1 className="login-title">Signup with Learnifii</h1>
                <SocialLogin
                  type="login"
                  fbCallback={onLoginFacebook}
                  googleCallback={onLoginGoogle}
                  onHide={onHide}
                />
                <div className="or-separator">
                  <span className="or-text">OR</span>
                </div>

                <SignupForm
                  onSignup={onSignup}
                  onHide={onHide}
                  isFetching={isFetching}
                />
                <div className="login-link">
                  <span className="login-link-text">
                    Already have an account?
                  </span>
                  <Button
                    variant="link"
                    disabled={isFetching}
                    onClick={() => {
                      this.setState({ type: 'login' });
                    }}
                  >
                    Login here
                  </Button>
                </div>
              </React.Fragment>
            )}
          </div>
        </Modal.Body>
        <Button onClick={onHide} variant="light" className="btn-close">
          <span className="fa fa-times" />
        </Button>
      </Modal>
    );
  }
}
LoginModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onSignup: PropTypes.func,
  onLogin: PropTypes.func,
  isFetching: PropTypes.bool,
  onLoginFacebook: PropTypes.func.isRequired,
  onLoginGoogle: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    isFetching: state.auth.fetching,
  }),
  {
    onLogin: login,
    onSignup: signup,
    onLoginFacebook: loginFacebook,
    onLoginGoogle: loginGoogle,
  },
)(withRouter(LoginModal));
