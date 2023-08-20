import { makeRequest } from './makeRequest'
import { updateUser } from './user';

export function createCompany({ userId, company }) {
    return makeRequest(`/companies`, {
        method: "POST",
        data: { company: company },
    }).then(company => {
        return updateUser({ userId, user: { companyId: company.id } });
    });
}

export function updateCompany({ companyId, company }) {
    return makeRequest(`/companies/${companyId}`, {
        method: "PUT",
        data: { company: company },
    });
}