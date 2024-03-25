import React from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import Colors from '../assets/Colors'
import ModalContainer from './ModalContainer'
import TypoGraphy from '../assets/TypoGraphy'

const LikeListModal = ({ onBackDropPress , likes, isVisible}) => {

  const renderItem = ({item}) => {
    return (
      <View style = {styles.commentContainer}>
        <View style = {styles.commentAuthorContainer}>
          <View style = {styles.noAuthorImage}></View>
          <Text style = {styles.emailText}>{item?.email}</Text>
        </View>
      </View>
    )
  }

  const keyExtractor = (item, index) => {
    return item?._id
  }

  return (
    <ModalContainer isVisible={isVisible} onBackDropPress={onBackDropPress}>
      <View style={styles.container}>
        {
          likes && likes?.length > 0 ? 
          <FlatList
            data = {likes}
            renderItem = {renderItem}
            keyExtractor = {keyExtractor}
            style = {{width: "95%"}}
          />:
          <View style = {styles.noCommentContainer}>
            <Text style = {styles.noCommentText}>No likes to show</Text>
          </View>
        }
      </View>
    </ModalContainer>
  );
}

export default LikeListModal

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.White,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 10,
        alignItems: 'center',
        height: "50%",
        width: "75%"
    },
    commentContainer: {
        backgroundColor: Colors.MainBgColor,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        elevation: 3,
        marginBottom: 10
      },
    commentAuthorContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    noAuthorImage: {
        backgroundColor: Colors.Black,
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 5
    },
    emailText: {
        fontSize: TypoGraphy.fontSize.Font16,
        color: Colors.Black,
        fontWeight: TypoGraphy.fontWeight.FontWeight600
    },
    commentText: {
      fontSize: TypoGraphy.fontSize.Font16,
      color: Colors.HeaderColor
    },
    noCommentContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    noCommentText: {
      fontSize: TypoGraphy.fontSize.Font20,
      fontWeight: TypoGraphy.fontWeight.FontWeight600,
    }
})