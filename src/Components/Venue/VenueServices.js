import axios from 'axios';
import { VenueApis } from '../../Configurations/Api_endpoints';
export const VenueServices = {
    getallVenues: (pageNumber = 1, pageSize = 20) => {
        return axios.get(`${VenueApis.getallVenues}?page=${pageNumber}&page_size=${pageSize}`)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    getVenueDetails: (id) => {
        return axios.get(`${VenueApis.getVenueDetails}${id}`)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    venueSearch: (data, pageNumber = 1, pageSize = 20) => {
        return axios.post(`${VenueApis.venueSearch}?page=${pageNumber}&per_page=${pageSize}`, data)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    getConfigList: () => {
        return axios.get(VenueApis.getConfigList)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    publishVenue: (id) => {
        return axios.post(`${VenueApis.publishVenue}${id}`)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    addVenue: () => {
        return axios.post(VenueApis.addVenue)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    editVenue: (id, data) => {
        return axios.post(`${VenueApis.publishVenue}${id}`, data)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    deleteVenue: (id) => {
        return axios.delete(`${VenueApis.deleteVenue}/${id}`)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    showWishlist: (id) => {
        let url = VenueApis.showWishlist;
        // if (id) url = `${url}/${id}`
        return axios.get(url)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    addWishlist: (data) => {
        return axios.post(VenueApis.addWishlist, data)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    addVenueToWishlist: (data) => {
        return axios.post(VenueApis.addVenueToWishlist, data)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    deleteWishlist: (id) => {
        return axios.delete(`${VenueApis.deleteWishlist}${id}`)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    deleteWishlistVenue: (id, venueId) => {
        return axios.delete(`${VenueApis.deleteWishlistVenue}${id}/venue/${venueId}`)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
}