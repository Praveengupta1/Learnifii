import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';

import Button from 'components/Buttons';
import { notify } from 'utils/notifications';
import { GOOGLE_APP_ID, FACEBOOK_APP_ID } from 'config/constants';

import fbLogo from 'static/img/login/fb-logo.png';
import googleLogo from 'static/img/login/google-logo.png';

const SocialLogin = ({ type, fbCallback, googleCallback, onHide }) => {
  const googleSuccess = useCallback(({ googleId, profileObj }) => {
    googleCallback({
      googleId,
      email: profileObj.email,
      name: profileObj.name,
      profileObj,
    });
    onHide();
  }, []);

  const googleFailure = useCallback(response => {
    notify(response.error, 'error');
    onHide();
  }, []);

  const handleFb = useCallback(response => {
    if (!response.accessToken) {
      notify('Some error occurred', 'error');
    } else {
      const { name, email, picture, userID } = response;
      fbCallback({ name, email, picture, userID });
    }
    onHide();
  }, []);
  return (
    <div className="social-login">
      <FacebookLogin
        disableMobileRedirect
        appId={FACEBOOK_APP_ID}
        autoLoad={false}
        fields="email,name,picture"
        callback={handleFb}
        render={renderProps => (
          <Button
            variant="light"
            block
            className="social-btn"
            onClick={renderProps.onClick}
          >
            <div className="img-wrapper">
              <img src={fbLogo} alt="Facebook" />
            </div>
            <div className="text-wrapper">{`${
              type === 'login' ? 'Login' : 'Sign Up'
            } with Facebook`}</div>
          </Button>
        )}
      />
      <GoogleLogin
        clientId={GOOGLE_APP_ID}
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        render={renderProps => (
          <Button
            variant="light"
            block
            className="social-btn"
            onClick={renderProps.onClick}
          >
            <div className="img-wrapper">
              <img src={googleLogo} alt="Google" />
            </div>
            <div className="text-wrapper">{`${
              type === 'login' ? 'Login' : 'Sign Up'
            } with Google`}</div>
          </Button>
        )}
      />
    </div>
  );
};

SocialLogin.propTypes = {
  type: PropTypes.oneOf(['login', 'signup']),
  googleCallback: PropTypes.func.isRequired,
  fbCallback: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default SocialLogin;
