import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Alert, message } from 'antd';
import Login from '@/components/Login';
import styles from './index.less';
import router from 'umi/router';

const { Tab, UserName, Password, Submit } = Login;

@connect(({ loading }) => ({
  submitting: loading.effects['global/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
  };

  componentDidMount() {
    const { type } = this.props.location.query;
    if (type) this.setState({ type });
  }

  handleSubmit = (err, values) => {
    if (!err) {
      const { type } = this.state;
      const { dispatch } = this.props;
      if (type === 'account') {
        dispatch({
          type: 'global/login',
          payload: {
            ...values,
            rememberMe: 'true',
          },
        }).then(res => {
          if (res.code === 0) {
            router.replace('/userManage');
          } else if (res.code === 500 && res.msg === '用户已封禁，请联系管理员') {
            message.warn('您的账号已被停用，请联系店长', 2);
          } else {
            message.warn(`${res.msg}`);
          }
        });
      } else {
        dispatch({
          type: 'global/editPassword',
          payload: {
            ...values,
          },
        }).then(res => {
          if (res.code === 0) {
            message.success('修改密码成功，请重新登录');
            this.setState({ type: 'account' });
          } else {
            message.warn(`${res.msg}`);
          }
        });
      }
    }
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  onTabChange = activeTab => {
    this.setState({ type: activeTab });
  };

  render() {
    const { submitting } = this.props;
    const { type } = this.state;
    console.log('type', type);
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab={formatMessage({ id: 'app.login.tab-login-credentials' })}>
            {/* {login.status === 'error' &&
              login.type === 'account' &&
              !submitting &&
              this.renderMessage(formatMessage({ id: 'app.login.message-invalid-credentials' }))} */}
            <UserName
              name="username"
              placeholder="请输入用户名"
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
              ]}
            />
            <Password
              name="password"
              placeholder="请输入密码"
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
              onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
            />
          </Tab>
          <Tab key="editPassword" tab={formatMessage({ id: 'app.login.tab-login-editPassword' })}>
            {/* {login.status === 'error' &&
              login.type === 'account' &&
              !submitting &&
              this.renderMessage(formatMessage({ id: 'app.login.message-invalid-credentials' }))} */}
            <UserName
              name="username"
              placeholder="请输入用户名"
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
              ]}
            />
            <Password
              name="oldPassword"
              placeholder="请输入旧密码"
              rules={[
                {
                  required: true,
                  message: '请输入旧密码',
                },
              ]}
              onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
            />
            <Password
              name="newPassword"
              placeholder="请输入新密码"
              rules={[
                {
                  required: true,
                  message: '请输入新密码',
                },
              ]}
              onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
            />
            <Password
              name="confirm"
              placeholder="请确认新密码"
              rules={[
                {
                  required: true,
                  message: '请确认新密码',
                },
              ]}
              onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
            />
          </Tab>

          <Submit loading={submitting}>
            <FormattedMessage
              id={type === 'account' ? 'app.login.login' : 'app.login.editPassword'}
            />
          </Submit>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
