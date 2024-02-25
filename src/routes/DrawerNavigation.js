import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import React from 'react'
import Home from '../screens/Home/Home'
import HomescreenHeader from '../components/HomescreenHeader'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import Colors from '../assets/Colors'

const DrawerNavigation = ({navigation}) => {
    
    const Drawer = createDrawerNavigator()

    const RenderDrawerList = ( props ) => {
      return (
        <DrawerContentScrollView style = {styles.drawerContainer}>
          <TouchableOpacity style = {styles.drawerButton} onPress={() => props?.navigation?.navigate('Home')}>
            <Text style = {styles.drawerButtonText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity  style = {styles.drawerButton}>
            <Text style = {styles.drawerButtonText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity  style = {styles.drawerButton}>
            <Text style = {styles.drawerButtonText}>Log Out</Text>
          </TouchableOpacity>
        </DrawerContentScrollView>
      )
    }

    return (
      <Drawer.Navigator
        initialRouteName = "Home"
        screenOptions = {{header: (props) => <HomescreenHeader {...props} />}}
        drawerContent = {props => <RenderDrawerList {...props}/>}
        >
          <Drawer.Screen
            name="Home"
            component={Home}
          />
      </Drawer.Navigator>
    );
}

export default DrawerNavigation

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: Colors.DrawerBg,
  },
  drawerButton: {
    width: "100%",
    height: 30,
    marginTop: 10,
    paddingLeft: 10,
  },
  drawerButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.Black
  }
})