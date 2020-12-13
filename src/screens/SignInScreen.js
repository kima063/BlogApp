import React, { useState } from 'react';
import { View, StyleSheet, Image} from 'react-native';
import { Input, Button, Card} from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { AuthContext, AuthProvider } from './../providers/AuthProvider'

import * as firebase from "firebase";

const SignInScreen = (props) => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    return (
            <AuthContext.Consumer>
                {(auth)=>(
                    <View style={styles.viewStyle}>
                        <Card>
                        <Card.Title>Welcome to BlogApp!</Card.Title>
                            <Card.Divider />
                            <Input
                                inputStyle={styles.inputStyle}
                                leftIcon={<FontAwesome name="envelope-o" size={18} color="black" />}
                                placeholder='E-mail Address' 
                                onChangeText={function (currentInput) {
                                    setEmail(currentInput);
                                }}
                                />
                            <Input
                                inputStyle={styles.inputStyle}
                                leftIcon={<Feather name="lock" size={18} color="black" />}
                                placeholder='Password'
                                secureTextEntry={true} 
                                onChangeText={function (currentInput) {
                                    setPassword(currentInput);
                                }}
                            />
                        
                            <Button
                                buttonStyle={styles.buttonStyle}
                                title='Sign In'
                                type='solid'
                                onPress={function () {
                                    firebase.auth().signInWithEmailAndPassword(Email, Password).then((userCreds) => {
                                        auth.setIsLoggedIn(true);
                                        auth.setCurrentUser(userCreds.user);
                                    }).catch((error) => {
                                        alert(error);
                                    })
                                }}
                            />
                            <Button
                                buttonStyle={styles.signupbuttonStyle}
                                titleStyle={styles.textColor}
                                title="Don't have an account? Sign Up!"
                                type='clear'
                                onPress={
                                    function () {
                                        props.navigation.navigate("SignUp");
                                    }
                                }
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

    buttonStyle:{
        backgroundColor: '#38a4a4',
        marginTop: 15,
        marginBottom: 5,
    },

    textColor: {
        color: "#38a4a4",
    },

    signupbuttonStyle: {
        marginTop: 5,
        marginBottom: 10,
    },

    logo: {
        width: 66,
        height: 58,
    },

    viewStyle: {
        backgroundColor: "#004d4d",
        flex: 1,
        justifyContent: 'center',
    }
});

export default SignInScreen;