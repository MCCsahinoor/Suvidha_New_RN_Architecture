/* eslint-disable prettier/prettier */
const ALL_ENDPOINTS = {
  //Map
  MapKey: "AIzaSyDxYpa13dNfY_mVL_IWD4gKgN3w1JRI77s",
  GoogleApiPath: "https://maps.googleapis.com/maps/api",
  // Auth
  UserLoginSendOTP: "api/v1.0/Auth/UserLoginSendOTP",
  ValidateUserLoginOTP: "api/v1.0/Auth/ValidateUserLoginOtpV1",
  GetAppVersionIOS: "api/v1.0/Application/GetIOSAppVersion",
  SignOut: "api/v1.0/Auth/SignOut",
  RefreshToken: "api/v1.0/Auth/RefreshToken",
  // Language
  GetLanguageList: "api/v1.0/Application/GetLanguageList",
  UpdateUserApplicableLanguag: "api/v1.0/Application/UpdateUserApplicableLanguage",
  AppApplicableLanguag: "api/v1.0/Application/AppApplicableLanguage",
  // Painter Registration
  PainterEnquiryEntry: "api/v1.0/Application/PainterEnquiryEntry",
  // Executive Login
  PainterSearch: "api/v1.0/Auth/PainterSearch",
  // ValidatePainterChangeLoginFromVirtualUser: "api/v1.0/Auth/ValidatePainterChangeLoginFromVirtualUser",
  ValidatePainterChangeLoginFromVirtualUser: "api/v1.0/Auth/ValidatePainterChangeLoginFromVirtualUserV1",
  RefreshTokenVirtual: "api/v1.0/Auth/RefreshTokenVirtual",
  // Applicable menu
  GetUserApplicableMenu: "api/v1.0/Auth/GetUserApplicableMenu",
  QuickLinksMenu: "api/v1.0/Auth/GetQuickLinkMenu",
  // user Profile
  GetUserProfile: "api/v1.0/Profile/GetMyProfileDetails",
  WhatsAppValidationSendOTP: "api/v1.0/Profile/WhatsAppValidationSendOTP",
  ValidateWhatsappNoOTP: "api/v1.0/Profile/ValidateWhatsappNoOTP",
  SaveMyProfileDetails: "api/v1.0/Profile/SaveMyProfileDetails",
  UploadDocument: "api/v1.0/Application/UploadDocument",
  GetScoreDetails: "api/v1.0/UserDashboard/GetScoreDetails",
  // KYC
  KycValidateIFSC: "api/v1.0/Application/ValidateIFSC",
  GetBankAccTypeLov: "api/v1.0/Application/GetBankAccTypeLov",
  GetMpKycDocTypeLov: "api/v1.0/Application/GetMpKycDocTypeLov",
  SaveKYC: "api/v1.0/Profile/SaveKYCDetails",
  // Scheme
  MyActiveSchemeList: "api/v1.0/GroupScheme/MyActiveSchemeList",
  SchemeDetails: "api/v1.0/GroupScheme/SchemeDetails",
  CreateGroup: "api/v1.0/GroupScheme/CreateGroup",
  GroupDetails: "api/v1.0/GroupScheme/GroupDetails",
  PainterDetailsByContact: "api/v1.0/GroupScheme/PainterDetailsByContact",
  MySchemePainterInvite: "api/v1.0/GroupScheme/MySchemePainterInvite",
  PainterInvitationAcceptance: "api/v1.0/GroupScheme/PainterInvitationAcceptance",
  GetSellOutSchemeList: "api/v1.0/Scheme/GetSellOutSchemeList",
  GetSellOutSchemeDetails: "api/v1.0/Scheme/GetSellOutSchemeDetails",
  // Scheme Doc
  GetDoc: "api/v1.0/Scheme/GetDoc",
  // Faq
  FaqDashboard: "api/v1.0/Application/FaqDashboard",
  // Utility
  Designs: "api/v1.0/Utility/Designs",
  // Training
  GetBookMyTrainingList: "api/v1.0/DailyActivity/GetBookMyTrainingList",
  GetActivityDetails: "api/v1.0/DailyActivity/GetActivityDetails",
  SetActivityPlanningTrainee: "api/v1.0/DailyActivity/SetActivityPlanningTrainee",
  GetTrainingHistory: "api/v1.0/DailyActivity/GetTrainingHistory",
  //Visit QR Code
  GetVisitHistory: "api/v1.0/DailyActivity/GetVisitHistory",
  VisitPainterByOtp: "api/v1.0/DailyActivity/VisitPainterByOtp",
  PushVisitValidationRequest: "api/v1.0/DailyActivity/PushVisitValidationRequest",
  GetMeetAttendance: "api/v1.0/DailyActivity/GetMeetAttendance",
  PushVisitStatus: "api/Suvidha/PushVisitStatus",
  GetVisitRequestList: "api/v1.0/DailyActivity/GetVisitRequestList",
  //Redeemption
  GetPointRedeemtion: "api/v1.0/Scheme/GetPointRedeemtion",
  GetSchemeList: "api/v1.0/Scheme/GetSchemeList",
  InsertSchemePointRedeem: "api/v1.0/Scheme/InsertSchemePointRedeem",
  //Private Site
  NewPrivateSiteList: "api/v1.0/XpLeads/NewPrivateSiteList",
  PrivteSiteNonXpLeadSubmit: "api/v1.0/XpLeads/PrivteSiteNonXpLeadSubmit",
  BrandList: "api/v1.0/XpLeads/BrandList",
  NonXpQuotSubmit: "api/v1.0/XpLeads/NonXpQuotSubmit",
  NonXpQuotGetList: "api/v1.0/XpLeads/NonXpQuotGetList",
  NonXpQuotDetailsById: "api/v1.0/XpLeads/NonXpQuotDetailsById",
  NonXPQuotApproval: "api/v1.0/XpLeads/NonXPQuotApproval",
  NonXPQuotPDF: "api/v1.0/XpLeads/NonXPQuotPDF",
  NonXPLeadStatusUpdate: "api/v1.0/XpLeads/NonXPLeadStatusUpdate",
  // Build Your Profile
  GetPainterExpertiseDetails: "api/v1.0/Profile/GetPainterExpertiseDetailsResponse",
  BuildYourProfileSave: "api/v1.0/Profile/BuildYourProfileSave",
  //PainterProtfolioWhatsappShare: "api/v1.0/Profile/PainterProtfolioWaShare",
  PainterProtfolioWhatsappShare: "api/v1.0/Profile/PainterProtfolioWaShareV1",
  // HOME PAGE BANNER
  GetHomePageBannerList: "api/v1.0/Application/GetHomePageBannerList",
  GetBusinessDetails: "api/v1.0/UserDashboard/GetBusinessDetails",
  // AcceptancePainterAdvancePayment: "api/v1.0/UserDashboard/AcceptancePainterAdvancePayment",
  AcceptancePainterAdvancePayment: "api/v1.0/UserDashboard/AcceptancePainterSchemeAdvance",
  //LeadsInfo
  GetXpLeadCategory: "api/v1.0/XpLeads/GetXpLeadCategory",
  GetXpLeadType: "api/v1.0/XpLeads/GetXpLeadType",
  GetXpLeadFilterType: "api/v1.0/XpLeads/GetXpLeadFilterType",
  GetLeadList: "api/v1.0/XpLeads/GetLeadList",
  MakeCall: "api/v1.0/XpLeads/MakeCall",
  InsertAppoinment: "api/v1.0/XpLeads/InsertAppoinment",
  GetLeadCallHistory: "api/v1.0/XpLeads/GetLeadCallHistory",
  GetLeadPaymentList: "api/v1.0/XpLeads/GetLeadPaymentList",
  NonXPQuotGetListXPA: "api/v1.0/XpLeads/NonXPQuotGetListXPA",
  GetExpertLeadRunningVisit: "api/v1.0/XpLeads/GetExpertLeadRunningVisit",
  LeadAppointmentFixedCheck: "api/v1.0/XpLeads/LeadAppointmentFixedCheckV1",
  GetVisitBlockStatus: "api/v1.0/XpLeads/GetVisitBlockStatus",
  ExpertContXPQuotGetList: "api/v1.0/XpLeads/ExpertContXPQuotGetList",
  LeadQuotationGetAreaByLOV: "api/v1.0/XpLeads/LeadQuotationGetAreaByLOV",
  GetExpertContQuotLeadType: "api/v1.0/XpLeads/GetExpertContQuotLeadType",
  LeadQuotationGetBrandList: "api/v1.0/XpLeads/LeadQuotationGetBrandList",
  ExpertContLeadQuotSubmit: "api/v1.0/XpLeads/ExpertContLeadQuotSubmit",
  ExpertContLeadQuotationGetDetails: "api/v1.0/XpLeads/ExpertContLeadQuotationGetDetails",
  NonXPQuotSubmitDetailsEXPERT: "api/v1.0/XpLeads/NonXPQuotSubmitDetailsEXPERTV3",
  NonEXPERTQuotGetDtls: "api/v1.0/XpLeads/NonEXPERTQuotGetDtlsV1",
  ExpertContXPQuotPDF: "api/v1.0/XpLeads/ExpertContXPQuotPDFVr1",
  NonXPQuotPDFXPA: "api/v1.0/XpLeads/NonXPQuotPDFXPA",
  ExpertContXpQuotPdfNormalQuot: "api/v1.0/XpLeads/ExpertContXpQuotPdfNormalQuot",
  ExpertInsertVisitOTP: "api/v1.0/XpLeads/ExpertInsertVisitOTP",
  ValidateVisitOTPExpertLead: "api/v1.0/XpLeads/ValidateVisitOTPExpertLead",
  ExpertLeadPositionReg: "api/v1.0/XpLeads/ExpertLeadPositionReg",
  InsertDealerVisitPurpose_InTime: "api/v1.0/XpLeads/InsertDealerVisitPurpose_InTime",
  InsertDealerVisitPurpose_OutTime: "api/v1.0/XpLeads/InsertDealerVisitPurpose_OutTime",
  LeadAppointmentFixedCheckGBSF: "api/v1.0/XpLeads/LeadAppointmentFixedCheckGBSF",
  InsertGBSFVisitPurpose_InTime: "api/v1.0/XpLeads/InsertGBSFVisitPurpose_InTime",
  GetDealerVisitActivity: "api/v1.0/XpLeads/GetDealerVisitActivity",
  NonXPQuotSubmitXPA: "api/v1.0/XpLeads/NonXPQuotSubmitXPA",
  GBSFLeadQuotGetList: "api/v1.0/XpLeads/GBSFLeadQuotGetList",
  NonXPQuotSubmitGBSF: "api/v1.0/XpLeads/NonXPQuotSubmitGBSF",
  NonGBSFQuotGetDtls: "api/v1.0/XpLeads/NonGBSFQuotGetDtls",
  NonXPQuotPDF_GBSF: "api/v1.0/XpLeads/NonXPQuotPDF_GBSF",
  GetAppointmentList: "api/v1.0/XpLeads/GetAppointmentList",
  GetVisitHistory_XPA: "api/v1.0/XpLeads/GetVisitHistory_XPA",
  GetVisitHistory_GBSF: "api/v1.0/XpLeads/GetVisitHistory_GBSF",
  InsertLeadPayment: "api/v1.0/XpLeads/InsertLeadPayment",
  SentJCCSms: "api/v1.0/XpLeads/SentJCCSms",
  //Scan Token
  ScanTokenRedemption: "api/v1.0/TokenRedemption/ScanTokenRedemptionV1",
  GetTokenRedemptionList: "api/v1.0/TokenRedemption/GetTokenRedemptionList",
  GetRedemptionPainterStatus: "api/v1.0/TokenRedemption/GetRedemptionPainterStatus",
  //Quotation
  LeadEstimateApprovedListGet: "api/v1.0/XpLeads/LeadEstimateApprovedListGet",
  GenerateQuotationPdf: "api/v1.0/XpLeads/GenerateQuotationPdf",
  GeneratePreEstimatePdf: "api/v1.0/XpLeads/GeneratePreEstimatePdf",
  LeadQuotationShare: "api/v1.0/XpLeads/LeadQuotationShare",
  QuotationPaymentUpdateStatus: "api/v1.0/XpLeads/QuotationPaymentUpdateStatus",
  // ESAMBANDH PRODUCT
  GetCategoryList: "esambandh/ms.product/api/1.0/ProductGuestAccess/GetCategoryList",
  SearchBrands: "esambandh/ms.product/api/1.0/ProductGuestAccess/SearchBrands",
  GetAllShades: "api/QuickOrderGuestAccess/GetAllShades",
  GetSortByLov: "esambandh/ms.product/api/1.0/ProductGuestAccess/GetSortByLov",
  GetCategoryDetails: "esambandh/ms.product/api/1.0/ProductGuestAccess/GetCategoryDetails",
  SearchProductCompareBrands: "esambandh/ms.product/api/1.0/ProductGuestAccess/SearchProductCompareBrands",
  GetBrandDetails: "esambandh/ms.product/api/1.0/ProductGuestAccess/GetBrandDetails",
  GetShadeCardList: "esambandh/ms.product/api/1.0/ProductGuestAccess/GetShadeCardList",
  ShareBrandDetailsResponseDto: "/api/v1.0/Utility/ShareBrandDetailsResponseDto",
  // LeadsInfo Completed Leads
  GetCompletedLeadList: "api/v1.0/XpLeads/GetCompletedLeadList",
  // EvalToken List
  EvalTokenList: "api/v1.0/TokenRedemption/GetEvalTokenList",
  //Token Redemption
  ValueTokenRedmSmryGet: "api/v1.0/TokenRedemption/ValueTokenRedmSmryGet",
  ValueTokenTransactionSmry: "api/v1.0/TokenRedemption/ValueTokenTransactionSmry",
  ValueTokenRedmRequest: "api/v1.0/TokenRedemption/ValueTokenRedmRequest",
  ValueTokenTransactionDtls: "api/v1.0/TokenRedemption/ValueTokenTransactionDtls",
  // Tutorials
  GetTutorialList: "api/v1.0/Application/GetTutorialList",
  // MeetAttendance
  AddMeetAttendance: "api/v1.0/DailyActivity/AddMeetAttendance",
  // Help Desk
  HelpDesk: "api/v1.0/Application/HelpDesk",
  // ESAMBANDH LOGIN
  EsamLogingTokenEntry: "api/v1.0/Esambandh/LogingTokenEntry",
  //notification
  GetMessage: "api/v1.0/UserDashboard/GetMessage",
  GetAppVersion: "api/v1.0/Application/GetAppVersion",
  // XP TOOLS
  GetXPToolsList: "api/v1.0/Application/GetXpToolList",
  XpToolServcieRequestEntry: "api/v1.0/Application/XpToolServcieRequestEntry",
  XpToolSerialNoList: "api/v1.0/Application/GetXpToolSerialNoListByToolCode",
  GetServiceRequestTypeLov: "api/v1.0/Application/GetServiceRequestTypeLov",
  GetServiceRequestStatusLov: "api/v1.0/Application/GetServiceRequestStatusLov",
  GetXpToolActivity: "api/v1.0/Application/GetXpToolActivity",
  XpToolDemoRequestEntry: "api/v1.0/Application/XpToolDemoRequestEntry",
  // WHATSAPP STATUS
  GetWhatsappShareQrScanSummary: "api/v1.0/Profile/GetWhatsappShareQrScanSummary",
  GetWhatsAppStatusType: "api/v1.0/Profile/GetWhatsAppStatusType",
  GetWhatsappShareQrScanDetails: "api/v1.0/Profile/GetWhatsappShareQrScanDetails",
  //PROFILE REVIEW
  GetCsatReviewList: "api/v1.0/Profile/GetCsatReviewList",
  // Pending Leads
  GetPendingAcceptLead: "api/v1.0/UserDashboard/GetPendingAcceptLead",
  UpdateAcceptanceLeadDetails: "api/v1.0/UserDashboard/UpdateAcceptanceLeadDetails",
  //Registration Language Select
  RegistrationApplicableLanguage: "api/v1.0/Application/RegistrationApplicableLanguage",
  //State Select
  GetAllState: "api/v1.0/Application/GetAllState",
  //Feedback
  GetFeedbackLov: "api/v1.0/Profile/GetFeedbackLov",
  //News Feed
  GetNewsList: "api/v1.0/UserDashboard/GetNewsList",
  //News Feed Details
  GetNewsDetails: "api/v1.0/UserDashboard/GetNewsDetails",
  //Insta Reward Coco Store
  GetCocoStoreSchemeList: "api/v1.0/InstaCashbackPainter/GetSchemeList",
  InsertUpdateReferral: "api/v1.0/InstaCashbackPainter/InsertUpdateReferral",
  GetReferralList: "api/v1.0/InstaCashbackPainter/GetReferralList",
  GetReferralDetails: "api/v1.0/InstaCashbackPainter/GetReferralDetails",
  GetReferralPaymentDetails: "api/v1.0/InstaCashbackPainter/GetReferralPaymentDetails",
  InstaRewardsPainterSchemeList: "api/v1.0/InstaRewardsPainter/GetSchemeList",
  InstaGetReferralList: "api/v1.0/InstaRewardsPainter/GetReferralList",
  InsertRewardUpdateReferral: "api/v1.0/InstaRewardsPainter/InsertUpdateRefferal",
  InsertGetReferralDetails: "api/v1.0/InstaRewardsPainter/GetReferralDetails",
  //CKC Referral
  CheckReferralMobileNoExists: "api/v1.0/CKCReferral/CheckReferralMobileNoExists",
  CkcReferralList: "api/v1.0/CKCReferral/CkcReferralList",
  CKCReferralEntry: "api/v1.0/CKCReferral/CKCReferralEntry",
  GetCkcReferralDashboardDetails: "api/v1.0/CKCReferral/GetCkcReferralDashboardDetails",
  GetCkcReferralDetails: "api/v1.0/CKCReferral/GetCkcReferralDetails",
  GetRewardAndTermsCondition: "api/v1.0/Application/GetRewardAndTermsCondition",
  //Scratch Card
  PainterScratchcardGetPending: "api/v1.0/Scratchcard/PainterScratchcardGetPending",
  PainterScratchcardUpdateScratch: "api/v1.0/Scratchcard/PainterScratchcardUpdateScratch",
  GetPainterScratchcardGetConsumed: "api/v1.0/Scratchcard/GetPainterScratchcardGetConsumed",
  // Delete Account
  DeleteAccountFlagAPI: "/api/v1.0/Auth/IosSuvidhaAppDeleteLov",
  GetMoistureLevelType: "/api/v1.0/XpLeads/GetMoistureLevelType",
  LeadQuotationGetAreaList: "/api/v1.0/XpLeads/LeadQuotationGetAreaList",
  LeadQuotationAdditionalCategoryList: "/api/v1.0/XpLeads/LeadQuotationAdditionalCategoryList",
  LeadQuotationAdditionalItemList: "/api/v1.0/XpLeads/LeadQuotationAdditionalItemList",
  LeadQuotationAdditionalProductList: "/api/v1.0/XpLeads/LeadQuotationAdditionalProductList",
  //Email verify
  SendEmailOtp: "/api/v1.0/Profile/SendEmailOtp",
  ValidateEmailOtp: "/api/v1.0/Profile/ValidateEmailOtp",
  //Sellout DBT Details
  GetPainterWiseCashRewardDetails: "/api/v1.0/UserDashboard/GetPainterWiseCashRewardDetails",
  PainterQuestionDetails: "/api/v1.0/Profile/PainterQuestionDetails",
  PainterQuestionInsert: "/api/v1.0/Profile/PainterQuestionInsert",
  PainterSplashScreenDetails: "/api/v1.0/Profile/PainterSplashScreenDetails",
};

