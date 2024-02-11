import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from "../assets/Colors"
import Icon from "react-native-vector-icons/Ionicons"

const CommonHeader = ({ options, navigation }) => {
  const {title} = options

  return (
    <View style = {styles.headerContainer}>
      <TouchableOpacity  style = {styles.optionsContainer} onPress={() => navigation.goBack()}>
        <Icon name='return-up-back-sharp' color={Colors.White} size={22}/>
      </TouchableOpacity>
      <View style = {styles.logoContainer}>
        <Text style = {styles.logoText}>Chat</Text>
      </View>
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  headerContainer: {
      width: "100%",
      backgroundColor: Colors.HeaderColor,
      height: 70,
      flexDirection: 'row',
  },
  logoContainer:{
      paddingTop: 12,
      paddingLeft: 12
  },
  logoText: {
      color: Colors.White,
      fontSize: 20,
      fontWeight: "bold"        
  },
  optionsContainer: {
      paddingTop: 12,
      paddingLeft: 12,
  },
  iconButtonStyle: {
      marginLeft: 12
  }
})