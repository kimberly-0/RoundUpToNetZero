import { makeRequest } from './makeRequest'

export function updateCompany({ companyId, company }) {
    return makeRequest(`/companies/${companyId}`, {
        method: "PUT",
        data: { company: company },
    });
}