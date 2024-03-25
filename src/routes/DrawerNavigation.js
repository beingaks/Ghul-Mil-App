import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import React from 'react'
import Home from '../screens/Home/Home'
import HomescreenHeader from '../components/HomescreenHeader'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import Colors from '../assets/Colors'
import { useDispatch, UseDispatch } from 'react-redux'
import { removeUserInfo } from '../store/slices/AuthSlice'
import ProfileScreen from '../screens/Profile/ProfileScreen'
import CommonHeader from '../components/CommonHeader'

const DrawerNavigation = ({navigation}) => {
    
    const Drawer = createDrawerNavigator()
    const dispatch = useDispatch()

    const logout = (navigate) => {
      dispatch(removeUserInfo()).then(({meta}) => {
        if(meta?.requestStatus === "fulfilled"){
          navigate("Login")
        }
      })
    }

    const RenderDrawerList = ( props ) => {
      return (
        <DrawerContentScrollView style = {styles.drawerContainer}>
          <TouchableOpacity style = {styles.drawerButton} onPress={() => props?.navigation?.navigate('Home')}>
            <Text style = {styles.drawerButtonText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity  style = {styles.drawerButton} onPress = {() => props?.navigation?.navigate('Profile')}>
            <Text style = {styles.drawerButtonText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity  style = {styles.drawerButton} onPress={() => logout(props.navigation.navigate)}>
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
          <Drawer.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              header: (props) => <CommonHeader {...props} options = {{title: "Profile"}}/>,
            }}
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
    borderBottomColor: Colors.White,
    borderBottomWidth: 1
  },
  drawerButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.White,
    
  }
})