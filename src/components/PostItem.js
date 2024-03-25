import React, {useState} from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import Colors from '../assets/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from "react-native-vector-icons/AntDesign"
import Icon2 from "react-native-vector-icons/FontAwesome"
import { likeUnlikePosts, getAllPosts } from '../store/slices/PostsSlice'
import { useDispatch, useSelector } from 'react-redux'
import AddCommentsModal from './AddCommentsModal'
import CommentsModal from './CommentsModal'
import LikeListModal from './LikeListModal'

const PostItem = ({item}) => {

  const [showCommentModal, setShowCommentModal] = useState(false)
  const [showPostCommentModal, setShowPostCommentModal] = useState(false)
  const [showPostLikesModal, setShowPostLikesModal] = useState(false)


  const dispatch = useDispatch()

  const {id} = useSelector(item => item.authSlice)

  const onPressLikeButton = () => {
      dispatch(likeUnlikePosts({postId: item?._id})).then(({meta}) => {
        if(meta?.requestStatus === "fulfilled"){
            dispatch(getAllPosts())
        }
       })
  }

  const isPostLiked = () => {
    return item?.likes?.some(item => item?._id === id);
  }

  const toggleBackAddCommentDropPress = () => {
    setShowCommentModal(!showCommentModal)
  }

  const toggleBackShowCommentDropPress = () => {
    setShowPostCommentModal(!showPostCommentModal)
  }

  const toggleBackShowLikesDropPress = () => {
    setShowPostLikesModal(!showPostLikesModal)
  }

  return (
    <>
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
                    <View style = {styles.likeCommentContainer}>
                        <TouchableOpacity style = {{marginRight: 10}} onPress = {onPressLikeButton}>
                            <Icon name = "like1" size = {22} style = {{color: isPostLiked() ? Colors?.Blue: Colors?.Grey}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {toggleBackShowLikesDropPress}>
                            <Text>{item?.likes?.length} Likes</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.likeCommentContainer}>
                        <TouchableOpacity style = {{marginRight: 10}} onPress = {toggleBackAddCommentDropPress}>
                            <Icon2 name ='comment' size = {22}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {toggleBackShowCommentDropPress}>
                            <Text>{item?.comments?.length} Comments</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </View>
        </View>
        <AddCommentsModal isVisible = {showCommentModal} onBackDropPress = {toggleBackAddCommentDropPress} postId = {item?._id}/>
        <CommentsModal isVisible = {showPostCommentModal} comments = {item?.comments} onBackDropPress = {toggleBackShowCommentDropPress}/>
        <LikeListModal  isVisible = {showPostLikesModal} likes = {item?.likes} onBackDropPress = {toggleBackShowLikesDropPress}/>
    </>
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
    },
    likeCommentContainer: {
        marginRight: 13
    }
})