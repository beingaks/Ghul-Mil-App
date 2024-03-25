import {View, Text, StyleSheet, FlatList} from 'react-native'
import GlobalStyles from '../../assets/GlobalStyles';
import React from 'react'
import ProfileTopView from './components/ProfileTopView';

const ProfileScreen = () => {

  return (
    <View  style = {GlobalStyles.ScreenContainer}>
        <FlatList 
          data = {[]}
          ListHeaderComponent = {ProfileTopView}
        />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  profileContainer: {
    backgroundColor: 'red'
  }
})