import axios from 'axios';
import { CMSPagesApis } from '../../Configurations/Api_endpoints';
export const CmsServices = {
    getPageContent: (id) => {
        return axios.get(`${CMSPagesApis.getPageContent}${id}`)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
   
}