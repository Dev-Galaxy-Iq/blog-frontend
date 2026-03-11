import { authRefreshTokens } from '$lib/api/auth/auth';
import { axiosInstance } from '$lib/custom-instance';
import type { Handle } from '@sveltejs/kit';
import { jwtDecode } from 'jwt-decode';

export const handle: Handle = async ({ event, resolve }) => {
  const accessToken = event.cookies.get("accessToken")



  axiosInstance.defaults.headers.common['Cookie'] = event.request.headers.get('cookie') ?? '';


  return await resolve(event)
}

