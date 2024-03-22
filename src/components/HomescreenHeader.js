import React, {useState} from "react"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import Colors from "../assets/Colors"
import Icon from "react-native-vector-icons/Ionicons"
import AddPostModal from "./AddPostModal"

const HomescreenHeader = ({navigation}) => {
    
    const [showAddPost, setShowAddPost] = useState(false)

    const onPressChatIcon = () => {
        navigation.navigate("ChatScreen")
    }

    const onPressNotificationIcon = () => {
        navigation.navigate("NotificationScreen")
    }

    const onPressAddIcon = () => {
        // navigation.navigate("AddPost")
        setShowAddPost(true)
    }
    
    const exitAddPost = () => {
        setShowAddPost(false)
    }

    return(
        <>
            <View style = {styles.headerContainer}>
                <TouchableOpacity style = {styles.logoContainer} onPress = {() => navigation?.openDrawer()}>
                    <Text style = {styles.logoText}>Ghul~Mil</Text>
                </TouchableOpacity>
                <View style = {styles.optionsContainer}>
                    <TouchableOpacity style = {styles.iconButtonStyle} onPress={onPressAddIcon}>
                        <Icon name = "add-circle" color="white" size = {22}/>
                    </TouchableOpacity>
                    <TouchableOpacity  style = {styles.iconButtonStyle} onPress={onPressNotificationIcon}>
                        <Icon name = "notifications" color="white" size = {22}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.iconButtonStyle} onPress={onPressChatIcon}>
                        <Icon name = "chatbox" color="white" size = {22}/>
                    </TouchableOpacity>
                </View>
            </View>
            <AddPostModal isVisible = {showAddPost} onBackDropPress = {exitAddPost}/>
        </>
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