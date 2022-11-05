import React, {createContext} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext({
  loginWithGoogle: () => {},
  logout: () => {},
});

export const AuthProvider = ({children}: any) => {
  return (
    <AuthContext.Provider
      value={{
        loginWithGoogle: async () => {
          console.log('Google login');

          // Check if your device supports Google Play
          await GoogleSignin.hasPlayServices({
            showPlayServicesUpdateDialog: true,
          });
          // Get the users ID token
          const {idToken} = await GoogleSignin.signIn();

          // Create a Google credential with the token
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);

          // Sign-in the user with the credential
          return auth().signInWithCredential(googleCredential);
        },
        logout: async () => {
          return auth().signOut();
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
