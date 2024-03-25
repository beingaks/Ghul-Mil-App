import React from 'react'
import { FlatList, StyleSheet, Text, View } from "react-native"
import PostItem from './PostItem';
import { useSelector } from 'react-redux';
import TypoGraphy from '../assets/TypoGraphy';

export const PostsList = () => {

const { allPosts } = useSelector(state => state.postSlice)

  return (
    <>
      { 
        allPosts && allPosts?.length > 0 ?
        <FlatList
          data = {allPosts}
          renderItem={({item}) => <PostItem item = {item}/>}
          keyExtractor={item => item?._id}
          contentContainerStyle = {styles.listContainer}
        />:
        <View style = {styles.noPostsContainer}>
          <Text style = {styles.noPostText} >No posts to show</Text>
        </View>
      }
    </>
  )
}

export default PostsList

const styles = StyleSheet.create({
    listContainer: {
        width: '100%',
        // height: "100%"
    },
    noPostsContainer: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    noPostText: {
      fontSize: TypoGraphy.fontSize.Font24,
      fontWeight: TypoGraphy.fontWeight.FontWeight800,
    }
})