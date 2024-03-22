import React from 'react'
import Modal from 'react-native-modal'
import { StyleSheet } from 'react-native'

const ModalContainer = ({children, isVisible, onBackDropPress}) => {
  return (
    <Modal isVisible = {isVisible} onBackdropPress = {onBackDropPress} style = {styles.modalContainer}>
        {children}
    </Modal>
  )
}

export default ModalContainer

const styles = StyleSheet.create({
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})