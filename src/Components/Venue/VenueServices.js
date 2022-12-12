import axios from 'axios';
import { VenueApis } from '../../Configurations/Api_endpoints';
export const VenueServices = {
    getImages: () => {
        return axios.get(`${VenueApis.getImages}`)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    getallVenues: () => {
        return axios.get(`${VenueApis.getallVenues}`)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    getUserVenues: (pageNumber = 1, pageSize = 50) => {
        return axios.get(`${VenueApis.getUserVenues}?page=${pageNumber}&page_size=${pageSize}`)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    getFeaturedVenues: (pageNumber = 1, pageSize = 15) => {
        return axios.get(`${VenueApis.getFeaturedVenues}?page=${pageNumber}&page_size=${pageSize}`)
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
   publishVenue: (id,data) => {
        return axios.put(`${VenueApis.publishVenue}${id}`,data)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    postReview: (id,data) => {
        return axios.post(`${VenueApis.postReview}${id}`,data)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    venueSearch: (data, pageNumber = 1, pageSize = 16) => {
        return axios.post(`${VenueApis.venueSearch}?page=${pageNumber}&page_size=${pageSize}`, data)
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
  
    addVenue: (data) => {
        return axios.post(VenueApis.addVenue,data)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    editVenue: (id, data) => {
        return axios.post(`${VenueApis.editVenue}${id}`, data)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    deleteVenue: (id) => {
        return axios.delete(`${VenueApis.deleteVenue}${id}`)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    deleteVenueImage: (id) => {
        return axios.delete(`${VenueApis.deleteVenueImage}${id}`)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    getWishlistDetails: (id) => {
        return axios.get(`${VenueApis.getWishlistDetails}${id}`)
            .then(response => response.data)
            .catch(error => {
                return error;
            });
    },
    getAllWishlists: () => {
        return axios.get(VenueApis.getAllWishlists)
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