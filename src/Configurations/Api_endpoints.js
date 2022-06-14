const domainUrl =
  window.location.href.indexOf('staging') === -1
    ? 'http://test.event-venue.dk/'
    : 'https://uat-letzwork.azurewebsites.net/'
const baseUrl = `${domainUrl}api/`
export const AccountApis = {
  signupUser: `${baseUrl}register`,
  login: `${baseUrl}login`,
  logout: `${baseUrl}logout`,
  forgotPassword: `${baseUrl}forgotpassword`,
  resetPassword: `${baseUrl}resetpassword`,
  verifyEmail: `${baseUrl}Account/VerifyEmail?email=`,
  verifyCode: `${baseUrl}Account/VerifyCode`,
  changePassword: `${baseUrl}Manage/ChangePassword`,
  confirmEmail: `${baseUrl}Account/ConfirmEmail`,
  refreshToken: `${baseUrl}Account/RefreshToken`,
  resendConfirmationEmail: `${baseUrl}Account/ResendConfirmationEmail`,
  // getProfile: `${baseUrl}Manage/UserProfile`,
  // editProfile: `${baseUrl}Manage/UserProfile`,
}
export const TaskApis = {
  getallCategories: `${baseUrl}Category`,
  getallSubcategories: `${baseUrl}SubCategory?CategoryId=`,
  getallCities: `${baseUrl}Region`,
  getDynamicForm: `${baseUrl}SubCategory/getDynamicForm/`,
  getVehicleInfo: `${baseUrl}DMRMotorApi/`,
  createTask: `${baseUrl}Tasks`,
  uploadTaskPicture: `${baseUrl}/PictureApi/Upload`,
  getTaskDetails: `${baseUrl}Tasks/`,
  markTaskComplete_User: `${baseUrl}Tasks/Complete?id=`,
  submitProReview: `${baseUrl}Review`
}

export const HomeApis = {
  totalTasksPostedAndCompleted: `${baseUrl}Tasks/Dashboard`,
  activeTasksList: `${baseUrl}Tasks/ActiveList`,
  archivedTasksList: `${baseUrl}Tasks/ArchivedList`,
  deleteTask: `${baseUrl}Tasks/`,
  cancelTask: `${baseUrl}Tasks/cancel?id=`,
  taskDetails: `${baseUrl}Tasks/`,
  quotes: `${baseUrl}Tasks/Quotes/`,
  rejectOffer: `${baseUrl}Tasks/Reject?id=`,
  acceptOffer: `${baseUrl}Tasks/Accept?id=`
}
export const ChatApis = {
  getPrivateChat: `${baseUrl}Message/`,
  sendMessage: `${baseUrl}Message/Messages/`,
  getActiveChatList: `${baseUrl}Conversation?Status=1`,
  getArchivedChatList: `${baseUrl}Conversation?Status=2`,
  deleteChat: `${baseUrl}Conversation/Conversations/`,
  archiveChat: `${baseUrl}Conversation/`,
  hubConnection: `${domainUrl}notificationHub`,
  uploadPicture: `${baseUrl}/PictureApi/Upload`
}
export const proApis = {
  proDashboard: `${baseUrl}ProTask/Dashboard`,
  activeTaskList: `${baseUrl}ProTask/ActiveList`,
  archivedTaskList: `${baseUrl}ProTask/ArchivedTaskList`,
  availableTaskList: `${baseUrl}ProTask/AvailableTaskList?`,
  submitOffer: `${baseUrl}ProTask/SendOffer`,
  withdrawOffer: `${baseUrl}ProTask/WithDraw?id=`,
  completeOffer: `${baseUrl}ProTask/Complete?id=`,
  deleteOffer: `${baseUrl}ProTask/`,
  proTaskDetails: `${baseUrl}ProTask/`,
  deleteAvailableTask: `${baseUrl}ProTask/DeleteAvailableTask?id=`,
  createPost: `${baseUrl}PortFolio`,
  getSelectedCities: `${baseUrl}`,
  editTaskLocation: `${baseUrl}Manage/EditTaskLocation`,
  getProCities: `${baseUrl}Manage/ProTaskLocation`
}
export const ProReviewsApis = {
  getProReviewsList: `${baseUrl}Review/List/`
}
export const NotificationsApis = {
  getNotificationSettings: `${baseUrl}Notification`,
  saveNotificationSettings: `${baseUrl}Notification`,
  getNotificationList: `${baseUrl}Notification/List`,
  deleteNotification: `${baseUrl}Notification/`,
  setDeviceToken: `${baseUrl}DeviceToken`,
  deleteDeviceToken: `${baseUrl}DeviceToken`
}
export const PaymentApis = {
  getPaymentMethodsList: `${baseUrl}Payment/CardList`,
  deletePaymentMethod: `${baseUrl}Payment/`,
  getTransactionsList: `${baseUrl}Transactions?`,
  getReepaySession: `${baseUrl}Payment/Session`,
  charge: `${baseUrl}Payment/Charge`,
  getPaymentStatus: `${baseUrl}Payment/PaymentStatus`,
  setDefaultCard: `${baseUrl}Payment/`
}
