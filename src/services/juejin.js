
const axios = require('axios');
const { getJuejinCookie, randomID } = require('../util');

const MESSAGE_COUNT = `https://api.juejin.cn/interact_api/v1/message/count?aid=2608&uuid=${randomID()}&spider=0`;
const MESSAGE_LIST = `https://api.juejin.cn/interact_api/v1/message/get_message?aid=2608&uuid=${randomID()}&spider=0`;
function extractData({ status, data }) {
    if (status === 200) {
      const { err_no } = data;
      if (err_no === 0) {
        return data.data;
      }
    }
    return null;
  }

async function getMessageCount() {
    const cookie = getJuejinCookie();
    if (cookie) {
        const data = await axios({
            url: MESSAGE_COUNT,
            method: 'GET',
            headers: {
              Cookie: cookie,
            },
        });
        return extractData(data);
    }
}

async function getMessageList(param) {
    const cookie = getJuejinCookie();
    if (cookie) {
        const data = await axios({
            url: MESSAGE_LIST,
            method: 'POST',
            data: {
              cursor: '0',
              limit: 20,
              ...param
            },
            headers: {
              Cookie: cookie,
            },
        });
        return extractData(data);
    }
}

module.exports = {
    getMessageCount,
    getMessageList
}