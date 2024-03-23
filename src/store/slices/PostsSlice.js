import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showErrorToast, showSuccessToast } from "../../utils/helpers";
import {getAllPostsApi, likeUnlikePostApi, addCommentApi, createPostApi} from '../../services/api'

export const getAllPosts = createAsyncThunk( 'posts/allPosts', async (data, {getState}) => {

    const currentState = getState();

    const { token } = currentState.authSlice;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // You can add other headers as needed
      },
    };
    try{
        const response = await getAllPostsApi(config)
        return response.data
    }
    catch(err){
        throw err?.response?.data?.message
    }
})

export const createNewPost = createAsyncThunk( 'posts/createPost', async (data, {getState}) => {

    const currentState = getState();

    const { token } = currentState.authSlice;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type':  'multipart/form-data',
      },
    };

    try{
        const response = await createPostApi(data, config)
        return response.data
    }
    catch(err){
        throw err?.response?.data?.message
    }
})

const initialState = {
    allPosts: []
}

const postSlice = createSlice({
    name: "postSlice",
    initialState,
    reducers: {

    },
    
    extraReducers: (builder) => {
        builder.addCase(getAllPosts.pending, () => {

        }).
        addCase(getAllPosts.fulfilled, (state, {payload}) => {
            state.allPosts = payload
        }).
        addCase(getAllPosts.rejected, (state, payload) => {
            showErrorToast(payload?.error?.message)
        })

        builder.addCase(createNewPost.pending, () => {

        }).
        addCase(createNewPost.fulfilled, (state, {payload}) => {
            showSuccessToast("Post created successfully")
        }).
        addCase(createNewPost.rejected, (state, payload) => {
            console.log(JSON.stringify(payload));
            showErrorToast(payload?.error?.message)
        })
    }
})

export default postSlice.reducer