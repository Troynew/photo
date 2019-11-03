import PropTypes from 'prop-types';

export const propTypes = {
  config: PropTypes.shape({
    label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
    name: PropTypes.string.isRequired,
    initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    placeholder: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
      })
    ),
    format: PropTypes.string,
  }),
  getFieldDecorator: PropTypes.func,
};

export const defaultProps = {
  config: Object.create(null),
  getFieldDecorator: () => {},
};

export const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export const modalFormItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
