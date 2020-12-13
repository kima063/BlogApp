import React, { useEffect, useState } from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import * as firebase from "firebase";
import "firebase/firestore";
import CommentCard from "../components/CommentCard";
import { FlatList } from "react-native-gesture-handler";
const NotificationScreen = (props) => {
  let [notification, setNotification] = useState([]);
  const[reload , setReload] = useState(false);

  const getNotification = async () =>{
    setReload(true)
    firebase
    .firestore()
    .collection("notifications")
    .onSnapshot((querySnapshot)=>{
      let allNotify = []
      querySnapshot.forEach((doc)=>{
        allNotify.push({
          id:doc.id,
          data:doc.data(),
        });
      });
      if(allNotify!=null){
        setNotification(allNotify)
      }
      else console.log("No Notification")
      setReload(false)
    },(error)=>{
      setReload(false);
      console.log(error);
    });

  }

  useEffect(()=>{
    getNotification();
  },[])
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <Header
            containerStyle={{
              backgroundColor: '#004d4d',
            }}
            leftComponent={{
              icon: "menu",
              color: "#fff",
              onPress: function () {
                props.navigation.toggleDrawer();
              },
            }}
            centerComponent={{ text: "BlogApp", style: { color: "#fff", fontSize: 20 } }}
            rightComponent={{
              icon: "lock-outline",
              color: "#fff",
              onPress: function () {
                firebase
                .auth()
                .signOut()
                .then(()=>{
                  auth.setisLogged(false);
                  auth.setcurrentUser({});
                }).catch((error)=>console.log)
              },
            }}
          />
          <View>
            <FlatList
            data={notification}
            onRefresh={getNotification}
            refreshing={reload}
            renderItem={function ({item}){
              if(item.data.receiver==auth.currentUser.email)
              return(
                <ShowNotification
                content={item.data}
                navigation={navigation}
                />);
            }}
            keyExtractor={(item, index)=> index.toString()}
            />
          </View>
          <Card>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Avatar
                containerStyle={{ backgroundColor: "cyan" }}
                rounded
                icon={{
                  name: "thumbs-o-up",
                  type: "font-awesome",
                  color: "black",
                }}
                activeOpacity={1}
              />
              <Text style={{ paddingHorizontal: 10 }}>
                Pam Beesley Liked Your Post.
              </Text>
            </View>
          </Card>
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
  },
});

export default NotificationScreen;
