import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import Colors from "../assets/Colors"
import Icon from "react-native-vector-icons/Ionicons"

const HomescreenHeader = ({navigation}) => {

    onPressChatIcon = () => {
        navigation.navigate("ChatScreen")
    }

    onPressNotificationIcon = () => {
        navigation.navigate("NotificationScreen")
    }

    return(
        <View style = {styles.headerContainer}>
            <View style = {styles.logoContainer}>
                <Text style = {styles.logoText}>Ghul~Mil</Text>
            </View>
            <View style = {styles.optionsContainer}>
                <TouchableOpacity  style = {styles.iconButtonStyle} onPress={onPressNotificationIcon}>
                    <Icon name = "notifications" color="white" size = {22}/>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.iconButtonStyle} onPress={onPressChatIcon}>
                    <Icon name = "chatbox" color="white" size = {22}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HomescreenHeader

const styles = StyleSheet.create({
    headerContainer: {
        width: "100%",
        backgroundColor: Colors.HeaderColor,
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between', 
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
        paddingRight: 12,
        flexDirection: 'row',
        justifyContent: "space-around",
    },
    iconButtonStyle: {
        marginLeft: 12
    }
})