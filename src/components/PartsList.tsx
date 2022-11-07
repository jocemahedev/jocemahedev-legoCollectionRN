import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Part} from '../types/types';
import {
  ListItem,
  Avatar,
  Text,
  ActivityIndicator,
} from '@react-native-material/core';
import Quantity from './Quantity';
import {useReduxDispatch, useReduxSelector} from '../redux';
import {fetchParts, selectAllColors, selectStatus} from '../redux/set';
import ColorsList from './ColorsList';
import CompletePartsFilter from './CompletePartsFilter';

const PartsList = ({parts}: PartsListProps) => {
  const dispatch = useReduxDispatch();
  const allColors = useReduxSelector(selectAllColors);
  const status = useReduxSelector(selectStatus);
  const isLoading = status === 'loading';
  const zeroPart = parts.length === 0;
  const ZERO_PART_MESSAGE = ' Zéro pièce trouvé 🤦';

  useEffect(() => {
    dispatch(fetchParts());
  }, [dispatch]);
  return (
    <View>
      {isLoading && <ActivityIndicator />}
      {!isLoading && (
        <>
          <ColorsList colors={allColors} />
          <CompletePartsFilter />
          {zeroPart && <Text>{ZERO_PART_MESSAGE}</Text>}
          {!zeroPart && (
            <FlatList
              data={parts}
              renderItem={({item}) => <Item part={item} />}
              keyExtractor={item => item.index}
            />
          )}
        </>
      )}
    </View>
  );
};

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
export default PartsList;
