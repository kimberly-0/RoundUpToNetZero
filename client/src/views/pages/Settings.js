import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import SettingsNav from '../layout/SettingsNav';

const Settings = ({ userId, children }) => {

    const [error, setError] = useState(null);

    useEffect(() => {
        setError(null);
    }, [children]);

    function handleSubmit({ updateFn, args, confirmMessage }) {
        if (window.confirm(confirmMessage)) {
            return updateFn(args).then(() => {
                console.log("Changes saved!");
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
        } else {
            console.log("Changes not saved");
        }
    };

    return (
        <Layout>
            <h2 className='page-title'>Settings</h2>
            <SettingsNav />
            {React.cloneElement(children, { userId, onSubmit: handleSubmit, error })}
        </Layout>
    );
}

export default Settings;
