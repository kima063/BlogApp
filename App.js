import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStackScreen from "./src/navigation/AuthStack";
import AppDrawerScreen from "./src/navigation/AppDrawer";

import { AuthContext, AuthProvider } from "./src/providers/AuthProvider";

import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB_gzlD-0EeMuKUvoHx8VLwBmFo2HRMosA",
  authDomain: "blogapp-d0cf8.firebaseapp.com",
  projectId: "blogapp-d0cf8",
  storageBucket: "blogapp-d0cf8.appspot.com",
  messagingSenderId: "134254565094",
  appId: "1:134254565094:web:47666e98c66839a583cd27"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

function App() {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) => (
          <NavigationContainer>
            {auth.IsLoggedIn ? <AppDrawerScreen /> : <AuthStackScreen />}
          </NavigationContainer>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}

export default App;
