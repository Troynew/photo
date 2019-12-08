import fetch from 'dva/fetch';
import router from 'umi/router';
import { message, notification } from 'antd';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const checkStatus = response => {
  if (response.code >= 200 && response.code < 300) {
    return response;
  }
  const errortext = codeMessage[response.code] || response.statusText;
  if (response.code !== 401) {
    notification.error({
      message: `请求错误 ${response.code}: ${response.url}`,
      description: errortext,
    });
  }

  const error = new Error(errortext);
  error.name = response.code;
  error.response = response;
  throw error;
};

const str2num = ['pageIndex', 'pageSize'];

const transformParams = params => {
  const newParams = { ...params };
  Object.keys(params).forEach(key => {
    if (str2num.includes(key)) {
      newParams[key] = Number(params[key]);
    }
  });
  return newParams;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options = {}) {
  // eslint-disable-next-line
  const completeUrl = DOMAIN + url;
  const token = localStorage.getItem('token');
  if (
    options.method === 'POST' ||
    options.method === 'PUT' ||
    options.method === 'DELETE' ||
    options.method === 'PATCH'
  ) {
    const params = options.body || {};

    if (options.isFormData) {
      options.headers = {
        ...options.headers,
        Accept: 'application/json',
      };
      const formData = new FormData();
      // eslint-disable-next-line
      for (let key in params) {
        if ({}.hasOwnProperty.call(params, key) && params[key] != null) {
          formData.append(key, params[key]);
        }
      }
      options.body = formData;
    } else {
      options.headers = {
        ...options.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      };
      options.body = JSON.stringify(transformParams(params));
    }
  }
  options.headers = {
    ...options.headers,
    Authorization: token,
  };
  return (
    fetch(completeUrl, options)
      // .then(checkStatus)
      .then(response => {
        // DELETE and 204 do not return data by default
        // using .json will report an error.
        // if (newOptions.method === 'DELETE' || response.status === 204) {
        //   return response.text();
        // }
        return response.json();
      })
      .then(res => {
        console.log('url===>', url, res);
        if (res.code === 1) {
          return { status: false };
        }
        if (res.code === 0 && url === 'login') {
          localStorage.setItem('token', res.token);
        }
        if (res.code === 200 && url === 'out') {
          localStorage.removeItem('token');
          router.replace('/login');
        }
        if (res.code === 501) {
          localStorage.removeItem('token');
          message.warn('登录失效，请重新登录', 1).then(() => router.replace('/login'));
        }
        const hasStatusKey = {}.hasOwnProperty.call(res, 'code');
        const isTrue = hasStatusKey ? [0, 200].includes(res.code) : false;
        // if (!isTrue && !options.hideMessage) {
        //   message.error(res.message);
        // }
        if (hasStatusKey) res.status = isTrue;
        return res;
      })
      .catch(e => {
        const status = e.code;
        if (status === 401) {
          router.push('/exception/403');
        }
        // environment should not be used
        if (status === 403) {
          router.push('/exception/403');
        }
        if (status <= 504 && status >= 500) {
          router.push('/exception/500');
        }
        if (status >= 404 && status < 422) {
          router.push('/exception/404');
        }
      })
  );
}
