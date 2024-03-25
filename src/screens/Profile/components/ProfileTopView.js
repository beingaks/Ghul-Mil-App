import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import Colors from '../../../assets/Colors'
import TypoGraphy from '../../../assets/TypoGraphy'
import { launchImageLibrary } from "react-native-image-picker"
import { addProfilePic, getUserInfo } from '../../../store/slices/AuthSlice'

const ProfileTopView = () => {

    const dispatch = useDispatch()

    const {
        email,
        profilePic,
        followers,
        following,
        name
        } = useSelector(state => state.authSlice)

        const onPressAddPhoto = async () => {
            const result = await launchImageLibrary({mediaType: 'photo'})
            if (!result.didCancel && !result.error) {
                if (result?.assets[0]) {
                    uploadImage(result?.assets[0])
                }
            }
            }

    const uploadImage = (profImage) => {
            const formData = new FormData()
            formData.append('image', {
            uri: profImage?.uri,
            name: profImage?.fileName,
            type: profImage?.type,
            });

            if (formData) {
                dispatch(addProfilePic(formData)).then(({meta}) => {
                    if(meta?.requestStatus === "fulfilled"){
                        dispatch(getUserInfo())
                    }
                   })
            }
        }

  return (
    <>
        <View style = {styles.profileInfoContainer}>
            <View style = {{ alignItems: 'center'}} >
                <TouchableOpacity  onPress = {onPressAddPhoto}>
                    <Image source = {{uri: profilePic}} style = {styles.profileImage}/>
                </TouchableOpacity>
                <Text>{name? name : "Add a name"}</Text>
                <Text style = {{fontWeight: TypoGraphy.fontWeight.FontWeight800, color: Colors.Black}}>{email}</Text>
            </View>
            <View style = {styles.profileDetailsContainer} >
                <TouchableOpacity style = {styles.profileDetailItem}>
                    <Text style = {styles.profileDetailItemDigit}>0</Text>
                    <Text style = {styles.profileDetailItemText}>Posts</Text>
                </TouchableOpacity>
                <TouchableOpacity  style = {styles.profileDetailItem}>
                    <Text style = {styles.profileDetailItemDigit}>{followers.length}</Text>
                    <Text style = {styles.profileDetailItemText}>Followers</Text>
                </TouchableOpacity>
                <TouchableOpacity  style = {styles.profileDetailItem} >
                    <Text style = {styles.profileDetailItemDigit}>{following.length}</Text>
                    <Text style = {styles.profileDetailItemText}>Following</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style = {[styles.profileInfoContainer, {backgroundColor: Colors.HeaderColor}]}>
            <TouchableOpacity style = {styles.editProfileButton}>
                <Text style = {[styles.profileDetailItemText, {color: Colors.White}]}>Edit Profile</Text>
            </TouchableOpacity>
        </View>
    </>
  )
}

export default ProfileTopView

const styles = StyleSheet.create({
    profileInfoContainer: {
        width: "96%",
        backgroundColor: Colors.White,
        alignSelf: 'center',
        marginTop: 15,
        borderRadius: 30,
        elevation: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    profileImage: {
        height: 100, 
        width: 100, 
        borderRadius: 100
    },
    profileDetailsContainer: {
        alignItems: 'center', 
        flexDirection: 'row', 
        justifyContent: "space-around", 
        flex: 1
    },
    profileDetailItem: {
        alignItems: 'center', 
        justifyContent: 'center'
    },
    profileDetailItemDigit: {
        fontSize: TypoGraphy.fontSize.Font24,
        fontWeight: TypoGraphy.fontWeight.FontWeight800,
        color: Colors.Black
    },
    profileDetailItemText: {
        fontSize: TypoGraphy.fontSize.Font16,
        fontWeight: TypoGraphy.fontWeight.FontWeight600,
    },
    editProfileButton: {
        backgroundColor: Colors.Green, 
        paddingHorizontal: 10, 
        paddingVertical: 10, 
        borderRadius: 20
    }

})