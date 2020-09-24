import * as React from 'react';
import PropTypes from 'prop-types';
import Styled, { keyframes } from 'styled-components';

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Elements = Styled.span`
    display: inline-block;
    position: relative;
    vertical-align: middle;
`;

/* eslint-disable */
export const Icon = Styled(Elements)`
    width: 1em;
    height: 1em;
    border-radius: 50%;
    margin-right: 10px;

    &:before,
    &:after {
        top: 0;
        left: 0;
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        border: ${props =>
          props.theme === 'light'
            ? '0.1em solid rgba(0, 0, 0, 0.1)'
            : '0.1em solid rgba(255, 255, 255, 0.4)'} ;
        border-radius: 50%;
    }

    &:after {
        border-radius: 50%;
        animation-name: ${rotate};
        animation-duration: 0.8s;
        animation-iteration-count: infinite;
        border-color: ${props =>
          props.theme === 'light'
            ? 'transparent rgba(0, 0, 0, 0.5) transparent transparent'
            : 'transparent rgba(255, 255, 255, 0.9) transparent transparent'} ;
        animation-timing-function: linear;
    }
`;
/* eslint-enable */

const Text = Styled(Elements)`
    color : ${props => (props.theme === 'light' ? '#2a2a2a' : '#fff')};
`;

const StyledSpinner = Styled.span`
    display: inline-block;
    font-size: ${props => props.size || 1}rem !important;
    font-weight: 400 !important;
`;

export const Spinner = ({ text, size, className, theme }) => (
  <StyledSpinner size={size} className={className}>
    <Icon theme={theme} />
    {text && <Text theme={theme}>{text}</Text>}
  </StyledSpinner>
);
Spinner.defaultProps = {
  size: 1,
  theme: 'light',
};
Spinner.propTypes = {
  text: PropTypes.node,
  size: PropTypes.number,
  className: PropTypes.string,
  theme: PropTypes.string,
};

export default Spinner;
