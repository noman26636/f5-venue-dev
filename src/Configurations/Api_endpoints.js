import { Constants } from "./Constants"

const baseUrl = `${Constants.domainUrl}api/`
export const AccountApis = {
  signupUser: `${baseUrl}register`,
  login: `${baseUrl}login`,
  logout: `${baseUrl}logout`,
  forgotPassword: `${baseUrl}forgotPassword`,
  resetPassword: `${baseUrl}resetPassword`,
  changePassword: `${baseUrl}editpass`,
  deleteAccount: `${baseUrl}deleteaccount`,
  verifyEmail: `${baseUrl}Account/VerifyEmail?email=`,
  verifyCode: `${baseUrl}Account/VerifyCode`,
  confirmEmail: `${baseUrl}Account/ConfirmEmail`,
  refreshToken: `${baseUrl}Account/RefreshToken`,
  resendConfirmationEmail: `${baseUrl}Account/ResendConfirmationEmail`,
  inquiry: `${baseUrl}inquiry`,
  invite: `${baseUrl}invite`,
  acceptInvite: `${baseUrl}accept`,
  deleteUserFromCompany: `${baseUrl}deletemember/`,
  getCompany: `${baseUrl}company`,
  updateCompany: `${baseUrl}updatecompany`,
  getBilling: `${baseUrl}billing`,
  updateBilling: `${baseUrl}updatebilling`,
  editProfile: `${baseUrl}edit`,
}
export const VenueApis = {
  getallVenues: `${baseUrl}allvenues`,
  getVenueDetails: `${baseUrl}showvenue/`,
  venueSearch: `${baseUrl}search`,
  getEventTypes: `${baseUrl}event_types`,
  getVenueTypes: `${baseUrl}venue_types`,
  getActivitesList: `${baseUrl}activities`,
  getServicesList: `${baseUrl}services/`,
  getConfigList: `${baseUrl}configuration`,
  getSitepagesList: `${baseUrl}sitepages`,
  addVenue: `${baseUrl}addvenue`,
  editVenue: `${baseUrl}editvenue/`,
  deleteVenue: `${baseUrl}deletevenue/`,
  addWishlist: `${baseUrl}wishlist`,
  showWishlist: `${baseUrl}showwishlist`,
  addVenueToWishlist: `${baseUrl}wishlistvenue`,
  deleteWishlist: `${baseUrl}deletewishlist/`,
  deleteWishlistVenue: `${baseUrl}deleteWishlistVenue/`,
  postReview: `${baseUrl}reviews`,
  publishVenue: `${baseUrl}publishVenue/`,
}
export const BookingApis = {
  saveIcalFeed: `${baseUrl}icalfeed`,

}

