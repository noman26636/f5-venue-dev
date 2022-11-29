import axios from "axios"
import { HomePageApis } from "../../Configurations/Api_endpoints"



export const HomeServices =  {
    getFeaturedVenue : () => {
        return axios.get(`${HomePageApis.getHowItWork}`).then(res => res.data).catch(error => {
            return error;
        });
    }
}