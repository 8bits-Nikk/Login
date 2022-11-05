import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import {AuthProvider} from './service/AuthProvider';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {googleSignInConfig} from './config/config';

const App = () => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChangedCallBack = (user_: any) => {
    setUser(user_);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChangedCallBack);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initializing) {
    return null;
  }

  return <AuthProvider>{user ? <HomeScreen /> : <LoginScreen />}</AuthProvider>;
};

export default App;
