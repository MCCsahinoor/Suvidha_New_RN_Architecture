import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Switch, Pressable, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import { Colors } from '../../themes';
import HeaderCurve from '../../components/HeaderCurve';  
import ButtonLarge from '../../components/ButtonLarge';
import { numberRegex, phoneNumberRegex } from '../../utils/regexList';
import { PainterEnquiryEntry } from '../../services/Auth/auth.services';
import { I_GET_PAINTER_REGISTRATION_RESPONSE, I_SEND_FOR_PAINTER_REGISTRATION_RESPONSE } from '../../Interfaces/Auth.interface';
import CustomToastUI from '../../components/CustomToastUI';
import Toast from 'react-native-toast-message';
import SingelSelectdropdownWithLocalSearch from '../../components/SingelSelectdropdownWithLocalSearch';
import { GetAllState, RegistrationApplicableLanguage } from '../../services/Profile/Profile.services';
import { useTranslation } from 'react-i18next';
import AlertInfo from '../../components/alertInfo';
import { useSelector } from 'react-redux';
import { CommonToastModel } from '../../utils/ToastMessageModel';
import InputFields from '../../components/inputField';
const PainterRegistration = ({ navigation, noOtherOption, route }: any) => {
  const alphabetRegex = /^[A-Za-z\s]+$/;
  const [clearTextBox, setClearTextBox] = useState<boolean>(false);
  const [isEnabled, setIsEnabled] = useState(false);
  // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const { phoneNumber } = route.params;
  const [languageOptions, setLanguageOptions] = useState<{ label: string, value: string }[]>([]);
  const [stateOptions, setStateOptions] = useState<{ label: string, value: string }[]>([]);
  const [submitKycModel, setSubmitKycModel] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [formData, setFormData] = useState<I_SEND_FOR_PAINTER_REGISTRATION_RESPONSE>({
    first_name: '',
    last_name: '',
    city: '',
    pincode: '',
    state: '',
    contact_no: '',
    preferred_language_code: '',
    associate_with_berger_yn: 'Y',
  });
  const isAPICall = useSelector((state: any) => state.apiCallLoader);
  const [errors, setErrors] = useState<Partial<I_SEND_FOR_PAINTER_REGISTRATION_RESPONSE>>({});
  const { t } = useTranslation();
  // const LanguageType = [
  //   { label: 'English', value: 'en' },
  //   { label: 'Hindi', value: 'hi' },
  //   { label: 'Bengali', value: 'bn' },
  //   { label: 'Gujarati', value: 'gu' },
  //   { label: 'Kannada', value: 'kn' },
  //   { label: 'Malayalam', value: 'ml' },
  //   { label: 'Tamil', value: 'ta' },
  // ];

  const toggleSwitch = (value: boolean | ((prevState: boolean) => boolean)) => {
    if (value === true) {
      setIsEnabled(value);
      formData.associate_with_berger_yn = 'Y'
    } else {
      formData.associate_with_berger_yn = 'N'
      setIsEnabled(value);
    }
  }


  const validateForm = () => {
    const newErrors: Partial<I_SEND_FOR_PAINTER_REGISTRATION_RESPONSE> = {};

    // Basic validation for each field
    if (formData.first_name.trim() === '') {
      newErrors.first_name = 'First name is required';
    } else if (!alphabetRegex.test(formData.first_name.trim())) {
      newErrors.first_name = 'Only characters are allowed in First Name';
    }

    if (formData.last_name.trim() === '') {
      newErrors.last_name = 'Last name is required';
    } else if (!alphabetRegex.test(formData.last_name.trim())) {
      newErrors.last_name = 'Only characters are allowed in Last Name';
    }

    if (formData.city.trim() === '') {
      newErrors.city = 'City is required';
    } else if (!alphabetRegex.test(formData.city.trim())) {
      newErrors.city = 'Only characters are allowed in City';
    }

    // if (formData.state.trim() === '') {
    //   newErrors.state = 'State is required';
    // } else if (!alphabetRegex.test(formData.state.trim())) {
    //   newErrors.state = 'Only characters are allowed in State';
    // }

    if (formData.state.trim() === '') {
      newErrors.state = 'State is required';
    } else if (!stateOptions.some(option => option.value === formData.state)) {
      newErrors.state = 'Invalid state selected';
    }


    if (formData.pincode.trim() === '') {
      newErrors.pincode = 'Pincode is required';
    } else if (!numberRegex.test(formData.pincode.trim())) {
      newErrors.pincode = 'Invalid Pincode format';
    } else if (formData.pincode.length < 6) {
      newErrors.pincode = 'Invalid Pincode. PIN code should be 6 digit number';
    }

    if (formData.contact_no.trim() === '') {
      newErrors.contact_no = 'Contact number is required';
    } else if (formData.contact_no.trim().length !== 10) {
      newErrors.contact_no = 'Contact number must be 10 digits long';
    } else if (!phoneNumberRegex.test(formData.contact_no.trim())) {
      newErrors.contact_no = 'Invalid contact number format';
    }

    if (formData.preferred_language_code === '') {
      newErrors.preferred_language_code = 'Preferred Language is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const finalSubmit = () => {
    const isValid = validateForm();
    if (isValid) {
      const data = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        city: formData.city,
        pincode: formData.pincode,
        state: formData.state,
        contact_no: formData.contact_no,
        preferred_language_code: formData.preferred_language_code,
        associate_with_berger_yn: formData.associate_with_berger_yn
      }
      submitPainterRegistration(data)
      return true; // Indicate successful submission
    } else {

      return false; // Indicate submission failure
    }

  };

  const handleChange = (name: string, value: any) => {
    // Clear the error message for the current field
    setErrors({
      ...errors,
      [name]: '',
    });

    // Update the form data with the new value
    setFormData({
      ...formData,
      [name]: value,
    });

    // reset text box
    setClearTextBox(false);
  };

  const handleTextChange = (field: string, value: string) => {
    // Regular expression to allow only alphabets and spaces
    const cleanedValue = value.replace(/[^A-Za-z\s]/g, '');

    // Update the form data and remove the error for this field
    handleChange(field, cleanedValue);
  };



  const submitPainterRegistration = async (data: I_SEND_FOR_PAINTER_REGISTRATION_RESPONSE): Promise<void> => {
    PainterEnquiryEntry<I_SEND_FOR_PAINTER_REGISTRATION_RESPONSE, I_GET_PAINTER_REGISTRATION_RESPONSE>(data).then((response) => {
      console.log(response);
      if (response && response.response_code == 1) {
        setResponseMsg(response.response_message);
        setTimeout(() => {
          navigation.pop(1);
          navigation.replace('Login')
        }, 5000);
      }
      setSubmitKycModel(true);
      resetFields();
    }).catch((err) => {
      // resetFields();
      CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
    });
  };

  const resetFields = () => {
    // Reset form fields
    setFormData({
      first_name: '',
      last_name: '',
      city: '',
      pincode: '',
      state: '',
      contact_no: '',
      preferred_language_code: '',
      associate_with_berger_yn: '',
    });
    setClearTextBox(true);

    formData.associate_with_berger_yn = 'N'
    setIsEnabled(false);

    // Clear any existing errors
    setErrors({});
  }
  useEffect(() => {
    async function fetchLanguages() {
      try {
        const response = await RegistrationApplicableLanguage<any, { data: { lang_code: string; lang_desc: string }[] }>();

        // Filter out the label and only keep the valid language options
        const formattedLanguages = response.data
          .filter(language => language.lang_code !== 'string') // Replace 'string' with the actual value you want to exclude
          .map((language) => ({
            label: language.lang_desc,
            value: language.lang_code,
          }));

        setLanguageOptions(formattedLanguages);
        console.log(formattedLanguages);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    }

    fetchLanguages();
  }, []);



  useEffect(() => {
    async function fetchState() {
      try {
        const response = await GetAllState<any, { data: { state_name: string; state_code: string }[] }>();
        const formattedSate = response.data.map((state) => ({
          label: state.state_name,
          value: state.state_code,
        }));
        setStateOptions(formattedSate);
        //console.log(formattedSate);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    }

    fetchState();
  }, []);

  const skipNow = () => {
    setSubmitKycModel(false);
    navigation.pop(1);
    navigation.replace('Login');

  };




  return (
    <>
      <HeaderCurve topGaap={119} headerBackground={'#36686D'} headerBackgroundTwo={'#84A2A5'} pageBackground={'#fff'} />
      <View style={{ backgroundColor: 'white', paddingHorizontal: 15 }}>
        {phoneNumber && (
          <Text style={{ ...styles.textAlert }}>Mobile: {phoneNumber} is not register with us. Please fill the below form to register with us.</Text>
        )}
      </View>
      <ScrollView style={{ backgroundColor: 'white', paddingTop: Platform.OS === 'android' ? 0 : 10 }}>
        <View style={{ ...styles.container }}>
          <InputFields
            showLabel={true}
            label={'First Name'}
            showPlaceholder={true}
            placeholder={'Enter First Name'}
            onChange={(val: any) => handleChange('first_name', val)}
            keyboardType={'default'}
            error={errors.first_name}
            isRequiredMark={true}
            defaultValue={formData.first_name}
            resetTextBox={clearTextBox}
            returnKeyType={'done'}
          />

          <InputFields
            showLabel={true}
            label={'Last Name'}
            showPlaceholder={true}
            placeholder={'Enter Last Name'}
            onChange={(val: any) => handleChange('last_name', val)}
            keyboardType={'default'}
            error={errors.last_name}
            isRequiredMark={true}
            defaultValue={formData.last_name}
            resetTextBox={clearTextBox}
            returnKeyType={'done'}
          />
          <InputFields
            showLabel={true}
            label={'City'}
            showPlaceholder={true}
            placeholder={'Enter City'}
            onChange={(val: any) => handleChange('city', val)}
            keyboardType={'default'}
            error={errors.city}
            isRequiredMark={true}
            defaultValue={formData.city}
            resetTextBox={clearTextBox}
            returnKeyType={'done'}
          />
          <InputFields
            showLabel={true}
            label={'Pincode'}
            showPlaceholder={true}
            placeholder={'Enter pincode'}
            onChange={(val: any) => handleChange('pincode', val)}
            keyboardType={'number-pad'}
            error={errors.pincode}
            isRequiredMark={true}
            maxLength={6}
            defaultValue={formData.pincode}
            resetTextBox={clearTextBox}
            returnKeyType={'done'}
          />
          <SingelSelectdropdownWithLocalSearch
            optionData={stateOptions}
            showLabel={true}
            label={'State'}
            showPlaceholder={true}
            placeholder={'Select State'}
            selectedValue={(val: any) => handleChange('state', val.value)}
            error={errors.state}
            isRequiredMark={true}
            defaultValue={formData.state}
            resetTextBox={clearTextBox}
          />
          <InputFields
            showLabel={true}
            label={'Contact Number'}
            showPlaceholder={true}
            placeholder={'Enter contact number'}
            onChange={(val: any) => handleChange('contact_no', val)}
            keyboardType={'number-pad'}
            maxLength={10}
            error={errors.contact_no}
            isRequiredMark={true}
            defaultValue={formData.contact_no}
            resetTextBox={clearTextBox}
            returnKeyType={'done'}
          />
          <SingelSelectdropdownWithLocalSearch
            optionData={languageOptions}
            showLabel={true}
            label={'Preferred Language'}
            showPlaceholder={true}
            placeholder={'Select Preferred Language'}
            selectedValue={(val: any) => handleChange('preferred_language_code', val.value)}
            error={errors.preferred_language_code}
            isRequiredMark={true}
            defaultValue={formData.preferred_language_code}
            resetTextBox={clearTextBox}
          />
          <View style={{ marginTop: 17 }}>
            {/* <View style={{ ...styles.connectBerger }}>
              <Text style={{ ...styles.connectBergerLabel }}>
                Associate With Berger
              </Text>
              <Switch
                trackColor={{ false: Colors.color_gray, true: Colors.ui_dark_bg }}
                thumbColor={isEnabled ? Colors.color_soft_green : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{ marginTop: 4 }}
              />
            </View> */}
            {/* {errors.associate_with_berger_yn && <Text style={{...styles.error}}>{errors.associate_with_berger_yn}</Text>} */}
          </View>
        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: 15, backgroundColor: Colors.color_white }}>
        <ButtonLarge
          title={'Submit'}
          onPress={() => { finalSubmit() }}
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
      {submitKycModel && (
        <AlertInfo
          skipNow={() => { }}
          confirmAction={() => skipNow()}
          allowSkip={false}
          headerText={responseMsg}
          subHeaderText={''}
          confirmActionButtonText={t("Ok")}
          // skipButtonText={''}
          isAPICall={isAPICall}
        />
      )}
    </>
  );
};

export default PainterRegistration;
