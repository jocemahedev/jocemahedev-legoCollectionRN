import {Button} from '@react-native-material/core';
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
    navigation.navigate('PartsScreen');
  };

  return (
    <View>
      <Button
        title={'Search new set 👻'}
        onPress={() => navigation.navigate('SetScreen')}
      />
      <CollectionList pressSet={onPressSet} />
    </View>
  );
}
