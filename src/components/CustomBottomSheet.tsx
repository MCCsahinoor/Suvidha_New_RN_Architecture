import React, {memo, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  Modal,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; 
import CustomToastUI from './CustomToastUI';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context'; 
import { Colors, Fonts } from '../themes';

const ANDROID_VERSION = Platform.Version;

interface CustomBottomSheetProps {
  isVisible: boolean;
  sheetTitle?: string;
  onClose: () => void;
  children: React.ReactNode;
  viewMode?: boolean;
  hideCloseButton?: boolean;
}

const CustomBottomSheet: React.FC<CustomBottomSheetProps> = ({
  isVisible,
  sheetTitle,
  onClose,
  children,
  viewMode = false,
  hideCloseButton = false,
}) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const keyboardShowListener = Keyboard.addListener(showEvent, e => {
      const newHeight = e.endCoordinates.height;
      // Only update if there's a significant change to avoid unnecessary re-renders
      if (Math.abs(newHeight - keyboardHeight) > 10) {
        setKeyboardHeight(newHeight);
        setIsKeyboardVisible(true);
      }
    });

    const keyboardHideListener = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0);
      setIsKeyboardVisible(false);
    });

    return () => {
      keyboardShowListener?.remove();
      keyboardHideListener?.remove();
    };
  }, [isVisible, keyboardHeight]);

  useEffect(() => {
    if (!isVisible) {
      // Reset keyboard state when modal closes
      setKeyboardHeight(0);
      setIsKeyboardVisible(false);
    }
  }, [isVisible, keyboardHeight, isKeyboardVisible]);

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent={true}
      supportedOrientations={['portrait']}>
      <View style={[styles.modalOverlay, {opacity: isVisible ? 1 : 0}]}>
        {/* Backdrop area that closes modal when pressed - only covers the top area */}
        <Pressable style={styles.backdrop} onPress={onClose} />

        {/* Bottom sheet content */}
        <View
          style={[
            styles.modalContentContainer,
            {
              bottom:
                (Platform.OS === 'ios' && isKeyboardVisible) ||
                (Platform.OS === 'android' &&
                  typeof ANDROID_VERSION === 'number' &&
                  ANDROID_VERSION >= 35 &&
                  isKeyboardVisible)
                  ? keyboardHeight
                  : 0,
            },
          ]}>
          <SafeAreaProvider>
            <SafeAreaView
              edges={['bottom', 'left', 'right']}
              style={{backgroundColor: Colors.color_white}}>
               <View style={styles.sheetModal}>
                  <View style={styles.handle} />
                  <View
                    style={[
                      styles.contentContainer,
                      {
                        // Add dynamic padding when keyboard is visible
                        paddingBottom: isKeyboardVisible ? 20 : 0,
                      },
                    ]}>
                    {!viewMode && sheetTitle && (
                      <Text style={styles.title}>{sheetTitle}</Text>
                    )}
                    <View style={styles.childrenContainer}>{children}</View>
                  </View>
                </View>
                {/* Add CustomToastUI inside the modal to show toasts on top */}
                <CustomToastUI /> 

              {/* Close button inside SafeAreaView but outside LinearGradient */}
              {!hideCloseButton && (
                <Pressable style={styles.modalGroupBtn} onPress={onClose}>
                  <Text style={styles.modalCloseTx}>Close</Text>
                </Pressable>
              )}
            </SafeAreaView>
          </SafeAreaProvider>
        </View>
      </View>
      <CustomToastUI />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  backdrop: {
    flex: 1,
  },
  modalContentContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
    zIndex: 2,
  },
  modalContent: {
    backgroundColor: 'transparent',
    paddingBottom: 0,
    maxHeight: '100%',
  },
  sheetModal: {
    height: 'auto',
    minHeight: 160,
  },
  handle: {
    width: 36,
    height: 3,
    backgroundColor: Colors.color_gray + '90',
    borderRadius: 1.5,
    alignSelf: 'center',
    marginTop: 6,
    marginBottom: 6,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 12,
    paddingBottom: 0,
    paddingHorizontal: 14,
    position: 'relative',
    zIndex: 1,
    flex: 1,
  },
  childrenContainer: {
    flex: 1,
    // paddingBottom: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 22,
    paddingHorizontal: 4,
    marginVertical: 8,
    color: Colors.dark_text_color,
    fontFamily: Fonts.poppins500Medium,
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  modalGroupBtn: {
    backgroundColor: Colors.color_white,
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.color_light_red + '80',
    paddingVertical: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  modalCloseTx: {
    color: Colors.color_light_red,
    fontSize: 15,
    fontFamily: Fonts.poppins500Medium,
    letterSpacing: 0.2,
  },
});

export default memo(CustomBottomSheet);
