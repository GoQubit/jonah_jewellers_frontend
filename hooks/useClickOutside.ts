import { useEffect } from 'react';

const useClickOutside = (handler: Function, ref: any) => {
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                handler();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handler, ref]);
};

export default useClickOutside;
