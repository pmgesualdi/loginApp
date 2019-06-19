import { Toast } from 'native-base';

export const toaster = {
  showToast: (message, type = 'success', duration = 2500) => {
    Toast.show({
      text: message,
      textStyle: { textAlign: 'center' },
      buttonText: 'Okay',
      position: 'bottom',
      duration: duration,
      type: type
    });
  },
};
