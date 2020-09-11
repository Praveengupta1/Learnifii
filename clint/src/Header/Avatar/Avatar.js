import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';
import Styled from 'styled-components';

const StyledAvatar = Styled(Avatar)`
    font-family: Avenir-Demibold , sans-serif;
`;

export const colorPallette = [
  '#111e6c',
  '#0080ff',
  '#6694f6',
  '#73c2fb',
  '#589fd3',
  '#0074c2',
  '#003fbf',
  '#0000c2',
  '#5b00bd',
  '#8a00bf',
];

const AvatarWrapper = ({ size, round, maxInitials, ...rest }) => (
  <StyledAvatar size={size} round={round} maxInitials={maxInitials} {...rest} />
);
AvatarWrapper.defaultProps = {
  size: 50,
  round: true,
  textSizeRatio: 2,
  textMarginRatio: 0.05,
  maxInitials: 1,
};
AvatarWrapper.propTypes = {
  size: PropTypes.number,
  round: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  maxInitials: PropTypes.number,
  textSizeRatio: PropTypes.number,
  textMarginRatio: PropTypes.number,
};
export default AvatarWrapper;
