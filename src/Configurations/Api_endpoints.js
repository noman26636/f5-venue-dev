import { Constants } from "./Constants";

const baseUrl = `${Constants.domainUrl}api/`;
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
  refreshToken: `${baseUrl}refresh`,
  resendConfirmationEmail: `${baseUrl}Account/ResendConfirmationEmail`,
  inquiry: `${baseUrl}inquiry`,
  replyInquiry: `${baseUrl}replyback`,
  getInquiries: `${baseUrl}inquiries`,
  inquiriesSearch: `${baseUrl}inquirysearch`,
  getInquiryHistory: `${baseUrl}inquiry/`,
  invite: `${baseUrl}invite`,
  acceptInvite: `${baseUrl}accept`,
  deleteUserFromCompany: `${baseUrl}deletemember/`,
  getCompany: `${baseUrl}company`,
  updateCompany: `${baseUrl}updatecompany`,
  getBilling: `${baseUrl}companybill`,
  updateBilling: `${baseUrl}billingupdate`,
  getProfile: `${baseUrl}profile`,
  editProfile: `${baseUrl}edit`,
};
export const VenueApis = {
  getallVenues: `${baseUrl}allvenues`,
  getUserVenues: `${baseUrl}venues`,
  getFeaturedVenues: `${baseUrl}featured`,
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
  deleteVenue: `${baseUrl}delete/`,
  addWishlist: `${baseUrl}wishlist`,
  getWishlistDetails: `${baseUrl}showwishlist/`,
  getAllWishlists:`${baseUrl}vendorwishlist`,
  addVenueToWishlist: `${baseUrl}wishlistvenue`,
  deleteWishlist: `${baseUrl}deletewishlist/`,
  deleteWishlistVenue: `${baseUrl}deleteWishlistVenue/`,
  postReview: `${baseUrl}reviews/`,
  publishVenue: `${baseUrl}publish/`,
  deleteVenueImage: `${baseUrl}deleteimage/`,
  getImages: `${baseUrl}slider_images`,

};

export const HomePageApi = {
  getHowItWorks : `${baseUrl}dk/homepage/1`,
  getFeatures: `${baseUrl}dk/homepage/2`,
  getHomePageTitle: `${baseUrl}dk/homepage/3`,
}

export const BookingApis = {
  saveIcalFeed: `${baseUrl}icalfeed`,
};
export const CMSPagesApis={
  getPageContent: `${baseUrl}sitepage/`,
}