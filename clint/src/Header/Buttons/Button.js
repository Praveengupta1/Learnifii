import React from 'react';
import PropTypes from 'prop-types';
import {
  Button as BootstrapButton,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';

const Button = ({ tip, placement, ...props }) => {
  if (tip) {
    return (
      <OverlayTrigger
        key={placement}
        placement={placement}
        overlay={<Tooltip id={`tooltip-${placement}`}>{tip}</Tooltip>}
      >
        <Button variant="secondary">Tooltip on {placement}</Button>
        <BootstrapButton {...props} />
      </OverlayTrigger>
    );
  }

  return <BootstrapButton {...props} />;
};
Button.propTypes = {
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  tip: PropTypes.string,
};
Button.defaultProps = {
  placement: 'bottom',
};

export default Button;
