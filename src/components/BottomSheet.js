/* eslint-disable no-dupe-keys */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Modal, Text, TouchableOpacity, Animated, PanResponder, Platform, Pressable, ScrollView, SafeAreaView, Image } from 'react-native';
import PropTypes from 'prop-types';
import { BlurView } from '@react-native-community/blur';
import * as utils from '../utils'; 
import { Colors, Fonts, AppImages } from '../themes';
import AddUser from '../assets/svg/User-add.svg';
import Toast from 'react-native-toast-message';
import CustomToastUI from '../components/CustomToastUI';


class BottomSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      animatedHeight: new Animated.Value(0),
      pan: new Animated.ValueXY(),
    };
    this.createPanResponder(props);
  }

  setModalVisible(visible, props) {
    const { height, minClosingHeight, openDuration, closeDuration, onClose, onOpen } = this.props;
    const { animatedHeight, pan } = this.state;
    if (visible) {
      this.setState({ modalVisible: visible });
      if (typeof onOpen === 'function') onOpen(props);
      Animated.timing(animatedHeight, {
        useNativeDriver: true,
        toValue: height,
        duration: openDuration,
      })?.start();
    } else {
      if (!this.state.modalVisible) return; // Don't close if already closed
      Animated.timing(animatedHeight, {
        useNativeDriver: true,
        toValue: minClosingHeight,
        duration: closeDuration,
      })?.start(() => {
        pan?.setValue({ x: 0, y: 0 });
        this.setState({
          modalVisible: visible,
          animatedHeight: new Animated.Value(0),
        });

        if (typeof onClose === 'function') onClose(props);
      });
    }
  }

  createPanResponder(props) {
    const { closeOnDragDown, height, closeSheet = () => { } } = props;
    const { pan } = this.state;
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => closeOnDragDown,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState?.dy > 0) {
          Animated.event([null, { dy: pan?.y }], { useNativeDriver: true })(e, gestureState);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (height / 4 - gestureState?.dy < 0) {
          closeSheet();
          if (this.props?.goBackKey !== '' && this.props?.navigation) {
            this.props?.navigation?.goBack();
          }
          this.setModalVisible(false);
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          })?.start();
        }
      },
    });
  }

  open(props) {
    this.setModalVisible(true, props);
  }

  close(props) {
    if (this.props?.goBackKey === 'uploadFile' || this.props?.goBackKey === 'daterangepicker' || this.props?.goBackKey === 'closeNotReq') {
      this.setModalVisible(false, props);
    } else {
      this.setModalVisible(false, props);
      if (this.props?.navigation) {
        this.props?.navigation?.goBack();
      }
    }
  }

  render() {
    const {
      dragFromTopOnly,
      closeOnPressMask,
      closeOnPressBack,
      children,
      closeOnDragDown,
      customStyles,
      keyboardAvoidingViewEnabled,
      scrollEnabled,
      closeSheet = () => { },
      calendar = false,
      isPlanPage = false,
      synopsis = false,
      source = '',
      screenName = '',
      sheetTitle = '',
      hasAddButton = false,
      iconName = '',
      text = '',
      openAddteamMemberModal,
      hasText = false,
    } = this.props;
    const { animatedHeight, pan, modalVisible } = this.state;
    const panStyle = { transform: pan.getTranslateTransform() };

    return (
      <>
        {
          modalVisible ? (
            <Modal isVisible={modalVisible} transparent supportedOrientations={['portrait', 'landscape', 'landscape-left', 'landscape-right']}
            // onRequestClose={() => {
            //   if (closeOnPressBack) {
            //     closeSheet()                //Disable For Hardware Back Button bottom sheet close 
            //     this.close()
            //   }
            // }}
            >
              <BlurView blurAmount={1} blurType="dark" style={styles.absoluteBlurView} />
              {/* <View style={styles.absolute} /> */}

              <KeyboardAvoidingView enabled={keyboardAvoidingViewEnabled} behavior="padding" style={[styles.wrapper, customStyles.wrapper]} >


                {(this.props?.goBackKey === 'uploadFile' || this.props?.goBackKey === 'daterangepicker' || this.props?.goBackKey === 'closeNotReq') ? (
                  <>
                    <TouchableOpacity style={styles.mask} activeOpacity={1} />
                    <View style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, height: null, bottom: Platform?.OS === 'ios' ? 35 : 0, backgroundColor: 'white' }}>
                      {sheetTitle && (
                        <Text style={{ ...styles.header }}>
                          {sheetTitle}
                        </Text>
                      )}
                      <ScrollView scrollEnabled={scrollEnabled} contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={{ ...styles.scrollViewChildStyle }}>
                          {children}
                        </View>
                      </ScrollView>
                    </View>
                  </>
                ) : (
                  <>
                    <TouchableOpacity style={styles.mask} activeOpacity={1}
                      onPress={() => {
                        if (closeOnPressMask) {
                          closeSheet();
                          this.close()
                        }
                      }}
                    />
                    {closeOnDragDown && (<SafeAreaView
                      {...(dragFromTopOnly && this.panResponder.panHandlers)}
                      style={calendar ? { ...styles.draggableContainer, position: 'absolute', top: 30 } : this.props?.goBackKey ? styles.draggableContainer : styles.draggableContainerWhite}
                    >
                      <TouchableOpacity
                        style={{ marginRight: isPlanPage ? 10 : 0 }}
                        onPress={() => {
                          if (closeOnPressMask) {
                            closeSheet();
                            this.close()
                          }
                        }}
                        hitSlop={{
                          top: 10,
                          right: 10,
                          bottom: 10,
                          left: 10,
                        }}
                      >
                        <Image
                          source={{ uri: AppImages.CancelBlack }}
                          style={calendar ? styles.closeIconWhite : this.props?.goBackKey ? styles.closeIcon : styles.closeIconWhite}
                          resizeMode="contain"
                        // tintColor="#ffffff"
                        />
                      </TouchableOpacity>
                    </SafeAreaView>)}


                    <View style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, height: null, bottom: Platform?.OS === 'ios' ? 35 : 0, backgroundColor: 'white' }}>
                      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                        {sheetTitle && (
                          <Text style={{ ...styles.header }}>
                            {sheetTitle}
                          </Text>
                        )}
                        {hasAddButton && openAddteamMemberModal && (
                          <Pressable
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'flex-end',
                              margin: 5,
                              marginTop: 15,
                            }}
                            onPress={() => openAddteamMemberModal()}>
                            <AddUser width={25} height={25} />
                            {hasText && (
                              <Text style={{ fontSize: 15, marginRight: 10, color: '#456568' }}>
                                {text}
                              </Text>
                            )}
                          </Pressable>
                        )}
                      </View>
                      <ScrollView scrollEnabled={scrollEnabled}>
                        <View style={styles.scrollViewChildStyle}>
                          {children}
                        </View>
                      </ScrollView>
                    </View>
                  </>
                )}

              </KeyboardAvoidingView>
              {/* <Toast /> */}
              <CustomToastUI />
            </Modal>
          )
            : null
        }
      </>
    );
  }
}

