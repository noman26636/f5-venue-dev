import axios from 'axios';
import { AccountApis } from '../../Configurations/Api_endpoints';
export const AccountSevices = {
    signupUser: (data) => {

        return axios.post(AccountApis.signupUser, data)
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
    refreshToken: (data) => {
        return axios.post(AccountApis.refreshToken, data)
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
        return axios.post(AccountApis.changePassword, data)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    getProfile: (data) => {
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
        return axios.put(AccountApis.editProfile, data)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
}