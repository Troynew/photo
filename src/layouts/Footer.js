import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import { copyrightMesssage } from '@/utils/config';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'help',
          title: '帮助',
          href: '/',
          blankTarget: true,
        },
        {
          key: 'privacy',
          title: '隐私',
          href: '/',
          blankTarget: true,
        },
        {
          key: 'terms',
          title: '条款',
          href: '/',
          blankTarget: true,
        },
        {
          key: 'filing',
          title: '闽IPC备 19023656',
          href: 'https://www.beian.miit.gov.cn',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> {copyrightMesssage}
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
