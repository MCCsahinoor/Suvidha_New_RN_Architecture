import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import styles from './styles';
import InputFields from '../../inputField';
import ButtonLarge from '../../ButtonLarge';
import InputDateSelect from '../../InputDateSelect';
import { setbottomSheetHandler } from '../../../store/features/bottomSheetHandler/bottomSheetHandler';
import { useDispatch, useSelector } from 'react-redux';
import { InsertLeadPayment } from '../../../services/LeadsInfo/leadsInfo.service';
import BottomSheet from '../../BottomSheet';
import DatePickerModel from '../../DatePickerModel';
import { AmountRegex } from '../../../utils/regexList';
import { setsetAndGetDate } from '../../../store/features/DatePicker/setAndGetDate';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';
import { ddmmyyyConverter, getCurrentDate, getDateinUTCFormat } from '../../../utils/formatDate';
import { CommonToastModel } from '../../../utils/ToastMessageModel';

const ModeOnline = ({ props }: any) => {
  const [currentDate, setTodayDate] = useState(getCurrentDate());
  const [dateSelect, setDateSelect] = useState('');
  const dispatch = useDispatch();
  const selectedDate = useSelector(
    (state: any) => state.setAndGetDate,
  );
  const bottomSheetRefOnline = useRef(null);
  const customBottomSheetTitle = '';

  const [formData, setFormData] = useState<any>({
    paymntDate: '',
    ref_no: '',
    amount: '',
  });
  const [errors, setErrors] = useState<Partial<any>>({});
  const [clearTextBox, setClearTextBox] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState(false);
  const navigation = useNavigation<any>();

  const validateForm = () => {
    const newErrors: Partial<any> = {};
    if (formData.paymntDate === '') {
      newErrors.paymntDate = i18n.t('selectPaymentDate');
    }
    if (formData.ref_no === '') {
      newErrors.ref_no = i18n.t('enterReferenceNumber');
    }
    if (formData.amount === '') {
      newErrors.amount = i18n.t('enterPaymentAmount');
    } else if (Number(formData.amount) > 1000000) {
      newErrors.amount = i18n.t('enterPaymentAmountCannotBeGreaterThan10L');
    }
    if (!(/^\d*\.?\d{0,2}$/.test(formData.amount))) {
      newErrors.amount = i18n.t('enterValidPaymentAmount');
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
      lp_pay_mode: "Online",
      lp_payment_date: getDateinUTCFormat(formData.paymntDate, 'Do MMMM YYYY'),
      lp_cheq_no: '',
      lp_ifsc: '',
      lp_bank_name: '',
      lp_branch: '',
      lp_gstin: formData.ref_no.trim(),
      lp_amount: formData.amount.trim()
    };

    InsertLeadPayment(data).then((response: any) => {
      if (response && response.response_code == 1) {
        CommonToastModel('success', i18n.t('paymentIsDoneSuccessfully'), 5000);
        resetFields();
        setShowLoader(true);
        navigation.navigate('LeadsInfo');
        dispatch(setsetAndGetDate({}));
        setDateSelect('');
      }
    }).catch(err => {
      resetFields();
      CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
    })
  }

  const handleChange = (name: string, value: any) => {
    setClearTextBox(false);
    if (name === 'amount') {
      if (AmountRegex.test(value)) {
        setFormData({
          ...formData,
          [name]: value,
        }); // Update state if valid

        setErrors({
          ...errors,
          [name]: '',
        });
      } else {
        setErrors({
          ...errors,
          [name]: i18n.t('enterAmountIsInvalid'),
        });
      }
    }

    if (name === 'ref_no') {
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
          [name]: i18n.t('enterRefNo'),
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
    if (bottomSheetRefOnline.current) {
      (bottomSheetRefOnline.current as any).close();
      dispatch(setbottomSheetHandler({}));
      setErrors({})
    } else {
      console.error('bottomSheetRefOnline is null');
    }
  };

  const bottomSheetHandler = useSelector(
    (state: any) => state.bottomSheetHandler,
  );

  useEffect(() => {
    if (Object.keys(bottomSheetHandler).length !== 0) {
      if (bottomSheetHandler.modelAction == true) {
        if (
          bottomSheetHandler.modelName == 'DatePicker' &&
          bottomSheetRefOnline.current
        ) {
          (bottomSheetRefOnline.current as any).open();
        } else {
          (bottomSheetRefOnline.current as any).close();
        }
      }
    } else {
      if (bottomSheetRefOnline.current) {
        (bottomSheetRefOnline.current as any).close();
      }
    }
  }, [bottomSheetHandler]);

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
    <>
      <View>
        <Text style={{ ...styles.patmentModeHeader }}>
          {t("paymentMode")}: <Text style={{ color: '#979494' }}>{t("online")}</Text>{' '}
        </Text>

        <View style={{ marginTop: 20 }}>
          <InputDateSelect
            showLabel={true}
            onPress={() => openDatePicker()}
            label={t('paymentDate')}
            error={errors.paymntDate}
            isRequiredMark={true}
            //defaultValue={formData.paymntDate}
            value={formData.paymntDate}
            resetTextBox={clearTextBox}
          />
          <InputFields
            showLabel={true}
            label={t('paymentRefNo')}
            showPlaceholder={true}
            placeholder={t('enterRefNo')}
            onChange={(val: any) => handleChange('ref_no', val)}
            keyboardType={'default'}
            error={errors.ref_no}
            isRequiredMark={true}
            defaultValue={formData.ref_no}
            resetTextBox={clearTextBox}
          />
          <InputFields
            showLabel={true}
            label={t('paymentAmount')}
            showPlaceholder={true}
            placeholder={t('enterPaymentAmount')}
            onChange={(val: any) => handleChange('amount', val)}
            keyboardType={'numeric'}
            error={errors.amount}
            isRequiredMark={true}
            defaultValue={formData.amount}
            resetTextBox={clearTextBox}
          />
          <View style={{ marginTop: 20 }}>
            <ButtonLarge
              title={t('Submit')}
              onPress={() => finalSubmit()}
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
      </View>

      <BottomSheet
        scrollEnabled={true}
        ref={bottomSheetRefOnline}
        closeOnDragDown={true}
        onClose={() => closeSheet()}
        contentHeight={true}
        sheetTitle={customBottomSheetTitle}>
        <View>
          <DatePickerModel defaultDate={currentDate} maxDate={currentDate} />
        </View>
      </BottomSheet>
    </>
  );
};

export default ModeOnline;
