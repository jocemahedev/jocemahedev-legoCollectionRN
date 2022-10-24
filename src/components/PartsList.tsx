import React, {useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {Part} from '../types/types';
import {ListItem, Avatar} from '@react-native-material/core';
import Quantity from './Quantity';
import {useReduxDispatch, useReduxSelector} from '../redux';
import {fetchParts, selectStatus} from '../redux/set';

export default function PartsList({parts}: PartsListProps) {
  const dispatch = useReduxDispatch();
  useEffect(() => {
    dispatch(fetchParts());
  }, [dispatch]);
  return (
    <View>
      <FlatList
        data={parts}
        renderItem={({item}) => <Item part={item} />}
        keyExtractor={item => item.index}
      />
    </View>
  );
}

function Item({part}: ItemProps) {
  return (
    <View>
      <ListItem
        leadingMode="avatar"
        leading={<Avatar image={{uri: part.imageUrl}} />}
        title={part.name}
        secondaryText={<Quantity part={part} />}
      />
    </View>
  );
}

type PartsListProps = {
  parts: Part[];
};

type ItemProps = {
  part: Part;
};
