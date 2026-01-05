/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, TextInput, KeyboardTypeOptions, TouchableWithoutFeedback, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Fonts } from '../themes';
import { Colors } from '../themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { englishTextRegex } from '../utils/regexList';
import i18n from '../i18n';
import ModalComponent from '../components/Modal';
import { RadioButton } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

export interface I_Input {
    showLabel: boolean;
    label?: string;
    placeholder: string;
    onKeyPress?: Function;
    value?: any;
    error?: string;
    isRequiredMark?: boolean;
    defaultValue: any;
    resetTextBox?: boolean;
    isSearchIcon?: boolean;
    editable?: boolean;
    onEndEditing?: Function;
    width?: string;
    showPlaceholder?: boolean;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
    returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
    optionData: any;
    selectedValue: (value: any) => void;
    changeBackground?: string;
    fontSize?: string;
    fontColor?: string;
    changeHeight?: number;
    changeFontSize?: number;
    changeColor?: string;
    changeLabelSize?: number;
    onLayout?: (event: any) => void;
    reset?: boolean;
}



const SingelSelectdropdownWithLocalSearch = ({
    showLabel,
    label,
    placeholder,
    onKeyPress,
    value,
    error,
    isRequiredMark,
    defaultValue,
    resetTextBox,
    isSearchIcon,
    onEndEditing,
    editable,
    width,
    autoCapitalize,
    showPlaceholder,
    returnKeyType,
    optionData,
    selectedValue,
    changeBackground,
    changeHeight,
    changeFontSize,
    changeColor,
    changeLabelSize,
    onLayout,
    reset,


}: I_Input) => {
    const [inputError, setInputError] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [currentValue, setCurrentValue] = useState(value || '');
    const [openPermissionModal, setOpenPermissionModal] = useState(false);
    const [checked, setChecked] = useState<any>('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(optionData);
    const inputRef = useRef<TextInput>(null);
    const [inputWidth, setInputWidth] = useState();

    // const resetInputBox = () => {
    //     (inputRef as any).current.clear();
    //     setCurrentValue('');
    // };

    useEffect(() => {
        if (resetTextBox) {
            setCurrentValue('');
            setChecked('');
            setSearchQuery('');
        }
    }, [resetTextBox]);

    // const handleTextChange = (input: string) => {
    //     const englishText = input.replace(englishTextRegex, '');
    //     if (input !== englishText) {
    //         setInputError(i18n.t('OnlyEnglishAallowed'));
    //     } else {
    //         setInputError('');
    //     }
    //     setCurrentValue(englishText);
    // };

    // const focusInput = () => {
    //     inputRef.current?.focus();
    // };

    const openDropdown = () => {
        setOpenPermissionModal(true);
    }

    useEffect(() => {
        const filtered = optionData.filter((item: any) =>
            item.label.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredOptions(filtered);
    }, [searchQuery, optionData]);

    const closeModel = () => {
        setOpenPermissionModal(false);
        // setChecked("")
        setSearchQuery("")
        // setCurrentValue("")
    }

    const saveModelData = () => {
        if (checked === '') {
            return;
        }
        if (checked.label !== currentValue) {
            selectedValue(checked)
        } else {
            selectedValue(checked.label)
        }
        setOpenPermissionModal(false);
    }

    useEffect(() => { 

        if (defaultValue && typeof defaultValue === 'object') {
            setCurrentValue(defaultValue.label || '');
            setChecked(defaultValue);
        } else if (defaultValue) {
            const matchedOption = optionData.find((option: { value: any }) => option.value === defaultValue);
            if (matchedOption) {
                setCurrentValue(matchedOption.label || '');
                setChecked(matchedOption);
            }

        }
        else { 
            setCurrentValue('')
            setChecked('');
            setSearchQuery('');
        }
    }, [defaultValue, optionData]);

    const truncateText = (text: string): string => {
        if (!text) return '';
        if (inputWidth && inputWidth < 173) {
            const words = text.split(' ');
            if (inputWidth < 133 && inputWidth > 121) {
                return `${words.slice(0, 1).join(' ')}...`;
            } else if (words.length > 2) {
                return `${words.slice(0, 2).join(' ')}...`;
            }
        }
        return text;
    };
    // const truncateText = (text: string): string => {
    //     if (!text) return '';
    //     const words = text.split(' ');
    //     if (inputWidth && inputWidth > 121) {
    //         return `${words.slice(0, 1).join(' ')}...`;
    //     } else if (inputWidth && inputWidth <= 121) {
    //         return text;
    //     } else if (inputWidth && inputWidth > 354) {
    //         return text;
    //     }
    //     else if (words.length > 2) {
    //         return `${words.slice(0, 2).join(' ')}...`;
    //     }
    //     return text;
    // };



    const handleLayout = (event: any) => {
        const { width } = event.nativeEvent.layout;
        setInputWidth(width);
    };

    useEffect(() => {
        if (reset) {
            setCurrentValue('');
            setChecked('');
            setSearchQuery('');
        }
    }, [reset]);




    return (
        <View style={{ marginBottom: error || inputError ? 0 : 10 }}>
            <Pressable style={{ position: 'relative', }} onPress={openDropdown}>
                <View onLayout={handleLayout} style={[
                    styles.inputStyles,
                    {
                        borderColor: changeBackground ?? '#F2F2F2',
                        backgroundColor: changeBackground ?? '#F2F2F2',
                        paddingLeft: 10,
                        height: changeHeight ?? 42,
                        paddingTop: 8
                    },
                ]}>
                    <Text numberOfLines={1} style={{
                        fontSize: changeFontSize ?? 15,
                        color: changeColor ?? Colors.color_dark_gray,
                        textAlign: 'left',
                    }}>
                        {truncateText(currentValue)}
                    </Text>
                    <Ionicons name="chevron-down-outline" size={16} color={Colors.color_semi_dark_gray} style={styles.dropdownIcon} />
                </View>

                {showLabel && (
                    <Text
                        style={[
                            styles.floatingLabel,
                            { fontSize: changeLabelSize ?? 15 },
                            (isFocused || currentValue) && styles.floatingLabelFocused,
                        ]}
                    >
                        {label}
                        {isRequiredMark && <Text style={styles.astrik}> *</Text>}
                    </Text>

                )}
            </Pressable>
            {(error || inputError) && (
                <Text style={styles.error}>{error || inputError}</Text>
            )}

            {openPermissionModal === true && (
                <ModalComponent>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>{placeholder}</Text>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search..."
                                value={searchQuery}
                                onChangeText={(text) => setSearchQuery(text)}
                            />
                            <ScrollView style={styles.permissionList} persistentScrollbar={true}>
                                {filteredOptions.map((item: any) => (
                                    <Pressable
                                        key={item.value}
                                        style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}
                                        onPress={() => setChecked(item)}
                                    >
                                        <RadioButton
                                            color={Colors.ui_dark_bg}
                                            value={item.value}
                                            status={checked === item ? 'checked' : 'unchecked'}
                                            onPress={() => setChecked(item)}
                                        />
                                        <Text style={styles.radiobuttomData} numberOfLines={2}>
                                            {item.label}
                                        </Text>
                                    </Pressable>
                                ))}

                            </ScrollView>

                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <LinearGradient colors={['#3E797F00', '#3E797F', '#3E797F00']} useAngle={true} angle={90} start={{ x: 0.1, y: 0.9 }} end={{ x: 0.1, y: 0.9 }} locations={[0.1, 1, 1]} style={{ width: '50%', height: 1.5 }} />
                                <LinearGradient colors={['#3E797F00', '#3E797F', '#3E797F00']} useAngle={true} angle={-90} start={{ x: 0.1, y: 0.9 }} end={{ x: 0.1, y: 0.9 }} locations={[0.1, 1, 1]} style={{ width: '50%', height: 1.5 }} />
                            </View>
                            <View style={{ ...styles.fixedButton }}>
                                <TouchableOpacity><Text style={styles.submitButtonClose} onPress={closeModel}>CLOSE</Text></TouchableOpacity>
                                <LinearGradient colors={['#3E797F00', '#3E797F', '#3E797F00']} useAngle={true} angle={180} start={{ x: 0.1, y: 0.9 }} end={{ x: 0.1, y: 0.9 }} locations={[0.1, 1, 1]} style={{ width: 1, height: 50, marginTop: -5, transform: [{ rotate: '-180deg' }], }} />
                                <TouchableOpacity><Text style={styles.submitButton} onPress={saveModelData}>SAVE</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ModalComponent>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 0,
        fontSize: 14,
        height: 40,
    },
    fixedButton: {
        backgroundColor: Colors.color_white,
        padding: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-around',
        width: '100%',

    },
    permissionList: {
        width: '100%',
        marginTop: 0,
        maxHeight: '35%',
    },


    inputStyles: {
        width: '100%',
        // fontSize: 15,
        // color: Colors.color_dark_gray,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginTop: 10,
        fontFamily: Fonts.OpenSans600SemiBold,
    },

    floatingLabel: {
        position: 'absolute',
        left: 7,
        top: 20,
        fontSize: 15,
        color: Colors.color_gray,
        zIndex: 9999,
        fontFamily: Fonts.OpenSans600SemiBold,
    },
    floatingLabelFocused: {
        top: -6,
        fontSize: 12,
        color: Colors.color_black,
    },
    error: {
        color: '#dc3545',
        fontSize: 10,
        // fontStyle: 'italic',
        textAlign: 'right',
        fontFamily: Fonts.poppins400Regular,
        marginTop: 2,
    },
    astrik: {
        color: '#dc3545',
        fontSize: 11
    },
    searchIcon: {
        position: 'absolute',
        zIndex: 1,
        top: 9,
        left: 9,
    },
    dropdownIcon: {
        position: 'absolute',
        right: 10,
        top: 14
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
    },
    modalText: {
        marginTop: 5,
        color: Colors.ui_dark_bg,
        fontFamily: Fonts.poppins500Medium,
        marginBottom: 10,
        fontSize: 15,
    },
    submitButton: {
        color: Colors.ui_dark_bg,
        fontFamily: Fonts.OpenSans700Bold,
    },
    submitButtonClose: {
        color: Colors.ui_dark_bg,
        fontFamily: Fonts.OpenSans700Bold,
        // opacity: 0.7
    },
    radiobuttomData: {
        color: Colors.color_black,
        fontFamily: Fonts.poppins400Regular,
        marginBottom: -2.5
    }
});

export default React.memo(SingelSelectdropdownWithLocalSearch); 
