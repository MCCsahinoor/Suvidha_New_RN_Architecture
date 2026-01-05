/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';
import menuReducer from '../features/menu/menuSlice';
import loginReducer from '../features/login/loginSlice';
import appPermissionReducer from '../features/appPermission/appPermissionSlice';
import apiCallLoader from '../features/apiCallLoader/apiCallLoader';
import bottomSheetHandler from '../features/bottomSheetHandler/bottomSheetHandler';
import errorStatusReducer from '../features/errorStatus/errorStatusSlice';
import datePickerSlice from '../features/DatePicker/datePicker';
import datePickerOnChangesReducer from '../features/DatePicker/datePicker';
import userProfile from '../features/userProfile/profileSlice';
import uploadHostedUrl from '../features/fileUpload/uploadImageUrlSlice';
import profileLanguageData from '../features/userProfile/userProfileLanguageSlice';
import uploadProgressStatus from '../features/fileUpload/uploadProgress';
import setAndGetDateSlice from '../features/DatePicker/setAndGetDate';
import setPainterKYCData from '../features/PainterKYC/PainterKYCData';
import dateRangeReducer from '../features/DatePicker/dateRangePicker';
import pullToRefreshReducer from '../features/menu/pullToRefresh';
import KycIdProofLov from '../features/PainterKYC/KycIdProofLov';
import dsignsDataReducer from '../features/Designs/DesignsData';
import preferredLanguage from '../features/languageSlice/preferredLanguageSlice';
import virtualUserData from '../features/userProfile/virtualUserData';
import quickLinks from '../features/menu/quickLinks';
import buildYourProfileStore from '../features/BuildYourProfile/buildYourProfileStore'
import userImgCardHandler from '../features/userImgCardHandler/userImgCardHandler';
import SurfectPaintingDtlsHandler from '../features/PrivateSiteHandler/surfectPaintingDtlsHandler';
import buildProfileExpertise from '../features/BuildYourProfile/buildProfileExpertise';
import banner from '../features/banner/bannerHandler'
import businessDetails from '../features/businessDetails/businessDetails';
import benefitNoticeShowOnLogin from '../features/businessDetails/benefitNoticeShowOnLogin';
import executiveLoginCheck from '../features/login/executiveLoginCheck';
import categories from '../features/eSambandhProducts/categoriesAll';
import categoriesDetails from '../features/eSambandhProducts/categoriesDetails';
import holdRunningVisit from '../features/Visit/HoldRunningVisit';
import scanTokenData from '../features/tokenData/scanTokenData';
import deviseDetails from '../features/devicesInfo/deviseDetails';
import suvidhaTutorials from '../features/Tutorials/tutorials';
import pageChange from '../features/menu/pageChange';
import LeadSearchData from '../features/LeadSearch/LeadSearchData';
import CompleteLeadSearchData from '../features/LeadSearch/CompleteLeadSearchData';
import appLanguageChange from '../features/appLanguage/appLanguageChange';
import NotificationData from '../features/userProfile/NotificationCount';
import appApplicableLanguage from '../features/appLanguage/appApplicableLanguage'
import loginUserDepotData from '../features/login/loginUserDepotData';
import PainterReviewData from '../features/userProfile/PainterReviewDetails';
import PendingLeads from '../features/PendingLeads/PendingLeadsStore'
import setPainterCKCData from '../features/PainterCKC/PainterCKCData';
import setCkcIdProofLov from '../features/PainterCKC/CkcIdProofLov';
import CkcReferralData from '../features/PainterCKC/CkcRferralCount';
import uploadProfileImage from '../features/BuildYourProfile/buildYourProfileImageStore';

const appReducer = combineReducers({
  menuData: menuReducer,
  loginData: loginReducer,
  appPermissionData: appPermissionReducer,
  apiCallLoader: apiCallLoader,
  bottomSheetHandler: bottomSheetHandler,
  errorStatus: errorStatusReducer,
  datePickerSlice: datePickerSlice,
  datePickerOnChangesSlice: datePickerOnChangesReducer,
  userProfileData: userProfile,
  uploadUrl: uploadHostedUrl,
  profileLanguage: profileLanguageData,
  uploadProgress: uploadProgressStatus,
  setAndGetDate: setAndGetDateSlice,
  setPainterKYCData: setPainterKYCData,
  dateRangeSlice: dateRangeReducer,
  pullToRefreshSlice: pullToRefreshReducer,
  idProofLovKYCData: KycIdProofLov,
  idProofLovCKCData: setCkcIdProofLov,
  designsData: dsignsDataReducer,
  preferredLanguageData: preferredLanguage,
  virtualUser: virtualUserData,
  quickLinksMenu: quickLinks,
  buildYourProfileData: buildYourProfileStore,
  userImgCardHandler: userImgCardHandler,
  surfectPaintingDtlsHandler: SurfectPaintingDtlsHandler,
  buildProfileExpertise: buildProfileExpertise,
  bannerData: banner,
  businessDetails: businessDetails,
  BenefitNoticeHandler: benefitNoticeShowOnLogin,
  executiveLoginCheck: executiveLoginCheck,
  productsCategories: categories,
  productCategoriesDetails: categoriesDetails,
  holdRunningVisit: holdRunningVisit,
  scanTokenData: scanTokenData,
  deviseDetails: deviseDetails,
  AllsuvidhaTutorials: suvidhaTutorials,
  pageChange: pageChange,
  LeadSearchData: LeadSearchData,
  CompleteLeadSearchData: CompleteLeadSearchData,
  appLanguageChange: appLanguageChange,
  NotificationCountData: NotificationData,
  CkcReferralCountData: CkcReferralData,
  appApplicableLanguage: appApplicableLanguage,
  loginUserDepotData: loginUserDepotData,
  PainterReviewCountData: PainterReviewData,
  PendingLeadsData: PendingLeads,
  setPainterCKCData: setPainterCKCData,
  uploadProfileImage: uploadProfileImage,

});


const rootReducer = (state: any, action: any) => {
  if (action.type === 'LOGOUT') {
    const whitelist = [
      'preferredLanguageData',
      'appLanguageChange',
      'appApplicableLanguage',
    ];

    const newState: any = {};
    Object.keys(state).forEach(key => {
      if (whitelist.includes(key)) {
        newState[key] = state[key];
      }
    });
    state = newState;
  }
  return appReducer(state, action);
};

export { rootReducer };
