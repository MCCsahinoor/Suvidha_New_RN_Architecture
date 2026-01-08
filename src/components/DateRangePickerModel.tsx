

import React, { memo, useCallback, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native'; 
import { useDispatch } from 'react-redux';
import { setDateRangeSlice } from '../store/features/DatePicker/dateRangePicker';
import { setbottomSheetHandler } from '../store/features/bottomSheetHandler/bottomSheetHandler';
import ButtonLarge from './ButtonLarge';
import { Colors, Fonts } from '../themes';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import { CommonToastModel } from '../utils/ToastMessageModel';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { getCurrentDate, getDateRangeFormat } from '../utils/formatDate';

const DateRangePickerModel = ({ model, onClose }: any) => { 
  const dispatch = useDispatch();
  
  const [range, setRange] = useState<{
    startDate: DateType;
    endDate: DateType;
  }>({ startDate: model['startDate'], endDate: model['endDate'] });


  const [date, setDate] = useState<any>(getCurrentDate());

  const onChange = useCallback(
    (params: any) => {
      console.log("params", params)
      setRange(params);
      dispatch(
        setDateRangeSlice(params))
    },
    []
  );



  const handleApply = () => {
    if ((range.startDate ?? '') != '' && (range.endDate ?? '') != '') {
      const dafaultDate = {
        startDate: new Date(model['startDate']).toISOString(),
        endDate: new Date(model['endDate']).toISOString(),
      }
      dispatch(
        setDateRangeSlice(JSON.parse(JSON.stringify(dafaultDate))),
      );
      onClose({
        startDate: getDateRangeFormat('YYYY-MM-DD', String(range.startDate)),
        endDate: getDateRangeFormat('YYYY-MM-DD', String(range.endDate)),
      })
      dispatch(setbottomSheetHandler({}));
    } else {
      CommonToastModel('error', i18n.t('selectStartEndDateProperly'), 2000)
    }


  };

  const handleCancel = () => {
    // Handle cancel logic here, e.g., resetting state
    // setStartDate(null);
    // setEndDate(null);
    // setSelectedDates({});
    console.log('cancel button clicked');

    if (model && model['startDate'] && (model['endDate'] ?? '') != '') {
      const dafaultDate = {
        startDate: new Date(model['startDate']).toISOString(),
        endDate: new Date(model['endDate']).toISOString(),
      }
      dispatch(
        setDateRangeSlice(JSON.parse(JSON.stringify(dafaultDate))),
      );
      onClose({
        startDate: model['startDate'],
        endDate: model['endDate'],
      })
      dispatch(setbottomSheetHandler({}));
    }



  };



  useEffect(() => {
    if (model && model['startDate']) {
      // console.log("model['startDate']", model)
      // setRange(createDateRange(formattedStartDate, formattedEndDate));
      let defaultDate: any = {
        startDate: new Date(model['startDate']).toISOString(),
        endDate: new Date(model['endDate']).toISOString()
      }
      setRange(JSON.parse(JSON.stringify(defaultDate)));
    }
  }, [model])

  const { t } = useTranslation();
  
  const pickerStyles = {
    day_label: styles.calendarTextStyle,
    selected: {
      backgroundColor: Colors.ui_dark_bg,
    },
    range_fill: {
      backgroundColor: Colors.ui_dark_bg + '50',
    },
    selected_label: styles.selectedTextStyle,
    range_start_label: styles.selectedTextStyle,
    range_end_label: styles.selectedTextStyle,
    button_prev: styles.headerButtonStyle,
    button_next: styles.headerButtonStyle,
    month_selector_label: styles.headerTextStyle,
    year_selector_label: styles.headerTextStyle,
    today: styles.todayContainerStyle,
    weekday_label: styles.weekDaysTextStyle,
    arrow_color: Colors.color_white,
  };

  return (
    <View style={{ flex: 1 }}> 
      <DateTimePicker
        mode="range"
        startDate={range.startDate}
        endDate={range.endDate}
        maxDate={date}
        timePicker={false}
        onChange={onChange}
        styles={pickerStyles}
      />
      <View
        style={{
          paddingHorizontal: 0,
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 15
        }}>
        <View style={{ width: '45%', marginRight: 5 }}>
          <ButtonLarge
            title={t("Cancel")}
            onPress={() => handleCancel()}
            fillBtn={false}
            key={'Cancel'}
            showIcon={false}
            iconName=""
            paddingVertical={4}
            paddingHorizontal={5}
            fontSize={14}
            iconSize={19}
          />
        </View>
        <View style={{ width: '45%' }}>
          <ButtonLarge
            title={t("Apply")}
            onPress={() => handleApply()}
            fillBtn={true}
            key={'Apply'}
            showIcon={false}
            iconName=""
            paddingVertical={4}
            paddingHorizontal={5}
            fontSize={14}
            iconSize={19}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerButtonStyle: {
    backgroundColor: Colors.ui_dark_bg,
    shadowColor: Colors.color_dark_gray,
    elevation: 8,
    borderRadius: 8,
    marginRight: 11,
    marginLeft: 10,
    fontFamily: Fonts.OpenSans600SemiBold,
    color: Colors.color_white,
    padding: 10,
  },
  headerTextStyle: {
    color: Colors.ui_dark_bg,
    fontSize: 18,
    fontFamily: Fonts.OpenSans600SemiBold
  },
  weekDaysTextStyle: {
    fontFamily: Fonts.OpenSans600SemiBold
  },
  selectedTextStyle: {
    borderRadius: 0,
    fontFamily: Fonts.OpenSans600SemiBold,
    color: Colors.color_white
  },
  calendarTextStyle: {
    fontFamily: Fonts.OpenSans600SemiBold
  },
  todayContainerStyle: {
    // borderRadius: 100,
    // width: 40,
    // marginLeft: 5
  },
  fixedButton: {
    backgroundColor: Colors.color_white,
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
});
export default memo(DateRangePickerModel);
