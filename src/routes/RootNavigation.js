import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/LoginSIgnup/Login';
import Signup from '../screens/LoginSIgnup/Signup';
import ChatScreen from '../screens/Chat/ChatScreen';
import NotificationScreen from '../screens/Notification/NotificationScreen';
import CommonHeader from '../components/CommonHeader';
import { populateUserInfo } from '../store/slices/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import DrawerNavigation from './DrawerNavigation';
import HomescreenHeader from '../components/HomescreenHeader';
import AddPost from '../screens/AddPost/AddPost';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  
  const dispatch = useDispatch();

  const userData = useSelector(state => state.authSlice)

  useEffect(() => {
    dispatch(populateUserInfo());
  }, [])
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={userData?.token ? 'DrawerNavigation' : 'Signup'}
        screenOptions={{
          header: props => <CommonHeader {...props} />,
        }}>
        {userData?.token ? (
          <>
            <Stack.Screen
              name = "DrawerNavigation"
              component = {DrawerNavigation}
              options={{header: () => null}}
            />
             <Stack.Screen
              name="AddPost"
              component={AddPost}
              options={{title: 'Add Post'}}
            />
            <Stack.Screen
              name="ChatScreen"
              component={ChatScreen}
              options={{title: 'Chat'}}
            />
            <Stack.Screen
              name="NotificationScreen"
              component={NotificationScreen}
              options={{title: 'Notification'}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation