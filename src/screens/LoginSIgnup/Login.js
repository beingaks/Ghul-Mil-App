import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import React,{useState} from "react"
import GlobalStyles from "../../assets/GlobalStyles"
import Colors from "../../assets/Colors"
import TypoGraphy from "../../assets/TypoGraphy"
import { useDispatch } from "react-redux"
import { loginUser } from "../../store/slices/AuthSlice"
import { showErrorToast } from "../../utils/helpers";

const Login = ({navigation}) => {

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const dispatch = useDispatch()

const NavigateTo = () =>{
    navigation.navigate("Signup")
}

const Submit = () => {
    if(email && password){
        dispatch(loginUser({email, password})).then(({meta}) => {
            if(meta?.requestStatus === "fulfilled"){
                navigation.navigate("Home")
            }
           })
    }
    else{
        // showErrorToast("Please enter all fields")
    }
}

    return (
        <View style = {[GlobalStyles.ScreenContainer, styles.mainContainer]}>
             <View style = {styles.loginContainer}>
                <Text style = {[GlobalStyles.MainHeading, styles.headerText]}>Login</Text>
                <TextInput placeholder="Enter Your Email" style = {[styles.inputComponent]} value = {email} onChangeText={text => setEmail(text)}/>
                <TextInput placeholder="Enter Your Password" style = {[styles.inputComponent]}  value = {password} onChangeText={text => setPassword(text)}/>
                <View style = {styles.buttonContainer}>
                    <TouchableOpacity style = {[styles.bottomButton, {backgroundColor: Colors.Green}]} onPress={Submit}>
                        <Text style = {styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style = {[styles.bottomButton, {backgroundColor: Colors.Blue}]} onPress={NavigateTo}>
                        <Text style = {styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </View>
             </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        marginTop: 10,
        marginBottom: 10
    },
    loginContainer: {
        width: "75%",
        // height: "80%",
        backgroundColor: Colors.White,
        borderRadius: 20,
        elevation: 5,
        alignItems:'center',
        flexDirection: 'column'
    },
    inputComponent: {
        borderBottomColor: Colors.Grey,
        borderBottomWidth: 1,
        width: '70%',
        height: 40,
        marginBottom:30
    },
    buttonContainer: {
        width: '70%',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-around',
        marginBottom: 30
    },
    bottomButton: {
        width:80,
        height:30,
        borderColor: Colors.Grey,
        borderWidth: 0.1,
        borderRadius: 5
    },
    buttonText: {
        fontSize: TypoGraphy.fontSize.Font16,
        width: '100%',
        height: '100%',
        textAlign: 'center',
        color: Colors.White,
        fontWeight:TypoGraphy.fontWeight.FontWeight600
    }
})