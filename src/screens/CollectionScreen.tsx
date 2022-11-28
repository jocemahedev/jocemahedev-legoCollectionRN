import {Button} from '@react-native-material/core';
import React from 'react';

import {StyleSheet, View} from 'react-native';
import CollectionList from '../components/List/CollectionList';
import CountSets from '../components/Set/CountSets';
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
    <>
      <View style={styles.container}>
        <CountSets />
        <Button
          title={'Search new set 👻'}
          onPress={() => navigation.navigate('Set')}
        />
      </View>
      <CollectionList pressSet={onPressSet} />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
});
