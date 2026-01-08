import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import styles from './styles';
import InputFields from '../../inputField';
import ButtonLarge from '../../ButtonLarge';
import InputDateSelect from '../../InputDateSelect';
import { setbottomSheetHandler } from '../../../store/features/bottomSheetHandler/bottomSheetHandler';
import { useDispatch, useSelector } from 'react-redux';
import Bank from '../../../assets/svg/bank.svg';
import InputFieldWithValidate from '../../inputFieldWithValidate';
import { InsertLeadPayment } from '../../../services/LeadsInfo/leadsInfo.service';
import { GetValidateIFSC } from '../../../services/KYC/kyc.services';
import { setApiCallLoader } from '../../../store/features/apiCallLoader/apiCallLoader';
import BottomSheet from '../../BottomSheet';
import DatePickerModel from '../../DatePickerModel';
import { AmountRegex, IFSCRegex, numberRegex } from '../../../utils/regexList';
import { setsetAndGetDate } from '../../../store/features/DatePicker/setAndGetDate';
import { useNavigation } from '@react-navigation/native';
import i18n from '../../../i18n';
import { useTranslation } from 'react-i18next';
import { ddmmyyyConverter, getCurrentDate, getDateinUTCFormat, momentConvert } from '../../../utils/formatDate';
import { CommonToastModel } from '../../../utils/ToastMessageModel';

