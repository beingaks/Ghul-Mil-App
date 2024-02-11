import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, registerApi } from "../../services/api";
import { showErrorToast } from "../../utils/helpers";
import { saveData, getData } from "../../utils/helpers";

const initialState = {
    id: '',
    email: '',
    token:'',
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

const AuthSlice = createSlice({
    name: 'authSlice',
    initialState,

    reducers: {
        populateUserInfo: (state, action) => {
            getData("userData").then(data => {
                const myData = data
                console.log("XnXNXNX",myData);
                state = {...state, ...(JSON.parse(myData))}
                console.log('sss',state);
            })
        }
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
    }
})

export default AuthSlice.reducer

export const {populateUserInfo} = AuthSlice.actions