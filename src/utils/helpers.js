import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const showErrorToast = (text1) => {
    Toast.show({
        type: "error",
        text1,
        position: "bottom",
        visibilityTime: 1000,
        swipeable: false
      });
}

export const showSuccessToast = (text1) => {
    Toast.show({
        type: "success",
        text1,
        position: "bottom",
        visibilityTime: 1000,
        swipeable: false
      });
}

export const showInfoToast = (text1) => {
    Toast.show({
        type: "info",
        text1,
        position: "bottom",
        visibilityTime: 1000,
        swipeable: false
      });
}

export const saveData = async (type, data) => {
    try {
        await AsyncStorage.setItem(type, JSON.stringify(data))
    }
    catch (err) {
        throw err
    }
}

export const getData = async (type) => {
    try{
        const stringData = await AsyncStorage.getItem(type)
        return stringData
    }
    catch (err) {
        throw err
    }
}

export const removeData = async (type) => {
    try {
        await AsyncStorage.removeItem(type);
    }
    catch (err) {
        throw err
    }
}