BottomSheet.propTypes = {
  animationType: PropTypes.oneOf(['none', 'slide', 'fade']),
  height: PropTypes.number,
  minClosingHeight: PropTypes.number,
  openDuration: PropTypes.number,
  closeDuration: PropTypes.number,
  closeOnDragDown: PropTypes.bool,
  closeOnPressMask: PropTypes.bool,
  dragFromTopOnly: PropTypes.bool,
  closeOnPressBack: PropTypes.bool,
  keyboardAvoidingViewEnabled: PropTypes.bool,
  customStyles: PropTypes.objectOf(PropTypes.object),
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  children: PropTypes.node,
  calendar: PropTypes.bool,
  sheetTitle: PropTypes.string,
  hasAddButton: PropTypes.bool,
  iconName: PropTypes.string,
  text: PropTypes.string,
  openAddteamMemberModal: PropTypes.func,
  hasText: PropTypes.bool,
};

BottomSheet.defaultProps = {
  animationType: 'none',
  height: 260,
  minClosingHeight: 0,
  openDuration: 300,
  closeDuration: 200,
  closeOnDragDown: false,
  dragFromTopOnly: false,
  closeOnPressMask: true,
  closeOnPressBack: true,
  keyboardAvoidingViewEnabled: Platform.OS === 'ios',
  customStyles: {},
  onClose: null,
  onOpen: null,
  children: <View />,
  calendar: false,
  sheetTitle: '',
  hasAddButton: false,
  iconName: '',
  text: '',
  openAddteamMemberModal: null,
  hasText: false
};

export default React.memo(BottomSheet);

const styles = StyleSheet.create({
  scrollViewStyle: {
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 1,
  },
  scrollViewChildStyle: {
    flex: 1,
    padding: 15,
    paddingTop: 8
  },
  wrapper: {
    flex: 1,
    backgroundColor: 'transparent',

  },
  mask: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    width: '100%',
    height: 0,
    overflow: 'hidden',
  },
  header: {
    fontSize: 16,
    fontFamily: Fonts.poppins500Medium,
    color: Colors.ui_dark_bg,
    textTransform: 'capitalize',
    paddingHorizontal: 15,
    marginTop: 15,
  },
  draggableContainer: {
    width: '100%',
    alignItems: 'flex-end',
    paddingRight: utils.Scale.moderateScale(10),
    backgroundColor: 'transparent'
  },
  draggableContainerWhite: {
    width: '100%',
    alignItems: 'flex-end',
    height: 50,
    paddingRight: utils.Scale.moderateScale(20),
    backgroundColor: 'transparent',
  },
  closeIcon: {
    marginBottom: 40,
    height: utils.Scale.moderateScale(22),
    width: utils.Scale.moderateScale(22),
    marginRight: utils.Scale.moderateScale(10),
  },
  closeIconWhite: {
    height: utils.Scale.moderateScale(22),
    width: utils.Scale.moderateScale(22),
    bottom: Platform.OS === 'ios' ? 25 : 0,
    right: Platform.OS === 'ios' ? 15 : 0
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  absoluteBlurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(134, 165, 168, 0.61)'
  },
});