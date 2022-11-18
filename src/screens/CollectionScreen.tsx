import {Button, Text} from '@react-native-material/core';
import {signOut} from 'firebase/auth';
import React from 'react';

import {View} from 'react-native';
import CollectionList from '../components/CollectionList';
import {useReduxDispatch} from '../redux';
import {setCurrentIndexSet} from '../redux/collection';

import {Set, CollectionListScreenProps} from '../types/types';

export default function ({navigation}: CollectionListScreenProps) {
  const dispatch = useReduxDispatch();
  const onPressSet = (set: Set) => {
    dispatch(setCurrentIndexSet(set));
    navigation.navigate('Parts');
  };

  return (
    <View>
      <Button
        title={'Search new set 👻'}
        onPress={() => navigation.navigate('Set')}
      />
      <CollectionList pressSet={onPressSet} />
    </View>
  );
}
