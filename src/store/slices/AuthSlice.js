import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, registerApi } from "../../services/api";
import { saveData, getData, showErrorToast } from "../../utils/helpers";

const initialState = {
    id: '',
    email: '',
    token:'',
}

export const registerUser = createAsyncThunk( 'user/register', async (data) => {
    try{
        const response = await registerApi(data)
        console.log("------->", "worked");
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

export const populateUserInfo =createAsyncThunk( 'populate/userInfo',async () => {
    try{
        const data = await getData("userData")
        return JSON.parse(data)
    }
    catch (err){
        console.log(err);
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
            // showErrorToast(payload?.error?.message)
        })

        builder.addCase(
            loginUser.pending, (state, payload) => {
            }
        )
        .addCase(loginUser.fulfilled, (state, {payload}) => {
            saveData("userData", payload)
        })
        .addCase(loginUser.rejected, (state, payload) => {
            // showErrorToast(payload?.error?.message)
        })

        builder.addCase(populateUserInfo.pending, (state, payload) =>{

        })
        .addCase(populateUserInfo.fulfilled, (state, {payload}) => {
            console.log("SSSSSSSS",payload);
            state.email = payload?.email
            state.id = payload?.id
            state.token = payload?.token
            console.log("YYEEEEEEEEE",state);
        })
        .addCase(populateUserInfo.rejected, (state, {payload}) => {
            console.log("Failed");
        })
    }
})

export default AuthSlice.reducer