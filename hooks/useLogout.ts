// hooks/useLogout.js
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { clearUserProfile } from '@/redux/Features/userSlice/userSlice';

const useLogout = () => {
  const router = useRouter();
  const dispatch = useDispatch()

  const logout = () => {
    // Clear all localStorage data
    localStorage.clear();

    // Clear Redux state (if applicable)
    dispatch(clearUserProfile());

    // Clear all cookies
    Object.keys(Cookies.get()).forEach(cookieName => {
      Cookies.remove(cookieName);
    });


    // Redirect to the login page
    window.location.replace('/');
  };

  return logout;
};

export default useLogout;
