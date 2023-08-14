import Layout from '../layout/Layout';
import SettingsNav from '../layout/SettingsNav';

const Settings = ({ children }) => {
  return (
    <Layout>
        <h2 className='page-title'>Settings</h2>
        <SettingsNav />
        {children}
    </Layout>
  );
}

export default Settings;
