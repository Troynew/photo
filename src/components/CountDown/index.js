import { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class CountDown extends PureComponent {
  static propTypes = {
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    delay: PropTypes.number,
    onEnd: PropTypes.func,
  };

  static defaultProps = {
    end: 0,
    delay: 1000,
    onEnd: () => {},
  };

  state = {
    count: this.props.start,
  };

  componentDidMount() {
    this.intervalId = setInterval(this.tick, this.props.delay);
  }

  componentWillUnmout() {
    this._clearInterval();
  }

  _clearInterval = () => {
    clearInterval(this.intervalId);
  };

  tick = () => {
    const count = this.state.count;
    this.setState(
      () => ({
        count: count - 1,
      }),
      () => {
        if (count === this.props.end + 1) {
          this.props.onEnd();
          this._clearInterval();
        }
      }
    );
  };

  render() {
    return `${this.state.count} 秒`;
  }
}
