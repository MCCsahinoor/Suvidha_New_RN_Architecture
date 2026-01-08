/* eslint-disable prettier/prettier */

import React, { useRef, useState, memo, useEffect, Fragment } from 'react';
import { View, Text, StyleSheet, Animated, Pressable, Image, ImageBackground, ScrollView, RefreshControl } from 'react-native';
import styles from './styles';
import { AppImages, Colors, Fonts } from '../../../themes';
import InputFields from '../../inputField';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Card from '../../Card';
import { useSelector } from 'react-redux';
import { formatDate } from '../../../utils/formatDate';
import { filename } from '../../../utils/uriToFileName';
import NoDataFound from '../../NoDataFound';
import { useTranslation } from 'react-i18next';
import BankIcon from '../../../assets/svg/bank';
import PinIcon from '../../../assets/svg/pin';
import UserOneIcon from '../../../assets/svg/userOne';

const KycInfo = () => {

  const userProfileData = useSelector((state: any) => state.userProfileData);
  const [userKycDetails, setKYCdetails] = useState<any>([]);
  const [formatedDOBDate, setFormatedDOBDate] = useState('');

  useEffect(() => {
    if (userProfileData && userProfileData.length > 0) {
      setKYCdetails(userProfileData[0].kyc_details);
      const userPlaceholder = formatDate(userProfileData[0] && userProfileData[0].kyc_details[0] && userProfileData[0].kyc_details[0].dob);
      setFormatedDOBDate(userPlaceholder);
    }
  }, [userProfileData]);

  const [error, setError] = useState(false);
  useEffect(() => {
    setError(false);
  }, []);

  const [errorPassbook, setErrorPassbook] = useState(false);
  useEffect(() => {
    setErrorPassbook(false);
  }, []);

  const { t } = useTranslation();

  return (
    <>
      <ScrollView style={{ backgroundColor: Colors.color_white }}>
        <View style={{ ...styles.container }}>
          {userKycDetails && userKycDetails.length > 0 && (
            <View style={{ ...styles.statusGroup }}>
              <View
                style={(userKycDetails[0].kyc_status == 'success' || userKycDetails[0].kyc_status == 'completed') ? styles.kycSuccessStatus : (userKycDetails[0].kyc_status == 'rejected' || userKycDetails[0].kyc_status == 'mismatch') ? styles.kycRejectStatus : (userKycDetails[0].kyc_status == 'pending' || userKycDetails[0].kyc_status == 'submitted') ? styles.kycPendingStatus : styles.kycPendingStatus}
              >
                {/* <Ionicons name={userKycDetails[0].kyc_status == 'success' ? 'checkmark-circle-outline' : userKycDetails[0].kyc_status == 'rejected' ? 'close-circle-outline' : userKycDetails[0].kyc_status == 'mismatch' ? 'warning-outline' : 'alert-outline'}
                  size={20}
                  style={{
                    marginRight: 5,
                    color: userKycDetails[0].kyc_status == 'success' ? Colors.color_dark_green : userKycDetails[0].kyc_status == 'rejected' ? Colors.color_dark_red : userKycDetails[0].kyc_status == 'mismatch' ? Colors.color_yellow : Colors.color_black,
                  }}
                /> */}
                <Text
                  style={{ fontFamily: Fonts.OpenSans500Medium, color: (userKycDetails[0].kyc_status == 'success' || userKycDetails[0].kyc_status == 'completed') ? Colors.color_dark_green : (userKycDetails[0].kyc_status == 'rejected' || userKycDetails[0].kyc_status == 'mismatch') ? Colors.color_light_gray : (userKycDetails[0].kyc_status == 'pending' || userKycDetails[0].kyc_status == 'submitted') ? Colors.color_dark_orange : Colors.color_black }}
                >
                  <Text style={{ fontWeight: 'bold', textTransform: 'uppercase', fontFamily: Fonts.OpenSans500Medium }}>{t("KYCStatus")}:</Text>{' '}
                  {userKycDetails[0].kyc_status.toUpperCase()}
                </Text>
              </View>
            </View>
          )}

          <View style={{ ...styles.sectionHeader }}>
            <View style={{ marginRight: 3 }}>
              <UserOneIcon width={25} height={25} />
            </View>
            <Text style={{ ...styles.sectionHeaderText }}>
              {t("BasicInformation")}
            </Text>
          </View>
          {userKycDetails && userKycDetails.length > 0 ? (
            <View style={{ marginTop: 10 }}>
              <InputFields
                showLabel={true}
                label={t("Depot")}
                showPlaceholder={true}
                placeholder={t("DepotPlaceholder")}
                onChange={(val: string) => { }}
                keyboardType={'default'}
                defaultValue={
                  userKycDetails[0] ? userKycDetails[0].depot_name : ''
                }
                editable={false}
              />
              <InputFields
                showLabel={true}
                label={t("Territory")}
                showPlaceholder={true}
                placeholder={t("TerritoryPlaceholder")}
                onChange={(val: string) => { }}
                keyboardType={'default'}
                defaultValue={userKycDetails[0] ? userKycDetails[0].terr_rep_name + ' - ' + userKycDetails[0].terr_code : ''}
                editable={false}
              />
              <InputFields
                showLabel={true}
                label={t("Dealer")}
                showPlaceholder={true}
                placeholder={t("DealerPlaceholder")}
                onChange={(val: string) => { }}
                keyboardType={'default'}
                defaultValue={userKycDetails[0] ? userKycDetails[0].dealer_name + ' - ' + userProfileData[0].dlr_code : ''}
                editable={false}
              />
              <InputFields
                showLabel={true}
                label={t("mobileNumber")}
                showPlaceholder={true}
                placeholder={t("EnterMobileNumber")}
                onChange={(val: string) => { }}
                keyboardType={'numeric'}
                defaultValue={userKycDetails[0].painter_mobile}
                editable={false}
              />
              <InputFields
                showLabel={true}
                label={t("EmailId")}
                showPlaceholder={true}
                placeholder={t("EmailId")}
                onChange={(val: string) => { }}
                keyboardType={'default'}
                defaultValue={userKycDetails[0].email}
                editable={false}
              />
              <InputFields
                showLabel={true}
                label={t("AlternateMobile")}
                showPlaceholder={true}
                placeholder={t("AlternateMobile")}
                onChange={(val: string) => { }}
                keyboardType={'numeric'}
                defaultValue={userKycDetails[0].alternate_mobile}
                editable={false}
              />
              <InputFields
                showLabel={true}
                label={t("DOB")}
                showPlaceholder={true}
                placeholder={t("DOB")}
                onChange={(val: string) => { }}
                keyboardType={'default'}
                defaultValue={formatedDOBDate}
                editable={false}
              />
            </View>
          ) : (
            <View style={{ marginTop: 20 }}>
              <NoDataFound content={t("PleaseUpdateKYC")}></NoDataFound>
            </View>
          )}

          <View style={{ ...styles.sectionHeader, marginTop: 30 }}>
            <View style={{ marginRight: 3 }}>
              <BankIcon width={25} height={25} />
            </View>
            <Text style={{ ...styles.sectionHeaderText }}>{t("BankDetails")}</Text>
          </View>
          {userKycDetails && userKycDetails.length > 0 ? (
            <View style={{ marginTop: 10 }}>
              <InputFields
                showLabel={true}
                label={t("IFSCCode")}
                showPlaceholder={true}
                placeholder={t("EnterIFSCCode")}
                onChange={(val: string) => { }}
                keyboardType={'default'}
                defaultValue={userKycDetails[0].ifsc_code}
                editable={false}
              />
              <InputFields
                showLabel={true}
                label={t("BankName")}
                showPlaceholder={true}
                placeholder={t("BankNamePlaceholder")}
                onChange={(val: string) => { }}
                keyboardType={'default'}
                defaultValue={userKycDetails[0].bank_name}
                editable={false}
              />
              <InputFields
                showLabel={true}
                label={t("BranchName")}
                showPlaceholder={true}
                placeholder={t("BranchName")}
                onChange={(val: string) => { }}
                keyboardType={'default'}
                defaultValue={userKycDetails[0].branch_name}
                editable={false}
              />
              <InputFields
                showLabel={true}
                label={t("AccountNumber")}
                showPlaceholder={true}
                placeholder={t("AccountNumber")}
                onChange={(val: string) => { }}
                keyboardType={'default'}
                defaultValue={userKycDetails[0].acc_no}
                editable={false}
              />
              {/* <InputFields
                showLabel={true}
                label={'Confirm Account Number'}
                showPlaceholder={true}
                placeholder={'Confirm Account Number'}
                onChange={(val: string) => {}}
                keyboardType={'default'}
                defaultValue={'372587896541235'}
                editable={false}
              /> */}
              <InputFields
                showLabel={true}
                label={t("AccountType")}
                showPlaceholder={true}
                placeholder={t("AccountType")}
                onChange={(val: string) => { }}
                keyboardType={'default'}
                defaultValue={userKycDetails[0].acc_type}
                editable={false}
              />
              <View>
                <Text style={{
                  fontSize: 12,
                  color: Colors.color_black, fontFamily: Fonts.OpenSans600SemiBold
                }}>
                  {t("CancelledChequeOrPassbookFrontPageImage")}
                </Text>
                <View style={{
                  ...styles.uploadDoc, padding: 5, paddingTop: 0
                }}>

                  {userKycDetails[0].acc_img ? (
                    <>
                      {errorPassbook ? (
                        <Image source={{ uri: AppImages.NoImagesAvailable }} style={{ ...styles.backgroundContainerCover }} resizeMode="contain" />
                      ) : (
                        <ImageBackground source={{ uri: userKycDetails[0].acc_img }} onError={() => setErrorPassbook(true)} resizeMode="cover" style={{ ...styles.backgroundContainerCover }} imageStyle={{ borderRadius: 8 }} />
                      )}
                      {/* <ImageBackground source={{ uri: userKycDetails[0].acc_img }} onError={() => setError(true)} resizeMode="cover" style={{ ...styles.backgroundContainerCover }} imageStyle={{ borderRadius: 8 }} /> */}
                    </>
                  ) : (
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 10,
                      }}>
                      <Image
                        source={require('../../../assets/images/noDocument.webp')}
                        style={{ height: 40, width: 40, resizeMode: 'contain' }}
                      />
                      <Text
                        style={{
                          width: '85%',
                          color: Colors.color_gray,
                          fontFamily: Fonts.OpenSans500Medium,
                          fontSize: 12,
                          marginLeft: 8,
                        }}>
                        {t("NoCancelledChequeOrPassbookFrontPageImage")}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          ) : (
            <View style={{ marginTop: 20 }}>
              <NoDataFound content={t("PleaseUpdateYourKYC")}></NoDataFound>
            </View>
          )}

          <View style={{ ...styles.sectionHeader, marginTop: 30 }}>
            <View style={{ marginRight: 3 }}>
              <PinIcon width={25} height={25} />
            </View>
            <Text style={{ ...styles.sectionHeaderText }}>{t("IDProofDetails")}</Text>
          </View>
          {userProfileData && userProfileData[0] && userProfileData[0].doc_details && (
            <View style={{ ...styles.chipsGroup }}>
              {userProfileData[0].doc_details.map((item: any, index: any) => (
                <Fragment key={index}>
                  {item.doc_unique_no && (
                    <View
                      style={{ ...styles.chips, flexDirection: 'row', backgroundColor: 'rgba(38, 192, 13, 0.25)', borderColor: '#rgba(38, 192, 13, 1)' }}>
                      <Text style={{ fontFamily: Fonts.OpenSans500Medium }}>{item.doc_desc}</Text>
                      <Ionicons
                        name="checkmark-circle-outline"
                        size={20}
                        style={{ marginLeft: 5 }}
                      />
                    </View>
                  )}
                </Fragment>
              ))}
            </View>
          )}
          <View style={{ marginVertical: 5 }}>
            {userProfileData && userProfileData[0] && userProfileData[0].doc_details && (
              <>
                {userProfileData[0].doc_details.map(
                  (item: any, index: any) => (
                    <View key={index} style={{ marginBottom: 10 }}>
                      {item.doc_unique_no && (
                        <Card style={{ padding: 5 }}>
                          <View style={{ ...styles.docContainer }}>
                            <View style={{ width: '30%' }}>
                              {error ? (
                                <Image source={{ uri: AppImages.NoImagesAvailable }} style={{ ...styles.docImage }} />
                              ) : (
                                <Image source={{ uri: item.doc_path }} onError={() => setError(true)} style={{ ...styles.docImage }} />
                              )}
                            </View>
                            <View style={{ ...styles.docInfoGroup }}>
                              <Text style={{ ...styles.docNumber }}>
                                {item.doc_desc}
                              </Text>
                              <Text style={{ ...styles.docUniqueNo }} numberOfLines={1}>
                                {item.doc_unique_no}
                              </Text>
                              {/* <Text style={{ ...styles.docURL }} numberOfLines={2}>
                                {filename(item.doc_path)}
                              </Text> */}
                              <Text style={{ ...styles.docURL }} numberOfLines={2}>
                                {item.doc_path ? filename(item.doc_path) : 'No file'}
                              </Text>

                            </View>
                          </View>
                        </Card>
                      )}
                    </View>
                  ),
                )}
              </>
            )}
          </View>
        </View>
      </ScrollView>
      <>
        {userKycDetails && userKycDetails.length > 0 && (
          <>
            {/* // KYC STATUS REJECTED // */}
            {userKycDetails[0].kyc_status == 'rejected' && (
              <View
                style={{ padding: 10, backgroundColor: userKycDetails[0].kyc_status == 'rejected' ? 'rgba(229, 8, 8, 0.10)' : 'white' }}>
                <Text style={{ ...styles.kycReject }}>
                  <Text style={{ fontWeight: 'bold' }}>{t("RejectionReason")}</Text>{' '}
                  {userKycDetails[0].rejection_reason ? userKycDetails[0].rejection_reason : '-'}
                </Text>
                <Text style={{ ...styles.kycReject }}>
                  <Text style={{ fontWeight: 'bold' }}>{t("RejectionRemarks")}</Text>{' '}
                  {userKycDetails[0].review_rejection_remarks ? userKycDetails[0].review_rejection_remarks : '-'}
                </Text>
              </View>
            )}
            {/* // KYC STATUS MISMATCH // */}
            {userKycDetails[0].kyc_status == 'mismatch' && (
              <View
                style={{ padding: 10, backgroundColor: userKycDetails[0].kyc_status == 'mismatch' ? 'rgba(189, 255, 0, 0.30)' : 'white' }}>
                <Text style={{ ...styles.kycMismatch }}>
                  <Text style={{ fontWeight: 'bold' }}>{t("Mismatchreason")}</Text>{' '}
                  {userKycDetails[0].mismatch_reason ? userKycDetails[0].mismatch_reason : '-'}
                </Text>
              </View>
            )}
          </>
        )}
      </>
    </>
  );
};

export default memo(KycInfo);
