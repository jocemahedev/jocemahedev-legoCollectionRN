import {TextInput, Button, Stack, Text} from '@react-native-material/core';

import React, {useState} from 'react';
import {auth} from '../redux/services/firebase/firebaseConfig';
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from 'firebase/auth';
import {nanoid} from '@reduxjs/toolkit';
import {useReduxDispatch} from '../redux';
import {setCurrentCollection} from '../redux/collection';
import {setCurrentCollector} from '../redux/collector';
import {Collector} from '../types/types';
import {StyleSheet, View} from 'react-native';

export type currentAuthentification = 'create' | 'login' | 'reset';
export type userAuthentificationProps = {
  current: currentAuthentification;
  redirect: () => void;
};
const UserAuthentification = ({
  current,
  redirect,
}: userAuthentificationProps) => {
  const dispatch = useReduxDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [currentAuthentification, setCurrentAuthentification] =
    useState<currentAuthentification>(current);

  const [error, setError] = useState<string | undefined>(undefined);

  const getNewCollector = (user: User): Collector => {
    return {
      name: user.displayName,
      email: user.email,
      collection: {id: nanoid(), idSets: user.uid},
    };
  };
  const loginHandler = () => {
    setError(undefined);
    signInWithEmailAndPassword(auth, 'Testtoto6@gmail.com', 'testtoto6')
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        const collector: Collector = getNewCollector(user);
        dispatch(setCurrentCollector(collector));
        if (collector.collection) {
          dispatch(setCurrentCollection(collector.collection));
        }
        console.log('Works!');
        redirect();
      })
      .catch(e => {
        setError(e.message);
      });
  };
  const resetPasswordHandler = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        console.log('password sent');
      })
      .catch(e => {
        setError(e.message);
      });
  };
  const createAccountHandler = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name,
        }).then(() => {
          const collector: Collector = getNewCollector(user);
          dispatch(setCurrentCollector(collector));
          if (collector.collection) {
            dispatch(setCurrentCollection(collector.collection));
          }
          console.log('Works!');
          redirect();
        });
      })
      .catch(e => {
        setError(e.message);
      });
  };
  return (
    <View style={styles.container}>
      <Stack spacing={8} style={styles.stack}>
        {error && <Text>{error}</Text>}

        <TextInput
          placeholder="email"
          textContentType={'emailAddress'}
          onChangeText={text => setEmail(text)}
          value={email}
          clearButtonMode={'while-editing'}
          keyboardType={'email-address'}
        />

        {currentAuthentification !== 'reset' && (
          <TextInput
            textContentType={'password'}
            onChangeText={text => setPassword(text)}
            value={password}
            clearButtonMode={'while-editing'}
            returnKeyLabel={'done'}
            returnKeyType={'done'}
            placeholder={'Password'}
            secureTextEntry={true}
          />
        )}
        {currentAuthentification === 'create' && (
          <TextInput
            textContentType={'name'}
            onChangeText={text => setName(text)}
            value={name}
            clearButtonMode={'while-editing'}
            returnKeyLabel={'done'}
            returnKeyType={'done'}
            placeholder={'Enter your name'}
          />
        )}

        {currentAuthentification === 'login' && (
          <>
            <Button title="login" onPress={() => loginHandler()} />
            <Button
              style={styles.marginButtonText}
              variant="text"
              onPress={() => setCurrentAuthentification('create')}
              title={'Create new account'}
            />

            <Button
              style={styles.marginButtonText}
              variant="text"
              onPress={() => setCurrentAuthentification('reset')}
              title={'Reset password'}
            />
          </>
        )}
        {currentAuthentification === 'create' && (
          <>
            <Button
              onPress={() => createAccountHandler()}
              title="Create account"
            />
            <Button
              style={styles.marginButtonText}
              variant="text"
              onPress={() => setCurrentAuthentification('login')}
              title={'Return to login'}
            />
          </>
        )}
        {currentAuthentification === 'reset' && (
          <>
            <Button
              title="Reset Password"
              onPress={() => resetPasswordHandler()}
            />
            <Button
              style={styles.marginButtonText}
              variant="text"
              onPress={() => setCurrentAuthentification('login')}
              title={'Return to login'}
            />
          </>
        )}
      </Stack>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    margin: 30,
    marginTop: '50%',
  },
  stack: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  marginButtonText: {
    marginTop: 20,
  },
});
export default UserAuthentification;
