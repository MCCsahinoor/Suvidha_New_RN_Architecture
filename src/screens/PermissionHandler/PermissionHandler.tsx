import React, { useState, useEffect } from 'react';
import { View, PermissionsAndroid, StyleSheet, Linking } from 'react-native';
import ModalComponent from '../../components/Modal';
import { Text } from 'react-native';
import { Colors } from '../../themes';
import ButtonLarge from '../../components/ButtonLarge';
import { useDispatch, useSelector } from 'react-redux';
import { setPermission } from '../../store/features/appPermission/appPermissionSlice';
import { setApiCallLoader } from '../../store/features/apiCallLoader/apiCallLoader';

const PermissionHandler = ({ navigation }: any) => {
  const [showRefreshBtn, setShowRefreshBtn] = useState(false);
  const dispatch = useDispatch();

  const redirect =
    'Please Go into Settings -> Applications -> Suvidha App -> Permissions and Allow permissions to continue';

  const checkPermissions = async () => {
    await PermissionsAndroid.requestMultiple([
      'android.permission.ACCESS_FINE_LOCATION',
      'android.permission.CAMERA',
      'android.permission.READ_CONTACTS',
      'android.permission.READ_EXTERNAL_STORAGE',
      'android.permission.RECORD_AUDIO',
      'android.permission.WRITE_EXTERNAL_STORAGE',
      'android.permission.POST_NOTIFICATIONS',
      'android.permission.ACCESS_COARSE_LOCATION'
    ]).then(result => {

      if (
        result['android.permission.ACCESS_FINE_LOCATION'] &&
        result['android.permission.ACCESS_COARSE_LOCATION'] === 'granted' &&
        result['android.permission.CAMERA'] &&
        result['android.permission.READ_CONTACTS'] &&
        result['android.permission.READ_EXTERNAL_STORAGE'] &&
        result['android.permission.RECORD_AUDIO'] &&
        result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
      ) {
        dispatch(setApiCallLoader(true));
        dispatch(setPermission(true));
        navigation.navigate('Login');
      } else if (
        result['android.permission.ACCESS_FINE_LOCATION'] ||
        result['android.permission.ACCESS_COARSE_LOCATION'] ||
        result['android.permission.CAMERA'] ||
        result['android.permission.READ_CONTACTS'] ||
        result['android.permission.READ_EXTERNAL_STORAGE'] ||
        result['android.permission.RECORD_AUDIO'] ||
        result['android.permission.WRITE_EXTERNAL_STORAGE'] ===
        'never_ask_again'
      ) {
        dispatch(setApiCallLoader(true));
        dispatch(setPermission(false));
        navigation.navigate('Login');
      }
    });
  };

  const closeModal = () => {
    dispatch(setApiCallLoader(true));
    dispatch(setPermission(true));
    navigation.replace('Login');
  };

  const goToSettings = () => {
    Linking.openSettings();
    setShowRefreshBtn(true);
  };

  const permissionAccess = useSelector((state: any) => state.appPermission);

  useEffect(() => {
    checkPermissions();
  }, []);

  return (
    <View>
      {permissionAccess && (
        <ModalComponent>
          <View style={stylesIn.centeredView}>
            <View style={stylesIn.modalView}>
              <Text style={stylesIn.modalText}>{redirect}</Text>
              <View style={{ ...stylesIn.fixedButton }}>
                <View style={{ width: '48%', marginRight: 5 }}>
                  <ButtonLarge
                    title={'Close'}
                    onPress={closeModal}
                    fillBtn={false}
                    key={'Close'}
                    showIcon={false}
                    iconName=""
                    paddingVertical={7}
                    paddingHorizontal={5}
                    fontSize={15}
                    iconSize={19}
                  />
                </View>
                {!showRefreshBtn && (
                  <View style={{ width: '48%' }}>
                    <ButtonLarge
                      title={'App Settings'}
                      onPress={goToSettings}
                      fillBtn={true}
                      key={''}
                      showIcon={false}
                      iconName=""
                      paddingVertical={7}
                      paddingHorizontal={5}
                      fontSize={15}
                      iconSize={19}
                    />
                  </View>
                )}
                {showRefreshBtn && (
                  <View style={{ width: '48%', marginRight: 5 }}>
                    <ButtonLarge
                      title={'Refresh'}
                      onPress={checkPermissions}
                      fillBtn={true}
                      key={''}
                      showIcon={false}
                      iconName=""
                      paddingVertical={7}
                      paddingHorizontal={5}
                      fontSize={15}
                      iconSize={19}
                    />
                  </View>
                )}
              </View>
            </View>
          </View>
        </ModalComponent>
      )}
    </View>
  );
};

export default PermissionHandler;

const stylesIn = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    flexDirection: 'row',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  fixedButton: {
    backgroundColor: Colors.color_white,
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});
