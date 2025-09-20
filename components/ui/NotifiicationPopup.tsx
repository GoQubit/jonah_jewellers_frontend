import React from 'react';

const NotificationPopup = ({ message, visible, className = '' }: { message: string, visible: boolean, className?: string }) => {
    return (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white py-2 px-4 rounded shadow-lg opacity-0 transition-all duration-300 text-center ${visible ? 'translate-y-[30px] opacity-100' : 'translate-y-[-75px]'} z-50 ${className} `}>
            {message}
        </div>
    );
};

export default NotificationPopup;
