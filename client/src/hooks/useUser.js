import { useState } from 'react';

export function useUser() {

    const getUserId = () => {
        const userIdString = localStorage.getItem('userId');
        return userIdString;
    };

    const [userId, setUserId] = useState(getUserId());

    const saveUserId = userId => {
        localStorage.setItem('userId', JSON.stringify(userId));
        setUserId(userId);
    };

    return {
        setUserId: saveUserId,
        userId
    }
}