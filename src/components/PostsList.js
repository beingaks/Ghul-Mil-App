import React from 'react'
import { FlatList, StyleSheet, Text } from "react-native"
import PostItem from './PostItem';
import { useSelector } from 'react-redux';

export const PostsList = () => {

const { allPosts } = useSelector(state => state.postSlice)

  return (
    <FlatList
        data = {allPosts}
        renderItem={({item}) => <PostItem item = {item}/>}
        keyExtractor={item => item?._id}
        contentContainerStyle = {styles.listContainer}
    />
  )
}

export default PostsList

const styles = StyleSheet.create({
    listContainer: {
        width: '100%',
        // height: "100%"
    }
})