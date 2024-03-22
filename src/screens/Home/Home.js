import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import GlobalStyles from '../../assets/GlobalStyles';
import PostsList from '../../components/PostsList';
import { useDispatch } from 'react-redux';
import { getAllPosts } from '../../store/slices/PostsSlice';

const Home = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllPosts())
    }, [])

    return(
        <View style = {GlobalStyles.ScreenContainer}>
            <PostsList/>
        </View>
    )
}

export default Home