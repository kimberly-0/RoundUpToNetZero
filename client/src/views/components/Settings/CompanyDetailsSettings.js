import { useState } from 'react';
import { useAsync, useAsyncFn } from '../../../hooks/useAsync';
import { getUser, updateUser } from '../../../services/user';
import { createCompany, updateCompany } from '../../../services/company';

export default function CompanyDetailsSettings({  
    userId,
    onSubmit,
    error = null,
    initialData = {
        company: {
            id: '',
            name: '',
            registrationNumber: '',
            industry: '',
            numberOfEmployees: '',
    }} }) {

    const [companyData, setCompanyData] = useState(initialData.company);

    function updateFields(fields) {    
        setCompanyData(prev => {
            return { ...prev, ...fields }
        })
    }

    const { loadingUser, errorUser, value: user } = useAsync(() => getUser({ userId }).then(user => {
        if (user.company) {
            updateFields(user.company);
        }
    }).catch(error => console.log(error)), [userId]);
    
    const { loadingUpdate, execute: updateCompanyFn } = useAsyncFn(updateCompany);
    const { loadingCreate, execute: createCompanyFn } = useAsyncFn(createCompany);
    const { loadingUserUpdate, execute: updateUserFn } = useAsyncFn(updateUser);

    function allFieldsAreEmptyExceptId(fields) {
        for (const [key, value] of Object.entries(fields)) {
            if (key === 'id') continue;
            if (value) return false;
        }
        return true;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (allFieldsAreEmptyExceptId(companyData)) {
            console.log("Remove user from company")
            onSubmit({
                updateFn: updateUserFn, 
                args: { 
                    userId, 
                    user: { companyId: null }
                }, 
                confirmMessage: "Are you sure you want to remove yourself from this company?"
            });
        } else {
            console.log("Create or update user from company")
            onSubmit({
                updateFn: user?.company ? updateCompanyFn : createCompanyFn, 
                args: { 
                    userId,
                    companyId: companyData.id,
                    company : {
                        name: companyData.name,
                        registrationNumber: companyData.registrationNumber,
                        industry: companyData.industry,
                        numberOfEmployees: Number(companyData.numberOfEmployees),
                    }
                }, 
                confirmMessage: "Are you sure you want to save the changes?"
            });
        }
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
                        value={companyData.name}
                        onChange={e => {updateFields({name: e.target.value})}}
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor="company-reg-number">Company registration number</label>
                    <input
                        type='text'
                        name='company-reg-number'
                        value={companyData.registrationNumber}
                        onChange={e => {updateFields({registrationNumber: e.target.value})}}
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor="industry">Industry</label>
                    <input
                        type='text'
                        name='industry'
                        value={companyData.industry}
                        onChange={e => {updateFields({industry: e.target.value})}}
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor="num-of-employees">Number of employees</label>
                    <input
                        type='number'
                        name='num-of-employees'
                        value={companyData.numberOfEmployees}
                        onChange={e => {updateFields({numberOfEmployees: e.target.value})}}
                    />
                </div>

                <div className='transaction-form-section button-section  full-width'>
                    <p className={`error-msg ${!error ? "hide" : ""}`}>{error}</p>
                    <button 
                        className='form-button rounded-button coloured' 
                        type='submit'
                        disabled={loadingCreate || loadingUpdate || loadingUserUpdate}
                    >Save changes</button>
                </div>
            </form>
        </div>
    )
}
