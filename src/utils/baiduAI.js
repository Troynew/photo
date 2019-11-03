import { message } from 'antd';

import { fetchAIToken } from '@/services/common';

export async function speech(text) {
  const data = await fetchAIToken();

  if (!data.status) return;

  if (!data.body || !data.body.token) {
    message.warn('语音文件生成失败');
    return;
  }

  const token = data.body.token;
  const encodeText = encodeURI(text);
  const url = `http://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=abcdefg&tok=${token}&tex=${encodeText}&vol=9&per=0&spd=5&pit=5&aue=3`;
  const n = new Audio(url);
  n.src = url;
  n.play();
}
