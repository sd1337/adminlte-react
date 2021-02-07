import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SmartTableHeader extends Component {
  state = { open: false }

  toggleOpen = () => {
    const { open } = this.state;
    this.setState({
      open: !open,
    });
  }

  render() {
    const {
      key, column, classPreFix, sortIcons,
      order, orderChanged, setFilterValue,
    } = this.props;
    const tempFunc = (value) => {
      setFilterValue({ target: { value } });
    };
    const { open } = this.state;
    const { data, width, title } = column;
    const sortObject = order.find((p2) => p2.column === data);
    let icon = sortIcons.default;
    let param = 'asc';
    if (sortObject) {
      let isAsc;
      let isDesc;
      const { direction } = sortObject;
      if (typeof direction === 'string') {
        isAsc = direction.toLowerCase() === 'asc';
        isDesc = direction.toLowerCase() === 'desc';
      } else if (typeof direction === 'number') {
        isAsc = direction === 1;
        isDesc = direction === -1;
      }
      if (isAsc) {
        icon = sortIcons.up;
        param = 'desc';
      } else if (isDesc) {
        icon = sortIcons.down;
        param = 'none';
      }
    }
    return (
      <th key={`${key}-${title}`} className={`${classPreFix}-column-header${open ? ' open' : ''}`} style={{ width }}>
        {<span onClick={this.toggleOpen}>{title}</span>}
        {'  '}
        <div className={`${classPreFix}-column-header-sort`} onClick={() => orderChanged(data, param)}>{icon}</div>
        {/* <ul className="dropdown-menu">
          <li><a onClick={() => { tempFunc("1234"); this.toggleOpen(); }}>1234</a></li>
          <li><a onClick={() => { tempFunc("5678"); this.toggleOpen(); }}>5678</a></li>
        </ul> */}
      </th>
    );
  }
}

SmartTableHeader.propTypes = {
  key: PropTypes.string.isRequired,
  column: PropTypes.shape({
    data: PropTypes.string,
    title: PropTypes.string,
    width: PropTypes.string,
  }).isRequired,
  classPreFix: PropTypes.string.isRequired,
  sortIcons: PropTypes.shape({
    up: PropTypes.node,
    down: PropTypes.node,
    default: PropTypes.node,
  }).isRequired,
  order: PropTypes.arrayOf(PropTypes.shape({ })).isRequired,
  orderChanged: PropTypes.func.isRequired,
  setFilterValue: PropTypes.func.isRequired,
};

export default SmartTableHeader;
