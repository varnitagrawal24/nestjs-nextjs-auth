import axios, { AxiosRequestConfig } from 'axios';
import { getAuth } from './auth';


const requestHandler = async (
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: any,
  withAuth: boolean = false
) => {

  const headers: Record<string, string> = {
    'content-type': 'application/json',
  };

  if (withAuth) {
    const session = await getAuth();
    headers['x-access-token'] = session?.token || '';
  }

  const config: AxiosRequestConfig = {
    method,
    url,
    headers,
    ...(data ? { data } : {}),
  };

  try {
    const response = await axios(config);
    return response?.data;
  } catch (e: any) {
    return {
      success: false,
      message: e.message,
      error: {
        ...e,
        response: { ...e.response, data: { ...e?.response?.data, ...e?.response?.data?.data } },
      },
      errorMessage: e?.response?.data?.message,
    };
  }
};


export const getWithAuth = (url: string) => requestHandler('get', url, undefined, true);
export const getWithOutAuth = (url: string) => requestHandler('get', url, undefined, false);

export const postWithAuth = (url: string, entity: any = {}) => requestHandler('post', url, entity, true);
export const postWithOutAuth = (url: string, entity: any = {}) => requestHandler('post', url, entity, false);

export const putWithAuth = (url: string, entity: any = {}) => requestHandler('put', url, entity, true);
export const putWithOutAuth = (url: string, entity: any = {}) => requestHandler('put', url, entity, false);

export const deleteWithAuth = (url: string) => requestHandler('delete', url, undefined, true);
export const deleteWithOutAuth = (url: string) => requestHandler('delete', url, undefined, false);
