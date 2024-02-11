import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/LoginSIgnup/Login';
import Signup from '../screens/LoginSIgnup/Signup';
import Home from '../screens/Home/Home';
import HomescreenHeader from '../components/HomescreenHeader';
import ChatScreen from '../screens/Chat/ChatScreen';
import NotificationScreen from '../screens/Notification/NotificationScreen';
import CommonHeader from '../components/CommonHeader';
import { populateUserInfo } from '../store/slices/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();


const RootNavigation = () => {
  
  const dispatch = useDispatch();

  const data = useSelector(state => state.AuthSlice)

  useEffect(() => {
    dispatch(populateUserInfo());
  })

  console.log("XXX token",data);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup" screenOptions={{
          header: (props) => <CommonHeader {...props} />
      }}>
        <Stack.Screen name="Home" component={Home} options={{
          header: props => <HomescreenHeader {...props}/>
        }}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}}/>
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{title: "Chat"}}/>
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{title: "Notification"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation