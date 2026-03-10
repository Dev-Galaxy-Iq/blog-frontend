import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function parseSetCookie(setCookie: string[]) {
  return setCookie.map(cookie => {
    const [nameValue, ...attrs] = cookie.split(';').map(s => s.trim())
    const [name, value] = nameValue.split('=')

    const options: Record<string, any> = { path: '/' }
    for (const attr of attrs) {
      const [k, v] = attr.split('=')
      switch (k.toLowerCase()) {
        case 'path': options.path = v; break
        case 'max-age': options.maxAge = Number(v); break
        case 'httponly': options.httpOnly = true; break
        case 'secure': options.secure = true; break
        case 'samesite': options.sameSite = v?.toLowerCase(); break
      }
    }
    return { name, value, options }
  })
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
