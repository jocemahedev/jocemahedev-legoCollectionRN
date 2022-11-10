import {Button, Text} from '@react-native-material/core';
import {signOut} from 'firebase/auth';
import React from 'react';

import {View} from 'react-native';
import CollectionList from '../components/CollectionList';
import {useReduxDispatch} from '../redux';
import {setCurrentIndexSet} from '../redux/collection';
import {auth} from '../redux/services/firebase/firebaseConfig';

import {Set, CollectionListScreenProps} from '../types/types';

export default function ({navigation}: CollectionListScreenProps) {
  const dispatch = useReduxDispatch();
  const onPressSet = (set: Set) => {
    dispatch(setCurrentIndexSet(set));
    navigation.navigate('PartsScreen');
  };
  const logoutHandler = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigation.navigate('LoginScreen');
    });
  };

  return (
    <View>
      <Button
        title={'Search new set 👻'}
        onPress={() => navigation.navigate('SetScreen')}
      />
      <CollectionList pressSet={onPressSet} />
      <Text onPress={() => logoutHandler()}>{'Log Out'}</Text>
    </View>
  );
}
