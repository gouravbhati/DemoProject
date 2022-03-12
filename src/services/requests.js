import { headerWithBearer } from './ServiceConstants';

const signalAbortAfter = 40000;

const showLog = (url, Status, method, body, res) => {
  console.log(
    '\x1b[33m%s\x1b[0m',
    '\n---------Fetch Request Started---------\n',
  );
  console.log('[Fetch] Url-->', url);
  console.log('[Fetch] Status-->', Status);
  console.log('[Fetch] METHOD-->', method);
  console.log('[Fetch] Body-->', body);
  console.log('[Fetch] Response-->', res);
  console.log('\x1b[33m%s\x1b[0m', '\n---------Fetch Request Ended---------\n');
};

const authError = () => {
  // Add logout action here
};

export const getRequest = async ({ header = headerWithBearer(), url }) => {
  try {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), signalAbortAfter);
    const response = await fetch(url, {
      headers: header,
      // signal: controller.signal
    });
    const result = await response.json();
    showLog(url, response.status, 'GET', null, result);

    if (response.status == 401) {
      return authError();
    }

    return result;
  } catch (e) {
    if (e.message == 'Aborted') {
      return abortError();
    }
    return error(e.message)
  }
};

const abortError = () => {
  const error =
    'Unable to connect with server! Request is taking longer than 30 seconds to fulfill';
  return {
    status: false,
    message: error,
  };
};

const error = (error) => {

  return {
    status: false,
    message: error,
  };
};