const ModeCheque = ({ props }: any) => {
  const isAPICall = useSelector((state: any) => state.apiCallLoader);
  const selectedDate = useSelector(
    (state: any) => state.setAndGetDate,
  );
  const bottomSheetHandler = useSelector(
    (state: any) => state.bottomSheetHandler,
  );
  const dispatch = useDispatch();
  const bottomSheetRefCheque = useRef(null);
  const customBottomSheetTitle = '';
  const [currentDate, setTodayDate] = useState(getCurrentDate());
  const [formData, setFormData] = useState<any>({
    paymntDate: '',
    chq_no: '',
    amount: '',
    branchName: '',
    bankName: '',
    ifsc: '',
  });
  const [dateSelect, setDateSelect] = useState('');
  const [errors, setErrors] = useState<Partial<any>>({});
  const [clearTextBox, setClearTextBox] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState(false);
  const navigation = useNavigation<any>();

  const validateForm = () => {
    const newErrors: Partial<any> = {};
    if (formData.paymntDate === '') {
      newErrors.paymntDate = i18n.t('selectPaymentDate');
    }
    if (!formData.chq_no || formData.chq_no.trim() === '') {
      newErrors.chq_no = i18n.t('enterChequeNo');
    } else if (!numberRegex.test(formData.chq_no)) {
      newErrors.chq_no = i18n.t('enterValidChequeNo');
    }
    if (!formData.amount || formData.amount.trim() === '') {
      newErrors.amount = i18n.t('enterPaymentAmount');
    } else if (Number(formData.amount) > 1000000) {
      newErrors.amount = i18n.t('enterPaymentAmountCannotBeGreaterThan10L');
    }
    if (!formData.branchName || formData.branchName.trim() === '') {
      newErrors.branchName = i18n.t('enterBranchName');
    }
    if (!formData.bankName || formData.bankName.trim() === '') {
      newErrors.bankName = i18n.t('enterBankName');
    }
    if (!formData.ifsc || formData.ifsc.trim() === '') {
      newErrors.ifsc = i18n.t('enterYourIFSC');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const finalSubmit = () => {
    const isValid = validateForm();
    if (isValid) {
      InsertPayment();
      return true;
    } else {
      console.log('Form contains errors');
      return false;
    }
  };

  const InsertPayment = () => {
    let data = {
      lp_lead_id: props.lead_id,
      lp_pay_mode: "Cheque",
      lp_payment_date: getDateinUTCFormat(formData.paymntDate, 'Do MMMM YYYY'),
      lp_cheq_no: formData.chq_no.trim(),
      lp_ifsc: formData.ifsc.trim(),
      lp_bank_name: formData.bankName.trim(),
      lp_branch: formData.branchName.trim(),
      lp_gstin: '',
      lp_amount: formData.amount.trim()
    };

    InsertLeadPayment(data).then((response: any) => {
      if (response && response.response_code == 1) {
        CommonToastModel('success', i18n.t('paymentIsDoneSuccessfully'), 5000);
        resetFields();
        navigation.navigate('LeadsInfo');
        dispatch(setsetAndGetDate({}));
        setShowLoader(true);
        setDateSelect('');
      }
    }).catch(err => {
      resetFields();
      CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
    })
  }

  const handleChange = (name: string, value: any) => {
    setErrors({
      ...errors,
      [name]: '',
    });

    setFormData({
      ...formData,
      [name]: value,
    });

    setClearTextBox(false);

    if (name === 'amount') {
      if (AmountRegex.test(value)) {
        setFormData({
          ...formData,
          [name]: value,
        }); // Update state if valid
      } else {
        setErrors({
          ...errors,
          [name]: i18n.t('enterAmountIsInvalid'),
        });
      }
    }

    if (name === 'chq_no') {
      if (value !== '') {
        setFormData({
          ...formData,
          [name]: value,
        });

        setErrors({
          ...errors,
          [name]: '',
        });
      } else {
        setErrors({
          ...errors,
          [name]: i18n.t('enterChequeNo'),
        });
      }
    }

    if (name === 'ifsc') {
      if (value !== '') {
        setFormData({
          ...formData,
          [name]: value,
        });

        setErrors({
          ...errors,
          [name]: '',
        });
      } else {
        setErrors({
          ...errors,
          [name]: i18n.t("EnterIFSCCode"),
        });
      }
    }

    if (name === 'bankName') {
      if (value !== '') {
        setFormData({
          ...formData,
          [name]: value,
        });

        setErrors({
          ...errors,
          [name]: '',
        });
      } else {
        setErrors({
          ...errors,
          [name]: i18n.t('BankNamePlaceholder'),
        });
      }
    }

    if (name === 'branchName') {
      if (value !== '') {
        setFormData({
          ...formData,
          [name]: value,
        });

        setErrors({
          ...errors,
          [name]: '',
        });
      } else {
        setErrors({
          ...errors,
          [name]: i18n.t('enterBranchName'),
        });
      }
    }
  };

  const resetFields = () => {
    const todayFormatted = ddmmyyyConverter(getCurrentDate(), 'Do MMMM YYYY').toString();
    setFormData({
      paymntDate: todayFormatted,
      ref_no: '',
      amount: '',
    });
    setClearTextBox(true);
    setErrors({});
    setDateSelect(todayFormatted);
    dispatch(setsetAndGetDate({}));
  };

  const openDatePicker = () => {
    dispatch(
      setbottomSheetHandler({ modelAction: true, modelName: 'DatePicker' }),
    );
  };

  // close modal sheet
  const closeSheet = (): void => {
    if (bottomSheetRefCheque.current) {
      (bottomSheetRefCheque.current as any).close();
      dispatch(setbottomSheetHandler({}));
      // setFormData({
      //   paymntDate: '',
      //   chq_no: '',
      //   amount: '',
      //   branchName: '',
      //   bankName: '',
      //   ifsc: '',
      // })
      setErrors({})
    } else {
      console.error('bottomSheetRefCheque is null');
    }
  };

  useEffect(() => {
    if (Object.keys(bottomSheetHandler).length !== 0) {
      if (bottomSheetHandler.modelAction == true) {
        if (
          bottomSheetHandler.modelName == 'DatePicker' &&
          bottomSheetRefCheque.current
        ) {
          (bottomSheetRefCheque.current as any).open();
        } else {
          (bottomSheetRefCheque.current as any).close();
        }
      }
    } else {
      if (bottomSheetRefCheque.current) {
        (bottomSheetRefCheque.current as any).close();
      }
    }
  }, [bottomSheetHandler]);

  const validateIfscCode = (val: string) => {
    let data = {
      ifsc: formData.ifsc,
    };

    if (formData.ifsc.length > 0) {
      console.log('bankName.....', data);
      dispatch(setApiCallLoader(true));
      GetValidateIFSC(data).then((response: any) => {
        setErrors({
          ...errors,
          ['bankName']: '',
          ['branchName']: '',
          ['ifsc']: '',
        });
        dispatch(setApiCallLoader(false));
        if (response) {
          setFormData((prevDate: any) => ({
            ...prevDate,
            ifsc: response.IFSC,
            bankName: response.BANK,
            branchName: response.BRANCH,
          }));
        } else {
          CommonToastModel('error', i18n.t('somethingWentWrong'), 5000);
        }
      }).catch((err: any) => {
        dispatch(setApiCallLoader(false));
        CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
      });
    } else {
      CommonToastModel('error', i18n.t('pleaseEnterYourIFSCCode'), 5000);
    }
  }
  useEffect(() => {
    if (selectedDate && selectedDate.getDateValue) {
      const convertedDate = ddmmyyyConverter(selectedDate.getDateValue, 'Do MMMM YYYY').toString();
      setDateSelect(convertedDate);
      setFormData((state: any) => ({ ...state, paymntDate: convertedDate }));
    } else {
      const todayFormatted = ddmmyyyConverter(getCurrentDate(), 'Do MMMM YYYY').toString();
      setDateSelect(todayFormatted);
      setFormData((state: any) => ({ ...state, paymntDate: todayFormatted }));
    }
  }, [selectedDate]);

  useEffect(() => {
    const todayFormatted = ddmmyyyConverter(currentDate, 'Do MMMM YYYY').toString();
    setFormData((state: any) => ({
      ...state,
      paymntDate: todayFormatted,
    }));
    setDateSelect(todayFormatted);
  }, []);

  const { t } = useTranslation();
  return (
    <View>
      <Text style={{ ...styles.patmentModeHeader }}>
        {t("paymentMode")}: <Text style={{ color: '#979494' }}>{t("cheque")}</Text>{' '}
      </Text>

      <View style={{ marginTop: 20 }}>
        <InputDateSelect
          showLabel={true}
          onPress={openDatePicker}
          label={t('paymentDate')}
          error={errors.paymntDate}
          isRequiredMark={true}
          //defaultValue={formData.paymntDate}
          value={formData.paymntDate}
          resetTextBox={clearTextBox}
        />
        <InputFields
          showLabel={true}
          label={t('chequeNo')}
          showPlaceholder={true}
          placeholder={t('enterChequeNo')}
          onChange={(val: any) => handleChange('chq_no', val)}
          keyboardType={'numeric'}
          error={errors.chq_no}
          isRequiredMark={true}
          defaultValue={formData.chq_no}
          resetTextBox={clearTextBox}
        />

        <View style={{ ...styles.sectionHeader }}>
          <Bank width={25} height={25} style={{ marginRight: 3 }} />
          <Text style={{ ...styles.sectionHeaderText }}>{t("BankDetails")}</Text>
        </View>

        <InputFieldWithValidate
          showLabel={true}
          label={t('ifsc')}
          showPlaceholder={true}
          placeholder={t('enterYourIFSC')}
          onChange={(val: any) => handleChange('ifsc', val)}
          keyboardType={'default'}
          error={errors.ifsc}
          isRequiredMark={true}
          maxLength={11}
          validate={validateIfscCode}
          isWhatsappVerified={false}
          disabled={isAPICall}
          isAPICall={isAPICall}
        />
        <InputFields
          showLabel={true}
          label={t('BankName')}
          showPlaceholder={true}
          placeholder={t('BankNamePlaceholder')}
          onChange={(val: any) => handleChange('bankName', val)}
          keyboardType={'default'}
          error={errors.bankName}
          isRequiredMark={true}
          defaultValue={formData.bankName}
          resetTextBox={clearTextBox}
        />
        <InputFields
          showLabel={true}
          label={t('BranchName')}
          showPlaceholder={true}
          placeholder={t('enterBranchName')}
          onChange={(val: any) => handleChange('branchName', val)}
          keyboardType={'default'}
          error={errors.branchName}
          isRequiredMark={true}
          defaultValue={formData.branchName}
          resetTextBox={clearTextBox}
        />
        <InputFields
          showLabel={true}
          label={t('paymentAmount')}
          showPlaceholder={true}
          placeholder={t('enterPaymentAmount')}
          onChange={(val: any) => handleChange('amount', val)}
          keyboardType={'default'}
          error={errors.amount}
          isRequiredMark={true}
          defaultValue={formData.amount}
          resetTextBox={clearTextBox}
        />
        <View style={{ paddingBottom: 50 }}>
          <ButtonLarge
            title={t('Submit')}
            onPress={finalSubmit}
            fillBtn={true}
            key={'Next'}
            showIcon={false}
            iconName=""
            paddingVertical={10}
            paddingHorizontal={10}
            fontSize={19}
            iconSize={19}
          />
        </View>
      </View>

      <BottomSheet
        scrollEnabled={true}
        ref={bottomSheetRefCheque}
        closeOnDragDown={true}
        onClose={() => closeSheet()}
        contentHeight={true}
        sheetTitle={customBottomSheetTitle}>
        <View>
          <DatePickerModel defaultDate={currentDate} maxDate={currentDate} />
        </View>
      </BottomSheet>
    </View>
  );
};

export default ModeCheque;
