import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { FontAwesome, Feather, Ionicons } from "@expo/vector-icons";
import { AuthContext, AuthProvider } from './../providers/AuthProvider'
import * as firebase from "firebase";
import "firebase/firestore";
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign, MaterialIcons  } from "@expo/vector-icons";

const SignUpScreen = (props) => {
    const [Name, setName] = useState("");
    const [SID, setSID] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [date, setDate] = useState(new Date(17000));
    const [show, setShow] = useState(false);
    const [BornOn , setBornOn] = useState("");
    const [Address, setAddress] = useState("");
    const [Works_At, setWorksAt] = useState("");
    return (
            <AuthContext.Consumer>
                {(auth)=>(
                    <View style={styles.viewStyle}>
                    <Card>
                    <Card.Title>Welcome to BlogApp!</Card.Title>
                        <Card.Divider />
                        <Input
                            inputStyle={styles.inputStyle}
                            leftIcon={<Ionicons name="ios-person" size={24} color="black" />}
                            placeholder="Name"
                            onChangeText={function (currentInput) {
                                setName(currentInput);
                            }}
                        />
                        <Input
                            inputStyle={styles.inputStyle}
                            leftIcon={<Ionicons name="ios-school" size={24} color="black" />}
                            placeholder="Student ID"
                            onChangeText={function (currentInput) {
                                setSID(currentInput);
                            }}
                        />
                        <Input
                            inputStyle={styles.inputStyle}
                            leftIcon={<FontAwesome name="envelope" size={24} color="black" />}
                            placeholder="E-mail Address"
                            onChangeText={function (currentInput) {
                                setEmail(currentInput);
                            }}
                        />

                        <Input
                            inputStyle={styles.inputStyle}
                            placeholder="Password"
                            leftIcon={<Feather name="key" size={24} color="black" />}
                            secureTextEntry={true}
                            onChangeText={function (currentInput) {
                                setPassword(currentInput);
                            }}
                        />

                        <Input
                            leftIcon={<MaterialIcons name="place" size={24} color="black" />}
                            placeholder='Address'
                            onChangeText={
                                function (currentInput) {
                                    setAddress(currentInput);
                                }
                            }
                        />

                        <Input
                            leftIcon={<MaterialIcons name="work" size={24} color="black" />}
                            placeholder='Works At'
                            onChangeText={
                                function (currentInput) {
                                    setWorksAt(currentInput);
                                }
                            }
                        />  

                        <View>
                        <View style={styles.viewStyle2}>

                            <Button icon={<MaterialIcons name="date-range" size={24} color="black" />}
                                style={styles.buttonStyle2} type="outline" color='java' onPress={
                                    function () {
                                        setShow(true)
                                    }} title="  Select Your BirthDate" />
                        </View>
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode="date"
                                display="calendar"
                                onChange={function (event, selectedDate) {
                                setShow(false);
                                setDate(selectedDate);
                                let str = selectedDate.toString();
                                str = str.slice(4, 16)
                                setBornOn(str);
                                }
                                }
                            />
                        )}
                        </View>    

                        <Button
                            buttonStyle={styles.buttonStyle}
                            title="  Sign Up!"
                            type="solid"
                            onPress={function () {
                                if(Name && SID && Password && Email){
                                    firebase.auth().createUserWithEmailAndPassword(Email, Password).then((userCreds)=>{
                                        userCreds.user.updateProfile({displayName: Name});
                                        firebase.firestore().collection('users').doc(userCreds.user.uid).set({
                                            name: Name,
                                            sid: SID,
                                            email: Email,
                                            password: Password,
                                            bornOn: BornOn,
                                            address: Address,
                                            worksAt: Works_At,
                                        }).then(()=>{
                                            alert("User ID : " + userCreds.user.uid + " created account successfully!");
                                            console.log(userCreds.user);
                                            props.navigation.navigate("SignIn");
                                        }).catch((error)=>{
                                            alert(error);
                                        });
                                    }).catch((error)=>{
                                        alert(error);
                                    })
                                }else{
                                    alert("Fields can not be empty!")
                                }
                            }}
                        />
                        <Button
                            buttonStyle={styles.signupbuttonStyle}
                            titleStyle={styles.textColor}
                            type="clear"
                            title="  Already have an account?"
                            onPress={function () {
                                props.navigation.navigate("SignIn");
                            }}
                        />
                    </Card>
                    </View>
                )}
            </AuthContext.Consumer>
    );
}

const styles = StyleSheet.create({
    inputStyle: {
        margin: 5,
    },

    buttonStyle: {
        backgroundColor: '#38a4a4',
        marginTop: 15,
        marginBottom: 5,
    },

    textColor: {
        color: "#1C1C1C",
    },

    signupbuttonStyle: {
        marginTop: 5,
        marginBottom: 10,
    },



    viewStyle:{
        backgroundColor: "#004d4d",
        flex:1,
        justifyContent:'center',
    }
});
export default SignUpScreen;