const prodUrl = 'https://.../api/';
const devUrl = 'https://.../api/';

let apiUrl
switch (process.env.NODE_ENV) {
  case 'development':
    apiUrl = devUrl;
    break;
  case 'production':
    apiUrl = prodUrl;
    break;
  default:
    apiUrl = devUrl;
    break;
}

export const url = apiUrl;

export async function request(url) {
  const response = await fetch(`${url}&secret=${process.env.REACT_APP_ADMIN_SECRET}`);
  const json = await response.json();
  const {
    error = null,
    success,
    data,
  } = json || {};

  if (error) throw new Error(error);
  if (!success) throw new Error('E_UNKNOWN');

  return data;
}
