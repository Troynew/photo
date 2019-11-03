import React, { Component } from 'react';

import styles from './Eye.less';

export default class TogglePhone extends Component {
  state = {
    show: false,
    phone: null,
  };

  handleToggle = () => {
    this.setState(
      (prevState, _) => ({
        show: !prevState.show,
      }),
      () => {
        const show = this.state.show;
        if (show && this.props.showPhone) {
          this.props.showPhone(this.props.id, this.handleFormat);
        } else {
          this.handleFormat(this.props.phone);
        }
      }
    );
  };

  handleFormat = phone => {
    const show = this.state.show;
    let formatPhone = phone;
    if (!show) {
      formatPhone = phone.substr(0, 3) + '****' + phone.substr(7);
    }
    this.setState(() => ({
      phone: formatPhone,
    }));
  };

  render() {
    return (
      <span>
        <span>{this.state.phone || this.props.phone}</span>
        {this.state.show ? (
          <a onClick={this.handleToggle}>
            <img className={styles.openEye} src={require('@/assets/svgs/see.svg')} alt="睝眼" />
          </a>
        ) : (
          <a onClick={this.handleToggle}>
            <img className={styles.closeEye} src={require('@/assets/svgs/nosee.svg')} alt="闭眼" />
          </a>
        )}
      </span>
    );
  }
}
