import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message';
import { Fonts } from '../themes';
import { StyleSheet } from 'react-native';

// THIS TOAST USE GLOBALY ALL COMPONENTS AND PAGES
export const ShowToastMessage = (type: any, description: any, duration?: number) => {
  showMessage({
    message: description,
    textStyle: styles.FlashMessage,
    onPress: () => {
      hideMessage();
    },
    type: type,
    duration: 2000,
  });
}

const styles = StyleSheet.create({
  FlashMessage: {
    fontFamily: Fonts.OpenSans500Medium,
    fontSize: 16, // Example font size
    color: '#000', // Example text color
  },
})