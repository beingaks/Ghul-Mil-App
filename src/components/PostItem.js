import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import Colors from '../assets/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from "react-native-vector-icons/AntDesign"
import Icon2 from "react-native-vector-icons/FontAwesome"

const PostItem = ({item}) => {

  return (
    <View style = {styles.postContainer} >
       <View style = {styles.postSubCon}>
            <View style = {styles.profileCon}>
                <View style = {{width: 30, height:30, borderRadius: 20, backgroundColor: 'black'}}></View>
                <Text style = {{marginLeft: 10, fontSize: 16, fontWeight: '500', color: Colors.Black}}>{item?.author?.email}</Text>
            </View>
            <Image source = {{uri: item?.image}} style = {styles.postImage} resizeMode='contain'/>
            <View style = {styles.captionTextCon}>
                <Text style = {styles.captionText}>{item?.caption}</Text>
            </View>
            <View style = {styles.interactionCon}>
                <TouchableOpacity style = {{marginRight: 10}}>
                    <Icon name = "like1" size = {22}/>
                </TouchableOpacity>
                <TouchableOpacity style = {{marginRight: 10}}>
                    <Icon2 name ='comment' size = {22}/>
                </TouchableOpacity>
            </View>
       </View>
    </View>
  )
}

export default PostItem

const styles = StyleSheet.create({
    postContainer: {
        width: "100%",
        minHeight: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    postSubCon: {
        backgroundColor: Colors.GreyLight,
        borderRadius: 20,
        padding: 10,
        elevation: 5,
        alignItems: 'center',
        width: "90%"
    },
    postImage: {
        width: 350,
        height: 450
    },
    captionTextCon: {
        width: "95%",
        marginVertical: 10,
    },
    captionText: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.Black
    },
    interactionCon: {
        width: "95%",
        color: "red",
        flexDirection: 'row',
    },
    profileCon: {
        width: "95%",
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    }
})