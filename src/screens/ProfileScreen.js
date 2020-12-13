import React, { useState, useEffect} from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import * as firebase from "firebase";
import "firebase/firestore";
import { AuthContext} from "../providers/AuthProvider";
import { MaterialIcons , MaterialCommunityIcons } from "@expo/vector-icons";
import UploadPhoto from "./../components/UploadPhoto";

const ProfileScreen = (props) => {
    const [Profile, setProfile] = useState({});
    const user = firebase.auth().currentUser;

    const loadProfile = async ()=>{
        const doc = await firebase.firestore().collection('users').doc(user.uid).get().then((doc)=>{
            setProfile(doc.data());
            console.log(doc.data());
        })
    }

    const deleteProfile = async () => {
        firebase.firestore().collection("users").doc(user.uid).delete().then(function () {
            user.delete().then(function () {
                firebase.auth().signOut().then(() => {
                }).catch((error) => {
                    alert(error);
                });
            }).catch(function (error) {
                alert(error);
            });
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });

        const doc = await firebase.firestore().collection('users').doc(user.uid).get().then((doc) => {
            setProfile(doc.data());
            console.log(doc.data());
        })
    }

    useEffect(() => {
        loadProfile();
    }, []);

    return (
        <AuthContext.Consumer>
            {(auth) => (
                <View style={styles.viewStyle}>
                    
                        <View>
                            <UploadPhoto props={props} />
                        </View>
                        <Card.Divider/>
                        <Text style={styles.NameStyle}>{Profile.name}</Text>
                        <View style={styles.viewStyle2}>
                            <View style={styles.perViewStyle2}>
                            <MaterialIcons name="check" size={30} color="#FFFFFF" />
                            <Text style={{ fontSize: 24, color: "#FFFFFF", marginLeft: 20 }}>{Profile.sid}</Text>
                            </View>
                            <View style={styles.perViewStyle2}>
                            <MaterialIcons name="email" size={30} color="#FFFFFF" />
                            <Text style={{ fontSize: 24, color: "#FFFFFF", marginLeft: 20 }}>{Profile.email}</Text>
                            </View>
                            <View style={styles.perViewStyle2}>
                            <MaterialIcons name="place" size={30} color="#FFFFFF" />
                            <Text style={{ fontSize: 24, color: "#FFFFFF", marginLeft: 20 }}>{Profile.address}</Text>
                            </View>
                            <View style={styles.perViewStyle2}>
                            <MaterialIcons name="date-range" size={30} color="#FFFFFF" />
                            <Text style={{ fontSize: 24, color: "#FFFFFF", marginLeft: 20 }}>{Profile.bornOn}</Text>
                            </View>
                            <View style={styles.perViewStyle2}>
                            <MaterialIcons name="work" size={30} color="#FFFFFF" />
                            <Text style={{ fontSize: 24, color: "#FFFFFF", marginLeft: 20 }}>{Profile.worksAt}</Text>
                            </View>
                        </View>

                        <Button
                            buttonStyle={styles.buttonStyle}
                            titleStyle={styles.textColor}
                            title="Delete Profile"
                            type='solid'
                            onPress={
                                function () {
                                    deleteProfile(auth);
                                    auth.setIsLoggedIn(false);
                                    auth.setCurrentUser({});
                                }
                            }
                        />        
                </View>
            )}
        </AuthContext.Consumer>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 30,
    },
    NameStyle:{
        padding: 15,
        fontSize: 30,
        color: "#FFFFFF",
        alignSelf: "center",
        fontStyle: 'normal'
    
      },
    buttonStyle: {
        backgroundColor: "#38a4a4",
        marginTop: 5,
        marginBottom: 5,
    },
    viewStyle: {
        padding: 10,
        backgroundColor: "#004d4d",
        flex: 1,
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 5,
    },

    perViewStyle2: {
        flexDirection: 'row',
        marginBottom: 10,
        margin: 10,
        padding: 10
      },
      viewStyle2: {
        paddingTop: 1,
        paddingHorizontal: 1,
        marginBottom: 1,
      },
});

export default ProfileScreen;