export const ENDPOINTS = {
  BASE_URL_DEV: "https://bpilmobileuat.bergerindia.com/SUVIDHAAPINEW/", 
  BASE_URL_PROD: "https://bpilmobile.bergerindia.com/SUVIDHAAPINEW/",
  ...ALL_ENDPOINTS,
};

export const BASE_URL = ENDPOINTS.BASE_URL_DEV; // ---- UAT URL
// export const BASE_URL = ENDPOINTS.BASE_URL_PROD; // ---- Live URL

// SIGNALR
export const BASE_URL_SIGNLAR = "https://bpilweb.bergerindia.com/signalr/";
// ESAMBANDH BASE URL AND TOKEN
// export const ESAMBANDH_BASE_URL = "https://test-api-shop.bergerpaints.com/";
// export const ESAMBANDH_BASE_URL_UTILITY_ORDER = "https://test-esam-app-utility-order.azurewebsites.net/";
export const ESAMBANDH_BASE_URL = "https://api-shop.bergerpaints.com/";
export const ESAMBANDH_BASE_URL_UTILITY_ORDER = "https://prod-esam-app-utility-order.azurewebsites.net/";
// export const Order = 'esambandh/ms.order/';
// export const Product = 'esambandh/ms.product/';
// export const apiPrefix = 'api/1.0/ProductGuestAccess';
export const ESAMBANDH_AUTH_TOKEN = "CA5E2C72F6487A9D90F4B0E69D8A0FAB382E7B0F0A4E3D9C";