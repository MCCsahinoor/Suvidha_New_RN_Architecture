import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Image, FlatList, Platform, KeyboardAvoidingView } from 'react-native';
import { Colors, Fonts } from '../themes';
import InitialAvatar from './InitialAvatar';
import NoDataFound from './NoDataFound';
import InputFields from './inputField';
import ButtonLarge from './ButtonLarge';
import { useTranslation } from 'react-i18next';
import DynamicShimmerPlaceholder from '../utils/dynamicShimmerPlaceholder';

const ContactSelecter = ({ allContacts, close, sendDataToParent }: any) => {
    const [getallContacts, setallContacts] = useState<any>([]);
    const [selectedContacts, setSelectedContacts] = useState('');
    const [loadedContactsList, setloadedContactsList] = useState<any[]>([]);
    const [showLoader, setShowLoader] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
    }, []);
    useEffect(() => {
        if (allContacts) {
            allContacts.map((item: any, index: any) => {
                item.index = index
            })
            setallContacts(allContacts);
            loadMore(allContacts)
        }
    }, [allContacts]);

    const handleSearch = (query: any) => {
        if (query) {
            const newData = allContacts.filter((item: any) =>
                item.name.toLowerCase().includes(query.toLowerCase())
            );
            setallContacts(newData);
        } else {
            setallContacts(allContacts);
        }
    };

    // const toggleSelection = useCallback((phoneNumber: any) => {
    //     let trimNumber = phoneNumber.replace(/\s+/g, "");
    //     setSelectedContacts((prevSelectedContacts: any) => {
    //         if (prevSelectedContacts.includes(trimNumber)) {
    //             return prevSelectedContacts.filter((contact: any) => contact !== trimNumber);
    //         } else {
    //             return [...prevSelectedContacts, trimNumber];
    //         }
    //     });
    // }, []);

    // const onSelectContent = useCallback(() => {
    //     if (selectedContacts.length > 0) {
    //         sendDataToParent(selectedContacts);
    //         setSelectedContacts([])
    //     }
    // }, [selectedContacts, sendDataToParent]);


    const { t } = useTranslation();

    const GetReachEnd = (ReachEnd: any) => {
        if (ReachEnd) {
            setShowLoader(true)
            loadMore(getallContacts)
        } else {
            setShowLoader(false)
        }
    }

    const loadMore = (conatacList: any) => {
        setShowLoader(true)
        let orginalArrLLength: any = conatacList ? conatacList.length : 0;
        let copyArrLength: any = loadedContactsList ? loadedContactsList.length : 0;
        if (orginalArrLLength < 21) {
            setShowLoader(false)
        }
        if (Number(orginalArrLLength) > Number(copyArrLength)) {
            const loadnext =
                Number(orginalArrLLength) - Number(copyArrLength) >= 21
                    ? 21
                    : Number(orginalArrLLength) - Number(copyArrLength);
            if (copyArrLength > 0) {
                for (var i = 1; i <= loadnext; i++) {
                    let index = copyArrLength - 1 + i;
                    loadedContactsList.push(conatacList[index]);
                }
                setloadedContactsList(loadedContactsList);
            } else {
                let firstLoadLength: any = 0;
                if (Number(orginalArrLLength) >= 21) {
                    firstLoadLength = 21;
                } else {
                    firstLoadLength = orginalArrLLength;
                }
                for (let i = copyArrLength; i < firstLoadLength; i++) {
                    loadedContactsList.push(conatacList[i]);
                }
                copyArrLength = loadedContactsList.length;
                setloadedContactsList(loadedContactsList);
            }
            setShowLoader(false)
        } else if (Number(orginalArrLLength) == Number(copyArrLength)) {
            setShowLoader(false)
        }
    }
    const toggleSelection = (number: string, index: number) => {
        setSelectedContacts(number)
    };

    const onSelectContent = (): void => {
        if (selectedContacts) {
            sendDataToParent(selectedContacts);
        }
    };

    return (
        <>
            <View style={{ marginTop: Platform.OS === 'android' ? 0 : 20 }}>
                <InputFields
                    isSearchIcon={true}
                    showLabel={false}
                    showPlaceholder={true}
                    placeholder={t("SearchContact")}
                    onChange={handleSearch}
                    keyboardType={'default'}
                />
            </View>

            {getallContacts && getallContacts.length > 0 ? (
                <FlatList
                    contentContainerStyle={{
                        flexGrow: 1
                    }}
                    data={getallContacts}
                    numColumns={1}
                    renderItem={({ item, index }: any) => (
                        <Pressable
                            key={index}
                            style={{ ...styles.userContactList, backgroundColor: selectedContacts.includes(item.phoneNumber) ? '#EAEAEA' : 'white' }}
                            onPress={() => toggleSelection(item.phoneNumber, index)}>
                            <InitialAvatar name={item.name ?? '-'} profilePic={''} size={45} fontSize={14} />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={styles.userContactListName}>{item.name ?? '-'}</Text>
                                <Text style={styles.userContactListNumber}>{item.phoneNumber}</Text>
                            </View>
                            {selectedContacts.includes(item.phoneNumber) && (
                                <Image style={styles.isCheck} source={require('../assets/images/checkmark-circle-01.png')} />
                            )}
                        </Pressable>
                    )}
                    keyExtractor={(item, index) => `${item.phoneNumber}-${index}`}
                    onEndReached={() => {
                        GetReachEnd(true);
                    }}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={() =>
                        showLoader ? (
                            <View style={{ width: "100%", paddingHorizontal: 10, marginTop: 5 }}>
                                <DynamicShimmerPlaceholder
                                    borderRadius={5}
                                    height={100}
                                    width={"100%"}
                                    count={5}
                                />
                            </View>
                        ) : null
                    }
                    refreshing={refreshing}
                    onRefresh={() => {
                        // onRefresh();
                    }}
                />
            ) : (
                <View style={{ marginTop: 20 }}>
                    <NoDataFound content={t('noContactFound')} />
                </View>
            )}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.buttonContainer}
            >
                <View style={{
                    flex: 1,
                    marginHorizontal: 8,
                }}>
                    <ButtonLarge
                        title={t("Cancel")}
                        onPress={() => close()}
                        fillBtn={false}
                        key={'Canel'}
                        showIcon={false}
                        iconName=""
                        paddingVertical={7}
                        paddingHorizontal={5}
                        fontSize={15}
                        iconSize={19}
                    /></View>
                <View style={{
                    flex: 1,
                    marginHorizontal: 8,
                }}>
                    <ButtonLarge
                        title={t("Submit")}
                        onPress={() => { onSelectContent(); }}
                        fillBtn={true}
                        key={'OK'}
                        showIcon={false}
                        iconName=""
                        paddingVertical={7}
                        paddingHorizontal={5}
                        fontSize={15}
                        iconSize={19}
                        disabled={!selectedContacts}
                    />

                </View>
            </KeyboardAvoidingView>
        </>
    );
};

const styles = StyleSheet.create({
    userContactList: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
        padding: 5,
        borderRadius: 8,
    },
    userContactListName: {
        fontFamily: Fonts.poppins500Medium,
        fontSize: 14,
        color: Colors.ui_dark_bg
    },
    userContactListNumber: {
        fontSize: 14,
        fontFamily: Fonts.OpenSans500Medium,
    },
    isCheck: {
        position: 'absolute',
        right: 15,
        top: 14,
        width: 24,
        height: 24,
    },
    fixedButton: {
        backgroundColor: Colors.color_white,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12,
        paddingBottom: Platform.OS === 'ios' ? 34 : 80,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
});

export default ContactSelecter;
