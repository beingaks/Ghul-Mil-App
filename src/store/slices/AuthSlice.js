import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { changeUserNameApi, loginApi, registerApi, addProfilePicApi, getUserInfoApi  } from "../../services/api";
import { saveData, getData, showErrorToast, removeData, showSuccessToast } from "../../utils/helpers";

const initialState = {
    id: '',
    email: '',
    token:'',
    profilePic: '',
    followers: [],
    following: [],
    name: '',
    bio: ''
}

export const registerUser = createAsyncThunk( 'user/register', async (data) => {
    try{
        const response = await registerApi(data)
        return response.data
    }
    catch(err){
        throw err?.response?.data?.message
    }
})

export const loginUser = createAsyncThunk( 'user/login', async (data) => {
    try{
        const response = await loginApi(data)
        return response.data
    }
    catch(err){
        throw err?.response?.data?.message
    }
})

export const populateUserInfo = createAsyncThunk( 'populate/userInfo',async () => {
    try{
        const data = await getData("userData")
        return JSON.parse(data)
    }
    catch (err){
        throw err
    }
})

export const removeUserInfo = createAsyncThunk('remove/userInfo', async () => {
    try{
        await removeData("userData")
    }
    catch (err){
        throw err
    }
})

export const getUserInfo = createAsyncThunk( 'user/getUserInfo', async (_,{getState}) => {

    const currentState = getState();

    const { token } = currentState.authSlice;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // You can add other headers as needed
      },
    };

    try{
        const response = await getUserInfoApi(config)
        return response.data
    }
    catch(err){
        throw err?.response?.data?.message
    }
})

export const changeUserName = createAsyncThunk( 'user/changeUserName', async (data, {getState}) => {

    const currentState = getState();

    const { token } = currentState.authSlice;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // You can add other headers as needed
      },
    };

    try{
        const response = await changeUserNameApi(data, config).then()
        return response.data
    }
    catch(err){
        throw err?.response?.data?.message
    }
})

export const addProfilePic = createAsyncThunk( 'user/addProfilePic', async (data, {getState, dispatch}) => {

    const currentState = getState();

    const { token } = currentState.authSlice;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type':  'multipart/form-data', // You can add other headers as needed
      },
    };

    try{
        const response = await addProfilePicApi(data, config)
        return response.data
    }
    catch(err){
        throw err?.response?.data?.message
    }
})

const AuthSlice = createSlice({
    name: 'authSlice',
    initialState,

    reducers: {
     
    },

    extraReducers : (builder) => {
        builder.addCase(
            registerUser.pending, (state, payload) => {
            }
        )
        .addCase(registerUser.fulfilled, (state, {payload}) => {
            saveData("userData", payload)
        })
        .addCase(registerUser.rejected, (state, payload) => {
            showErrorToast(payload?.error?.message)
        })

        builder.addCase(
            loginUser.pending, (state, payload) => {
            }
        )
        .addCase(loginUser.fulfilled, (state, {payload}) => {
            saveData("userData", payload)
        })
        .addCase(loginUser.rejected, (state, payload) => {
            showErrorToast(payload?.error?.message)
        })

        builder.addCase(populateUserInfo.pending, (state, payload) =>{

        })
        .addCase(populateUserInfo.fulfilled, (state, {payload}) => {
            state.email = payload?.email
            state.id = payload?.id
            state.token = payload?.token
            state.name = payload?.name
            state.profilePic = payload?.profilePic
            state.followers = payload?.followers
            state.following = payload?.following
            state.bio = payload?.bio
        })
        .addCase(populateUserInfo.rejected, (state, payload) => {
            showErrorToast(payload?.error?.message)
        })

        builder.addCase(removeUserInfo.pending, (state, payload) => {

        }).addCase(removeUserInfo.fulfilled, (state, {payload}) => {
            state.email = ""
            state.token = ""
            state.id = ""
            state.name = ""
            state.profilePic =""
            state.followers = ""
            state.following =""
            state.bio = ""
        }).addCase(removeUserInfo.rejected, (state, payload) => {
            showErrorToast(payload?.error?.message)
        })

        builder.addCase(getUserInfo.pending, () => {

        }).addCase(getUserInfo.fulfilled, (state, {payload}) => {
            state.name = payload?.name
            state.profilePic = payload?.profilePic
            state.followers = payload?.followers
            state.following = payload?.following
            state.bio = payload?.bio
            saveData("userData", state)
        }).addCase(getUserInfo.rejected, (state, payload) => {
            showErrorToast(payload?.error?.message)
        })

        builder.addCase(addProfilePic.pending, () => {
        })
        .addCase(addProfilePic.fulfilled, (state, {payload}) => {
            showSuccessToast(payload?.message)
        })
        .addCase(addProfilePic.rejected, (state, payload) => {
            showErrorToast(payload?.error?.message)
        })

        builder.addCase(changeUserName.pending, () => {
        })
        .addCase(changeUserName.fulfilled, (state, {payload}) => {
            showSuccessToast(payload?.message)
        })
        .addCase(changeUserName.rejected, (state, payload) => {
            showErrorToast(payload?.error?.message)
        })
    }
})

export default AuthSlice.reducer