import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Pressable,
    ScrollView,
} from 'react-native';
import moment from 'moment';
import { Colors, Fonts } from '../themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonLarge from './ButtonLarge';

interface CustomMonthYearPickerProps {
    value: Date | null;
    onChange: (date: Date) => void;
    placeholder?: string;
    disabled?: boolean;
    requiredStar?: boolean;
    requiredDoubleStar?: boolean;
    label?: string;
    error?: string;
    minimumDate?: Date;
    maximumDate?: Date;
}

const MonthAndYearPicker: React.FC<CustomMonthYearPickerProps> = ({
    value,
    onChange,
    placeholder = 'Select Month & Year',
    disabled = false,
    requiredStar = false,
    requiredDoubleStar = false,
    label = 'Month & Year',
    error,
    minimumDate = new Date(2000, 0),
    maximumDate = new Date(2030, 11),
}) => { 
    const [showYearPicker, setShowYearPicker] = useState(false);
    const currentDate = moment();
    const [tempYear, setTempYear] = useState(
        value ? moment(value).year() : currentDate.year(),
    );
    const [tempMonth, setTempMonth] = useState(
        value ? moment(value).month() : currentDate.month(),
    );
    const hasInitialized = useRef(false);

    // Set default value if none provided (only once on mount)
    React.useEffect(() => {
        if (!hasInitialized.current && !value) {
            hasInitialized.current = true;
            const newDate = moment().startOf('month');
            onChange(newDate.toDate());
        }
    }, []);

 

    const handleCancel = () => { 
        setShowYearPicker(false);
    };

    const handleOk = () => {
        const newDate = moment().year(tempYear).month(tempMonth).startOf('month');
        onChange(newDate.toDate()); 
        setShowYearPicker(false);
    };

    const handlePrevYear = () => {
        if (tempYear > moment(minimumDate).year()) {
            setTempYear(tempYear - 1);
        }
    };

    const handleNextYear = () => {
        if (tempYear < moment(maximumDate).year()) {
            setTempYear(tempYear + 1);
        }
    };

    const handlePrevMonth = () => {
        const newMonth = tempMonth - 1;
        if (newMonth < 0) {
            if (tempYear > moment(minimumDate).year()) {
                setTempYear(tempYear - 1);
                setTempMonth(11);
            }
        } else {
            setTempMonth(newMonth);
        }
    };

    const handleNextMonth = () => {
        const newMonth = tempMonth + 1;
        if (newMonth > 11) {
            if (tempYear < moment(maximumDate).year()) {
                setTempYear(tempYear + 1);
                setTempMonth(0);
            }
        } else {
            setTempMonth(newMonth);
        }
    };

    const months = moment.monthsShort(); // ['Jan', 'Feb', ...]

    // Generate years array
    const years = [];
    const startYear = moment(minimumDate).year();
    const endYear = moment(maximumDate).year();
    for (let year = startYear; year <= endYear; year++) {
        years.push(year);
    }

    // 3x4 grid for months
    const monthRows = [];
    for (let i = 0; i < 12; i += 3) {
        monthRows.push(months.slice(i, i + 3));
    }

    // 3x4 grid for years
    const yearRows = [];
    for (let i = 0; i < years.length; i += 3) {
        yearRows.push(years.slice(i, i + 3));
    }

    return (
        <View style={styles.formGroup}>

            {/* Header with navigation */}
            <View style={styles.yearNavRow}>
                <TouchableOpacity
                    onPress={showYearPicker ? handlePrevMonth : handlePrevYear}
                    disabled={
                        showYearPicker
                            ? tempMonth === 0 && tempYear <= moment(minimumDate).year()
                            : tempYear <= moment(minimumDate).year()
                    }
                    style={[
                        styles.arrowCircle,
                        ((showYearPicker &&
                            tempMonth === 0 &&
                            tempYear <= moment(minimumDate).year()) ||
                            (!showYearPicker && tempYear <= moment(minimumDate).year())) &&
                        styles.arrowCircleDisabled,
                    ]}
                    activeOpacity={0.7}>
                    <Ionicons
                        name="chevron-back"
                        size={18}
                        color={
                            (showYearPicker &&
                                tempMonth === 0 &&
                                tempYear <= moment(minimumDate).year()) ||
                                (!showYearPicker && tempYear <= moment(minimumDate).year())
                                ? Colors.ui_dark_bg + '40'
                                : Colors.ui_dark_bg
                        }
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setShowYearPicker(!showYearPicker)}
                    style={styles.yearTextContainer}
                    activeOpacity={0.7}>
                    <Text style={styles.yearText}>
                        {showYearPicker ? months[tempMonth] : tempYear}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={showYearPicker ? handleNextMonth : handleNextYear}
                    disabled={
                        showYearPicker
                            ? tempMonth === 11 && tempYear >= moment(maximumDate).year()
                            : tempYear >= moment(maximumDate).year()
                    }
                    style={[
                        styles.arrowCircle,
                        ((showYearPicker &&
                            tempMonth === 11 &&
                            tempYear >= moment(maximumDate).year()) ||
                            (!showYearPicker && tempYear >= moment(maximumDate).year())) &&
                        styles.arrowCircleDisabled,
                    ]}
                    activeOpacity={0.7}>
                    <Ionicons
                        name="chevron-forward"
                        size={18}
                        color={
                            (showYearPicker &&
                                tempMonth === 11 &&
                                tempYear >= moment(maximumDate).year()) ||
                                (!showYearPicker && tempYear >= moment(maximumDate).year())
                                ? Colors.ui_dark_bg + '40'
                                : Colors.ui_dark_bg
                        }
                    />
                </TouchableOpacity>
            </View>

            {/* Content grid */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}>
                {!showYearPicker ? (
                    <View style={styles.monthGrid}>
                        {monthRows.map((row, rowIdx) => (
                            <View key={rowIdx} style={styles.monthRow}>
                                {row.map((month, idx) => {
                                    const monthIndex = rowIdx * 3 + idx;
                                    const isSelected = tempMonth === monthIndex;
                                    let isDisabled = false;
                                    if (
                                        (tempYear === moment(minimumDate).year() &&
                                            monthIndex < moment(minimumDate).month()) ||
                                        (tempYear === moment(maximumDate).year() &&
                                            monthIndex > moment(maximumDate).month())
                                    ) {
                                        isDisabled = true;
                                    }
                                    return (
                                        <TouchableOpacity
                                            key={month}
                                            style={[
                                                styles.monthBtn,
                                                isSelected && styles.selectedMonthBtn,
                                                isDisabled && styles.disabledMonthBtn,
                                            ]}
                                            onPress={() => !isDisabled && setTempMonth(monthIndex)}
                                            disabled={isDisabled}>
                                            <Text
                                                style={[
                                                    styles.monthLabel,
                                                    isSelected && styles.selectedMonthLabel,
                                                    isDisabled && styles.disabledMonthLabel,
                                                ]}>
                                                {month.toUpperCase()}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        ))}
                    </View>
                ) : (
                    <View style={styles.monthGrid}>
                        {yearRows.map((row, rowIdx) => (
                            <View key={rowIdx} style={styles.monthRow}>
                                {row.map(year => {
                                    const isSelected = tempYear === year;
                                    let isDisabled = false;
                                    if (
                                        (year === moment(minimumDate).year() &&
                                            tempMonth < moment(minimumDate).month()) ||
                                        (year === moment(maximumDate).year() &&
                                            tempMonth > moment(maximumDate).month())
                                    ) {
                                        isDisabled = true;
                                    }
                                    return (
                                        <TouchableOpacity
                                            key={year}
                                            style={[
                                                styles.monthBtn,
                                                isSelected && styles.selectedMonthBtn,
                                                isDisabled && styles.disabledMonthBtn,
                                            ]}
                                            onPress={() => !isDisabled && setTempYear(year)}
                                            disabled={isDisabled}>
                                            <Text
                                                style={[
                                                    styles.monthLabel,
                                                    isSelected && styles.selectedMonthLabel,
                                                    isDisabled && styles.disabledMonthLabel,
                                                ]}>
                                                {year}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>

            {/* Action buttons */}
            <View style={styles.actionRow}>
                <View style={styles.buttonWrapperLeft}> 
                    <ButtonLarge
                        title={"Cancel"}
                        onPress={handleCancel}
                        fillBtn={false}
                        key={'Next'}
                        showIcon={false}
                        iconName=""
                        paddingVertical={5}
                        paddingHorizontal={10}
                        fontSize={14}
                        iconSize={19}
                        isAPICall={false}
                        disabled={false}
                    />
                </View>
                <View style={styles.buttonWrapperRight}> 
                    <ButtonLarge
                        title={"OK"}
                        onPress={handleOk}
                        fillBtn={true}
                        key={'Next'}
                        showIcon={false}
                        iconName=""
                        paddingVertical={5}
                        paddingHorizontal={10}
                        fontSize={14}
                        iconSize={19}
                        isAPICall={false}
                        disabled={false}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    formGroup: {
        marginBottom: 8,
    },
    formInput: {
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 6,
        height: 43,
        shadowColor: 'rgba(0, 0, 0, 0.8)',
        elevation: 2,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        borderWidth: 1,
        borderColor: Colors.color_gray,
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: Colors.color_white,
    },
    formLabel: {
        flex: 0.4,
        fontFamily: Fonts.poppins500Medium,
        color: Colors.color_gray,
        fontSize: 11,
        paddingHorizontal: 6,
        paddingVertical: 3,
        margin: 0,
        padding: 0,
        maxWidth: '35%',
        textAlign: 'left',
        marginTop: 5,
        flexShrink: 1,
    },
    inputValue: {
        flex: 0.6,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 1,
    },
    inputText: {
        textAlign: 'right',
        flex: 1,
        marginRight: 5,
        maxWidth: '85%',
    },
    selectedTextStyle: {
        margin: 0,
        padding: 0,
        fontFamily: Fonts.poppins500Medium,
        color: Colors.color_black,
        fontSize: 12,
        lineHeight: 15,
        paddingVertical: 3,
    },
    placeholderStyle: {
        margin: 0,
        padding: 0,
        fontFamily: Fonts.poppins500Medium,
        color: Colors.color_gray,
        fontSize: 12,
        lineHeight: 15,
        paddingVertical: 3,
    },
    iconContainer: {
        position: 'relative',
        right: 0,
        width: 32,
        minHeight: '100%',
        backgroundColor: Colors.color_white,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderLeftWidth: 1,
        borderLeftColor: Colors.color_light_gray,
    },
    iconWrapper: {
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        backgroundColor: Colors.color_light_gray + '20',
    },
    requiredStar: {
        color: Colors.color_dark_red,
    },
    readOnlyInput: {
        backgroundColor: Colors.color_white,
        borderColor: Colors.color_light_gray + '80',
        opacity: 1,
        shadowOpacity: 0.1,
        elevation: 1,
    },
    readOnlyLabel: {
        color: Colors.color_gray + '99',
        fontFamily: Fonts.poppins400Regular,
    },
    readOnlyText: {
        color: Colors.color_gray + '99',
        fontFamily: Fonts.poppins400Regular,
    },
    readOnlyIconContainer: {
        backgroundColor: Colors.color_white,
        borderLeftColor: Colors.color_light_gray + '80',
        opacity: 0.7,
    },
    errorInput: {
        borderColor: Colors.color_dark_red,
    },
    errorMsgStyle: {
        fontSize: 9,
        color: Colors.color_dark_red,
        fontFamily: Fonts.poppins500Medium,
        marginTop: 3,
        marginLeft: 5,
    },
    yearNavRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'center',
        marginBottom: 18,
    },
    arrowCircle: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: '#F5F6FA',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 1,
    },
    yearText: {
        fontSize: 18,
        fontWeight: '600',
        marginHorizontal: 12,
        marginTop: 4,
        color: Colors.ui_dark_bg,
        fontFamily: Fonts.poppins500Medium,
    },
    scrollView: {
        maxHeight: 300, // Fixed height for the scrollable area
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    monthGrid: {
        width: '100%',
        marginBottom: 12,
    },
    monthRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    monthBtn: {
        flex: 1,
        marginHorizontal: 2,
        paddingVertical: 8,
        borderRadius: 14,
        alignItems: 'center',
        backgroundColor: '#F5F6FA',
    },
    selectedMonthBtn: {
        backgroundColor: Colors.ui_dark_bg,
    },
    disabledMonthBtn: {
        backgroundColor: Colors.ui_dark_bg + '10',
    },
    monthLabel: {
        fontSize: 15,
        color: Colors.ui_dark_bg,
        fontFamily: Fonts.poppins500Medium,
    },
    selectedMonthLabel: {
        color: '#fff',
        fontWeight: 'bold',
    },
    disabledMonthLabel: {
        color: Colors.ui_dark_bg + '40',
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 4,
    },
    buttonWrapperLeft: {
        flex: 1,
        marginRight: 8,
    },
    buttonWrapperRight: {
        flex: 1,
    },
    yearTextContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 8,
        backgroundColor: Colors.ui_dark_bg + '10',
    },
    arrowCircleDisabled: {
        backgroundColor: Colors.ui_dark_bg + '10',
    },
});

export default MonthAndYearPicker;
