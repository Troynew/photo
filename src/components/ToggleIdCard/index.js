import React, { Component } from 'react';

import styles from './Eye.less';

export default class ToggleIdCard extends Component {
  state = {
    show: false,
    idCard: '',
  };

  handleToggle = () => {
    this.setState(
      prevState => ({
        show: !prevState.show,
      }),
      () => {
        if (this.state.show && this.props.showIdCard) {
          this.props.showIdCard(this.props.id, this.handleFormat);
        } else {
          this.handleFormat(this.props.idCard);
        }
      }
    );
  };

  handleFormat = idCard => {
    const show = this.state.show;
    let formatIdCard = idCard;
    if (!show) {
      formatIdCard = idCard.substr(0, 3) + '****' + idCard.substr(14);
    }
    this.setState({
      idCard: formatIdCard,
    });
  };

  render() {
    return (
      <span>
        <span>{this.state.idCard || this.props.idCard}</span>
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
