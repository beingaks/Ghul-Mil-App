import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native'
import Colors from '../assets/Colors'
import ModalContainer from './ModalContainer'
import Icon from "react-native-vector-icons/MaterialIcons"
import TypoGraphy from '../assets/TypoGraphy'
import {  showInfoToast } from '../utils/helpers'
import { useDispatch } from 'react-redux'
import { getAllPosts, addComments } from '../store/slices/PostsSlice'

const AddCommentsModal = ({isVisible, onBackDropPress, postId}) => {

  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    setComment('')
  }, [isVisible])


  const onChangeText = (text) => {
        setComment(text)
  }

  const onPressUploadComment = () => {
    if (comment?.length>0 ){
      dispatch(addComments({postId, comment})).then(({meta}) => {
        if(meta?.requestStatus === "fulfilled"){
          dispatch(getAllPosts())
          onBackDropPress()
        }
       })
    }
    else {
      showInfoToast("Please provide comment")
    }
  }

  return (
    <ModalContainer isVisible={isVisible} onBackDropPress={onBackDropPress}>
      <View style={styles.container}>
        <TextInput
          multiline
          numberOfLines={4}
          placeholder="Write your post comment"
          style={styles.captionInput}
          value={comment}
          onChangeText = {onChangeText}
        />
        <TouchableOpacity
          style={styles.uploadButton}
          onPress = {onPressUploadComment} >
          <Icon name="upload" color={Colors.White} size={22} />
          <Text style={styles.buttonStyle}>Upload Comment</Text>
        </TouchableOpacity>
      </View>
    </ModalContainer>
  );
}

export default AddCommentsModal

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