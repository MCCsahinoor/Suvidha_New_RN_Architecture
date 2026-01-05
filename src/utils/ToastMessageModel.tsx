import Toast from 'react-native-toast-message';

// THIS TOAST USE GLOBALY ONLY REACT NATIVE MODEL
export const CommonToastModel = (type: string, description: string, duration?: number, position?: string | any) => {
  Toast.show({
    type: type,
    text1: description,
    visibilityTime: duration ? duration : 7000,
    position: position ? position : 'bottom',
    bottomOffset: 15,
    props: {
      onClose: () => Toast.hide(),
    },
  });
};