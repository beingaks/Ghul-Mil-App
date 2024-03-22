import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Linking } from 'react-native'
import Colors from '../assets/Colors'
import ModalContainer from './ModalContainer'
import Icon from "react-native-vector-icons/MaterialIcons"
import TypoGraphy from '../assets/TypoGraphy'
import {check, PERMISSIONS, RESULTS, openSettings, request } from "react-native-permissions"
import { showErrorToast, showInfoToast } from '../utils/helpers'
import {launchImageLibrary} from "react-native-image-picker"
import { useSelector, useDispatch } from 'react-redux'
import { createNewPost } from '../store/slices/PostsSlice'

const AddPostModal = ({isVisible, onBackDropPress}) => {

  const [caption, setCaption] = useState('')
  const [postImage, setPostImage] = useState(null);
  const {id} = useSelector(state => state?.authSlice)
  const dispatch = useDispatch()

  useEffect(() => {
    setCaption('')
    setPostImage(null)
  }, [isVisible])

  const checkStoragePermission = () => {
    check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then((results) => {
        switch (results) {
            case RESULTS.UNAVAILABLE: 
                break
            case RESULTS.DENIED:
                makeRequest().then(res => {
                  console.log("XXXXXXXX",res);
                    if (res === RESULTS.GRANTED){
                        onPressAddPhoto()
                    }
                    else if (res === RESULTS.BLOCKED){
                        openPhoneSettings()
                    }
                })
                break
            case RESULTS.GRANTED:
                onPressAddPhoto()
                break
            case RESULTS.BLOCKED:
                openPhoneSettings();
                break;
        }
    }).catch((err) => {
        showErrorToast(err)
    })
  }

  const makeRequest = async () => {
    const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
  }

  const onPressAddPhoto = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'})
    if (!result.didCancel && !result.error) {
      setPostImage(result?.assets[0])
    }
  }

  const openPhoneSettings = () => {
     openSettings()
  }

  const onChangeText = (text) => {
        setCaption(text)
  }

  const onPressUploadPost = () => {
    if (caption?.length>0 && postImage){
      const formData = new FormData()
      console.log(formData);
      formData.append('image', {
        uri: postImage?.uri,
        name: postImage?.fileName,
        type: postImage?.type, // Adjust the type based on your requirements
      });
      
      formData.append('caption', caption)
      formData.append('author', id)

      dispatch(createNewPost(formData)).then(({meta}) => {
        if(meta?.requestStatus === "fulfilled"){
          onBackDropPress()
        }
       })
    }
    else {
      showInfoToast("Please provide image and caption")
    }
  }

  return (
    <ModalContainer isVisible={isVisible} onBackDropPress={onBackDropPress}>
      <View style={styles.container}>
        <TextInput
          multiline
          numberOfLines={4}
          placeholder="Write your post caption"
          style={styles.captionInput}
          value={caption}
          onChangeText = {onChangeText}
        />
        <TouchableOpacity
          style={styles.photoUpload}
          onPress={checkStoragePermission}
          // disabled = {postImage}
          >
          <Icon name="add-a-photo" color={Colors.White} size={22} />
          <Text style={styles.buttonStyle}>Add photo from gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress = {onPressUploadPost} >
          <Icon name="upload" color={Colors.White} size={22} />
          <Text style={styles.buttonStyle}>Upload Post</Text>
        </TouchableOpacity>
      </View>
    </ModalContainer>
  );
}

export default AddPostModal

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.MainBgColor,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 10,
        alignItems: 'center'
    },
    captionInput: {
        backgroundColor: Colors.White,
        width: 325,
        elevation: 5,
        borderRadius: 5,
        marginBottom: 20,
        textAlignVertical: 'top'
    },
    photoUpload: { 
        width: 325,
        backgroundColor: Colors.Green,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        borderRadius: 5,
        elevation: 5,
        marginBottom: 20
    },
    uploadButton: { 
        width: 325,
        backgroundColor: Colors.Blue,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        borderRadius: 5,
        elevation: 5
    },
    buttonStyle: {
         marginLeft: 5,
         color: Colors.White,
         fontSize: 16,
         fontWeight: TypoGraphy.fontWeight.FontWeight600
    }

})