import { message } from 'antd';

if (!require('clipboard').isSupported()) {
  message.warn('当前浏览器不支持复制功能');
}
