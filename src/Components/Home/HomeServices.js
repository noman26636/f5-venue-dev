import axios from "axios"
import { HomePageApi } from "../../Configurations/Api_endpoints"



export const HomeServices =  {
    getHomeServices : () => {
        return axios.get(`${HomePageApi.getHomePage}`).then(res => res.data).catch(error => {
            return error;
        });
    }
}