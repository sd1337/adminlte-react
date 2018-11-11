import React from 'react';
import PropTypes from 'prop-types';

import Ionicon from 'react-ionicons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Colors } from '../PropTypes';

const Infobox2 = ({
  color, title, subTitle, text, footerText, icon, footerIcon, onFooterClick, to,
}) => {
  const isIonIcon = icon.startsWith('ion');
  let iconLocal;
  if (!isIonIcon) {
    const faIconClass = icon.match(/^([fab|fas|far]*)-?(.+)/).splice(1, 2).filter(p => p.length > 0);
    iconLocal = <FontAwesomeIcon icon={faIconClass} size="sm" />;
  } else {
    iconLocal = <Ionicon icon={icon} fontSize="85px" color="rgba(0,0,0,0.15)" />;
  }
  const localFooterIcon = footerIcon.match(/^([fab|fas|far]*)-?(.+)/).splice(1, 2).filter(p => p.length > 0);
  return (
    <div className={`small-box bg-${color}`}>
      <div className="inner">
        <h3>
          {title}
          {subTitle && <sup style={{ fontSize: '20px' }}>{subTitle}</sup>}
        </h3>
        <p>{text}</p>
      </div>
      <div className="icon">
        {iconLocal}
      </div>
      <a href={to} onClick={onFooterClick} className="small-box-footer">
        {footerText}
        {' '}
        <FontAwesomeIcon icon={localFooterIcon} />
      </a>
    </div>
  );
};

Infobox2.propTypes = {
  color: PropTypes.oneOf(Colors),
  title: PropTypes.string,
  subTitle: PropTypes.string,
  text: PropTypes.string,
  footerText: PropTypes.string,
  icon: PropTypes.string.isRequired,
  footerIcon: PropTypes.string,
  onFooterClick: PropTypes.func,
  to: PropTypes.string,
};

Infobox2.defaultProps = {
  color: null,
  title: null,
  subTitle: null,
  text: null,
  footerText: null,
  footerIcon: 'fas-arrow-alt-circle-right',
  onFooterClick: null,
  to: '/',
};

export default Infobox2;
