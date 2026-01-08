import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Pressable, SafeAreaView, Platform } from 'react-native';
import { AppImages, Colors, Fonts } from '../themes';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import StarRating from './RatingShow';
import InitialAvatar from './InitialAvatar';
import { useSelector } from 'react-redux';
import ScanToken from '../assets/svg/scanToken.svg'
import LottieView from 'lottie-react-native';
import { UserGroupArr } from '../utils/hierarchyLoginCheck';
import DynamicShimmerPlaceholder from '../utils/dynamicShimmerPlaceholder';
import BusinessScore from './BusinessScore';

const Header = ({ navigation }: any) => {

  const userProfileData = useSelector((state: any) => state.userProfileData);
  const { NotificationCount, status, error } = useSelector((state: any) => state.NotificationCountData);
  const virtualuserProfileData = useSelector((state: any) => state.virtualUser);
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [csat, setCsat] = useState(0);
  const [score, setScore] = useState(0);
  const executiveLoginCheck = useSelector((state: any) => state.executiveLoginCheck);
  const [getExecutiveLogin, setExecutiveLogin] = useState('');
  const [painterName, setPainterName] = useState('');
  const [number, setNumber] = useState();
  // useEffect(() => {
  //   if (userProfileData && userProfileData.length > 0) { 
  //     setName(userProfileData[0]['painter_name']);
  //     setProfileImage(userProfileData[0]['user_img']);
  //     setCsat(userProfileData[0]['csat_rating']);
  //   } 
  // }, [userProfileData])

  useEffect(() => {
    if (!UserGroupArr.includes(getExecutiveLogin.toLowerCase()) && userProfileData && userProfileData.length > 0) {
      setName(userProfileData[0]['painter_name']);
      setProfileImage(userProfileData[0]['user_img']);
      setCsat(userProfileData[0]['csat_rating']);
      setScore(userProfileData[0]['pd_painter_score']);
    }

    if (UserGroupArr.includes(getExecutiveLogin.toLowerCase()) && virtualuserProfileData && Object.keys(virtualuserProfileData).length > 0) {
      setName(virtualuserProfileData['login_user_first_name'] + ' ' + virtualuserProfileData['login_user_last_name']);
      setProfileImage('');
      setNumber(virtualuserProfileData['login_user_mobile_number']);
      setPainterName(virtualuserProfileData['virtual_user_first_name']);
    }
  }, [userProfileData]);


  useEffect(() => {
    if (executiveLoginCheck) {
      setExecutiveLogin(executiveLoginCheck['UserGroupCode']);
    }
  }, [executiveLoginCheck]);

  return (
    <>

      <View>
        <LinearGradient colors={['#36686D', '#84A2A5']} useAngle={true} angle={90} >
          {/* // FOR MENU // */} 
            <View style={{ ...styles.headerContainer, paddingTop: Platform.OS === 'android' ? 60 : 0, }}>
              <View style={{ width: '10%', ...styles.gridItem }}>
                <TouchableOpacity onPress={() => navigation && navigation.openDrawer()} style={{ marginTop: 0, padding: 5, paddingTop: 8 }}>
                  <FontAwesome name="bars" size={25} color={Colors.color_white} />
                </TouchableOpacity>
              </View>
              {/* // FOR USER PROFILE // */}
              {userProfileData ? (
                <Pressable style={{ width: !UserGroupArr.includes(getExecutiveLogin.toLowerCase()) ? '55%' : '60%', ...styles.gridItem, }}>
                  <View style={styles.headerContainerUser}>
                    <Pressable style={{ width: '25%', ...styles.gridItem, }} onPress={() => { navigation.navigate('myProfile') }}>
                      <InitialAvatar name={name} profilePic={profileImage} size={45} fontSize={17}></InitialAvatar>
                    </Pressable>
                    <View style={{ width: '75%', ...styles.gridItem, marginTop: -1 }}>
                      <Text style={{ ...styles.userName }} numberOfLines={1}>{name}</Text>
                      <Pressable style={{ width: '25%', ...styles.gridItem, marginTop: 3 }} onPress={() => { navigation.navigate('ProfileReview') }}>
                        {!UserGroupArr.includes(getExecutiveLogin.toLowerCase()) &&
                          <StarRating startSize={14} starRating={csat} stroke={'#fff'} fill={'#FFE606'} starLabel={true} />
                        }
                      </Pressable>

                      {UserGroupArr.includes(getExecutiveLogin.toLowerCase()) &&
                        <View style={{ ...styles.loginAsContainer }}>
                          <Text style={{ ...styles.loginAs }} numberOfLines={1}>Login as: <Text style={{ color: '#D3E4EA', fontFamily: Fonts.OpenSans500Medium }}>{painterName}</Text></Text>
                        </View>
                      }
                    </View>
                  </View>
                </Pressable>
              ) : (
                <View style={{ width: !UserGroupArr.includes(getExecutiveLogin.toLowerCase()) ? '45%' : '60%', ...styles.gridItem }}>
                  <View style={styles.headerContainerUser}>
                    <View style={{ width: '20%', ...styles.gridItem }}>
                      <DynamicShimmerPlaceholder borderRadius={100} height={44} width={'100%'} count={1} />
                    </View>
                    <View style={{ width: '75%', marginRight: 1, marginTop: 5, ...styles.gridItem }}>
                      <DynamicShimmerPlaceholder borderRadius={3} height={14} width={'100%'} count={1} />
                      <DynamicShimmerPlaceholder borderRadius={3} height={12} width={'80%'} count={1} />
                    </View>
                  </View>
                </View>
              )}
              <View style={{ width: '30%' }}>
                <View style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', flex: 1, gap: 5 }}>
                  <View>
                    <BusinessScore painterCcore={score} navigation={navigation} />
                  </View>
                  <Pressable onPress={() => Number(NotificationCount) > 0 ? navigation.navigate('notification') : null}>
                    {status === 'succeeded' && Number(NotificationCount) > 0 &&
                      <Text style={styles.notification} numberOfLines={1}> {Number(NotificationCount) > 9 ? '9+' : NotificationCount} </Text>
                    }
                    <FontAwesome name="bell" size={22} color={Colors.color_white} />
                  </Pressable>
                </View>
              </View>

            </View> 
        </LinearGradient>
      </View>
      {/* <View style={{ marginRight: 10 }}>
        <BusinessScore painterCcore={score} />
      </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 0,
    paddingBottom: 10,
    flexDirection: 'row',
    // flexWrap: 'wrap',
    justifyContent: 'flex-start',
    borderBottomColor: '#9EBABD',
    borderBottomWidth: 1,
  },
  headerContainerUser: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridItem: {
    margin: 0,
  },
  notification: {
    position: 'absolute',
    backgroundColor: Colors.color_yellow,
    zIndex: 9,
    right: 0,
    borderRadius: 100,
    marginTop: -10,
    color: '#5C2C91',
    fontSize: 10,
    fontFamily: Fonts.poppins500Medium,
    borderColor: Colors.color_white,
    borderWidth: 1,
    height: 20,
    width: 20,
    textAlign: 'center',
    paddingTop: 3,
  },
  userName: {
    color: Colors.color_white,
    fontSize: 17,
    fontFamily: Fonts.OpenSans600SemiBold,
    textTransform: 'capitalize',
  },
  loginAs: {
    color: Colors.color_white,
    fontSize: 13,
    fontFamily: Fonts.OpenSans700Bold,
  },
  loginAsContainer: {
    // marginTop: 2,
    // paddingTop: 5
  }
});

export default Header;
