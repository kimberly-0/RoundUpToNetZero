import { useState } from 'react';
import { useAsync, useAsyncFn } from '../../../hooks/useAsync';
import { getUser } from '../../../services/user';
import { updateCompany } from '../../../services/company';

export default function CompanyDetailsSettings({  
    userId,
    onSubmit,
    initialData = {
        company: {
            id: '',
            name: '',
            registrationNumber: '',
            industry: '',
            numberOfEmployees: '',
    }} }) {

    const [companyId, setCompanyId] = useState(initialData.company.id);
    const [companyName, setCompanyName] = useState(initialData.company.name);
    const [companyRegNumber, setCompanyRegNumber] = useState(initialData.company.registrationNumber);
    const [industry, setIndustry] = useState(initialData.company.industry);
    const [numOfEmployees, setNumOfEmployees] = useState(initialData.company.numberOfEmployees);

    const { loadingUser, errorUser } = useAsync(() => getUser({ userId }).then(user => {
        setCompanyId(user.company.id);
        setCompanyName(user.company.name);
        setCompanyRegNumber(user.company.registrationNumber);
        setIndustry(user.company.industry);
        setNumOfEmployees(user.company.numberOfEmployees);
    }), [userId]);

    const { loadingUpdate, errorUpdate, execute: updateCompanyFn } = useAsyncFn(updateCompany);

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({
            updateFn: updateCompanyFn, 
            args: { 
                companyId, 
                company: {
                    name: companyName,
                    registrationNumber: companyRegNumber,
                    industry: industry,
                    numberOfEmployees: Number(numOfEmployees),
                }
            }, 
            confirmMessage: "Are you sure you want to save the changes?"
        });
    };

    if (loadingUser) return <h1>Loading</h1>

    if (errorUser) return <h1 className="error-msg">{errorUser}</h1>
  
    return (
        <div className='page-table-container component-container'>
            <div className='settings-title-container'>
                <h2 className='section-title'>Company details</h2>
                <p>Update your company details here.</p>
            </div>

            <form className='settings-form' onSubmit={handleSubmit}>
                <div className='input-container'>
                    <label htmlFor="company-name">Company name</label>
                    <input
                        type='text'
                        name='company-name'
                        value={companyName}
                        onChange={e => setCompanyName(e.target.value)}
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor="company-reg-number">Company registration number</label>
                    <input
                        type='text'
                        name='company-reg-number'
                        value={companyRegNumber}
                        onChange={e => setCompanyRegNumber(e.target.value)}
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor="industry">Industry</label>
                    <input
                        type='text'
                        name='industry'
                        value={industry}
                        onChange={e => setIndustry(e.target.value)}
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor="num-of-employees">Number of employees</label>
                    <input
                        type='number'
                        name='num-of-employees'
                        value={numOfEmployees}
                        onChange={e => setNumOfEmployees(e.target.value)}
                    />
                </div>

                <div className='transaction-form-section button-section  full-width'>
                    <p className={`error-msg ${!errorUpdate ? "hide" : ""}`}>{errorUpdate}</p>
                    <button 
                        className='form-button rounded-button coloured' 
                        type='submit'
                        disabled={loadingUpdate}
                    >Save changes</button>
                </div>
            </form>
        </div>
    )
}
