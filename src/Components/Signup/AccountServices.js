import axios from 'axios';
import { AccountApis } from '../../Configurations/Api_endpoints';
export const AccountServices = {
    signupUser: (data) => {
        return axios.post(AccountApis.signupUser, data)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    signupInvitedUser: (data) => {
        return axios.post(AccountApis.acceptInvite, data)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    forgotPassword: (data) => {
        return axios.post(AccountApis.forgotPassword, data)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    login: (data) => {
        return axios.post(AccountApis.login, data)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    logout: (data) => {
        return axios.post(AccountApis.logout, data)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    resetPassword: (data) => {
        return axios.post(AccountApis.resetPassword, data)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    changePassword: (data) => {
        return axios.patch(AccountApis.changePassword, data)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    getProfile: () => {
        return axios.get(AccountApis.getProfile)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    verifyEmail: (email) => {
        return axios.get(AccountApis.verifyEmail + email)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    resendConfirmationEmail: (data) => {
        return axios.post(AccountApis.resendConfirmationEmail, data)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },

    editProfile: (data) => {
        return axios.post(AccountApis.editProfile, data)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    deleteAccount: () => {
        return axios.delete(AccountApis.deleteAccount)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    deleteUserFromCompany: (id) => {
        return axios.delete(`${AccountApis.deleteUserFromCompany}${id}`)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    getCompany: () => {
        return axios.get(AccountApis.getCompany)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    updateCompany: (data) => {
        return axios.post(AccountApis.updateCompany, data)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    getBilling: () => {
        return axios.get(AccountApis.getBilling)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    updateBilling: (data) => {
        return axios.post(AccountApis.updateBilling, data)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    sendInquiry: (data) => {
        return axios.post(AccountApis.inquiry, data)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    replyInquiry: (data) => {
        return axios.post(AccountApis.replyInquiry, data)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    getInquiries: () => {
        return axios.get(AccountApis.getInquiries)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
<<<<<<< HEAD
    inquiriesSearch: (data, pageNumber = 1, pageSize = 50) => {
        return axios.post(`${AccountApis.inquiriesSearch}?page=${pageNumber}&per_page=${pageSize}`, data)
=======
    inquiriesSearch: (data) => {
        return axios.post(AccountApis.inquiriesSearch,data)
>>>>>>> 2d9a972bec9328ea54a70b22831855f5912104e4
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    getInquiryHistory: (id) => {
        return axios.get(`${AccountApis.getInquiryHistory}${id}`)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    inviteUser: (email) => {
        return axios.post(AccountApis.invite, { email: email })
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
}