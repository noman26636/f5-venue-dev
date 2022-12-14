import axios from "axios"
import { HomePageApi } from "../../Configurations/Api_endpoints"



export const HomeServices =  {
  
    getFeaturesServices : () => {
        return axios.get(`${HomePageApi.getFeatures}`).then(res => res.data).catch(error => {
            return error;
        });
    },
    getHowItWorksServices : () => {
        return axios.get(`${HomePageApi.getHowItWorks}`).then(res => res.data).catch(error => {
            return error;
        });
    },
    getHomePageTitleServices: () => {
        return axios.get(`${HomePageApi.getHomePageTitle}`).then(res => res.data).catch(error => {
            return error;
        })
    },
}