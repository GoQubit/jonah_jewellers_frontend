"use client"
import { useCookies } from 'react-cookie';
const useIsAuth = () => {
  const [cookie] = useCookies(["authToken"]);
  const isAuth = cookie.authToken;
  return isAuth;
};

export default useIsAuth;
