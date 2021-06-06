import Taro from '@tarojs/taro';

type VALID_METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const request = (
  url: string,
  data?: any,
  method: VALID_METHOD = 'GET',
  baseURL = '/api',
) => {
  const token = Taro.getStorageSync('user_token');

  const contentType = ['GET', 'DELETE'].includes(method)
    ? 'application/x-www-form-urlencoded'
    : 'application/json';

  return new Promise((resolve, reject) => {
    console.log(`${baseURL}${url}`, data, method, contentType)
    return Taro.request({
      method,
      url: `http://rap2api.taobao.org/app/mock/280804/${url}`,
      data,
      header: {
        token,
        'content-type': contentType,
      },
    }).then(response => {
      const { statusCode, data: resData } = response;

      if (statusCode >= 200 && statusCode < 300) {
        const { code } = resData;
        if (code === 0) {
          console.log(`✅ Success: ${url}`, resData);
          resolve(resData);
        } else if (code === 401) {
          Taro.showToast({
            title: '登录过期',
            icon: 'none',
          });
          Taro.showModal({
            title: '提示',
            content: '登录状态已失效，请重新登录',
            confirmText: '重新登录',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                Taro.removeStorageSync('user_token');
                Taro.reLaunch({
                  url: '/pages/index/index',
                });
              }
            },
          });
        } else {
          Taro.showToast({
            title: resData.msg,
            icon: 'none',
            duration: 2000,
          });
          console.log(`⭕️ Response Error: ${url}`, resData);
          reject(resData);
        }
      } else {
        const message = '操作失败';
        Taro.showToast({ title: message, icon: 'none' });
        reject(new Error(message));
      }
    });
  });
};

export const wxRequest = (url: string, method: VALID_METHOD, data?: any) => {
  return new Promise((resolve, reject) => {
    const { needCatch } = data || { needCatch: false };
    request(url, data, method)
      .then(res => {
        resolve(res);
      })
      .catch(res => {
        if (needCatch) {
          reject(res);
        }
      });
  });
};

export const get = (url, data = {}) => wxRequest(url, 'GET', data);

export const del = (url, data = {}) => wxRequest(url, 'DELETE', data);

export const post = (url, data = {}) => wxRequest(url, 'POST', data);

export const put = (url, data = {}) => wxRequest(url, 'PUT', data);
