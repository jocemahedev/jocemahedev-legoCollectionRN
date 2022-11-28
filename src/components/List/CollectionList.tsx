import {Avatar, ListItem, Text} from '@react-native-material/core';
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {useReduxDispatch, useReduxSelector} from '../../redux';
import {
  fetchSets,
  selectAllSets,
  selectCurrentCollection,
  deleteSet,
  deleteParts,
} from '../../redux/collection';

import {Set} from '../../types/types';

export default function CollectionList({pressSet}: CollectionListProps) {
  const currentCollection = useReduxSelector(selectCurrentCollection);
  const allSets = useReduxSelector(selectAllSets);
  const dispatch = useReduxDispatch();
  useEffect(() => {
    dispatch(fetchSets());
    console.log('fetchSet CollectionList');
  }, [currentCollection, dispatch]);

  return (
    <View>
      <FlatList
        contentContainerStyle={{paddingBottom: 70}}
        data={allSets}
        renderItem={({item}) => <Item set={item} onPress={pressSet} />}
        numColumns={1}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
function Item({set, onPress}: ItemProps) {
  const dispatch = useReduxDispatch();
  const deleteSetHandler = (deletedSet: Set) => {
    dispatch(deleteSet(deletedSet.id));
    dispatch(deleteParts(deletedSet.idParts));
  };
  const quantityText = set.quantityCollectorParts + '/' + set.quantityParts;
  return (
    <View>
      <ListItem
        onPress={() => onPress(set)}
        leadingMode="image"
        title={set.idLego + ' ' + set.name}
        leading={<Avatar image={{uri: set.imageUrl}} />}
        trailing={<Button icon="trash" onPress={() => deleteSetHandler(set)} />}
        secondaryText={quantityText}
      />
    </View>
  );
}

type CollectionListProps = {
  pressSet: (set: Set) => void;
};

type ItemProps = {
  set: Set;
  onPress: (set: Set) => void;
};
