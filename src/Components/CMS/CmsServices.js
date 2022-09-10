import axios from 'axios';
import { CMSPagesApis } from '../../Configurations/Api_endpoints';
export const CmsServices = {
    getAboutPageContent: () => {
        return axios.get(`${CMSPagesApis.getAboutPageContent}`)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    getContactPageContent: () => {
        return axios.get(`${CMSPagesApis.getContactPageContent}`)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    getHelpPageContent: () => {
        return axios.get(`${CMSPagesApis.getHelpPageContent}`)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    getPrivacyPageContent: () => {
        return axios.get(`${CMSPagesApis.getPrivacyPageContent}`)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    getTermsPageContent: () => {
        return axios.get(`${CMSPagesApis.getTermsPageContent}`)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    }
}