import { authRefreshTokens } from '$lib/api/auth/auth';
import { axiosInstance } from '$lib/custom-instance';
import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { jwtDecode } from 'jwt-decode';

export const handle: Handle = async ({ event, resolve }) => {
  axiosInstance.defaults.headers.common['Cookie'] = event.request.headers.get('cookie') ?? '';

  if (event.url.pathname.startsWith('/auth')) return resolve(event);

  const accessToken = event.cookies.get('accessToken');
  const refreshToken = event.cookies.get('refreshToken');

  const isExpired = accessToken ? jwtDecode(accessToken).exp! * 1000 < Date.now() : true;

  if (isExpired) {

    if (!refreshToken) return resolve(event);

    try {
      const res = await authRefreshTokens({ refreshToken });
      console.log(res.data);

      event.cookies.set('accessToken', res.data.data.accessToken, { path: '/' });
      event.cookies.set('refreshToken', res.data.data.refreshToken, { path: '/' });
      axiosInstance.defaults.headers.common['Cookie'] =
        `accessToken=${res.data.data.accessToken}; refreshToken=${res.data.data.refreshToken}`;
    } catch (error) {
      console.log(error);

      throw redirect(302, '/auth/login');
    }
  }

  return resolve(event);
};
