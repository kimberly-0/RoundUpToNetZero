import React from 'react';
import Layout from '../layout/Layout';
import SettingsNav from '../layout/SettingsNav';

const Settings = ({ userId, children }) => {

    function handleSubmit({ updateFn, args, confirmMessage }) {
        if (window.confirm(confirmMessage)) {
            return updateFn(args).then(() => {
                console.log("Changes saved!");
            }).catch(error => {
                console.log(error);
            });
        } else {
            console.log("Changes not saved");
        }
    };

    return (
        <Layout>
            <h2 className='page-title'>Settings</h2>
            <SettingsNav />
            {React.cloneElement(children, { userId, onSubmit: handleSubmit })}
        </Layout>
    );
}

export default Settings;
