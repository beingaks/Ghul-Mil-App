import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native'
import Colors from '../../../assets/Colors'
import ModalContainer from '../../../components/ModalContainer'
import Icon from "react-native-vector-icons/MaterialIcons"
import TypoGraphy from '../../../assets/TypoGraphy'
import { showInfoToast } from '../../../utils/helpers'
import { useDispatch } from 'react-redux'
import { changeUserName, getUserInfo } from '../../../store/slices/AuthSlice'

const EditProfileModal = ({isVisible, onBackDropPress, name, bio}) => {

  const [newName, setNewName] = useState(name)
  const [newBio, setNewBio] = useState(bio)

  const dispatch = useDispatch()

  const onChangeName = (text) => {
    setNewName(text)
  }

  const onChangeBio = (text) => {
    setNewBio(text)
}

  const onPressUploadComment = () => {
    dispatch(changeUserName({newName, newBio})).then(({meta}) => {
        if(meta?.requestStatus === "fulfilled"){
            dispatch(getUserInfo())
            onBackDropPress()
        }
    })
  }

  const backPress = () => {
    setNewBio(bio)
    setNewName(name)
    onBackDropPress()
  }

  return (
    <ModalContainer isVisible={isVisible} onBackDropPress={backPress}>
      <View style={styles.container}>
        <TextInput
          multiline
          numberOfLines={2}
          placeholder="Write new name"
          style={styles.captionInput}
          value={newName}
          onChangeText = {onChangeName}
          maxLength = {20}
        />
         <TextInput
          multiline
          numberOfLines={2}
          placeholder="Write new bio"
          style={styles.captionInput}
          value={newBio}
          onChangeText = {onChangeBio}
          maxLength = {60}
        />
        <TouchableOpacity
          style={styles.uploadButton}
          onPress = {onPressUploadComment} >
          <Icon name="upload" color={Colors.White} size={22} />
          <Text style={styles.buttonStyle}>Upload Bio</Text>
        </TouchableOpacity>
      </View>
    </ModalContainer>
  );
}

export default EditProfileModal

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