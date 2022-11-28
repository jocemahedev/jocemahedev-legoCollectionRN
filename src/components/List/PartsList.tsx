import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  StyleSheetProperties,
  TouchableOpacity,
  View,
} from 'react-native';
import {Part} from '../../types/types';
import {
  ListItem,
  Avatar,
  Text,
  ActivityIndicator,
  Surface,
  Button,
} from '@react-native-material/core';
import Quantity from '../Part/Quantity';
import {useReduxDispatch, useReduxSelector} from '../../redux';
import {fetchParts, selectAllColors, selectStatus} from '../../redux/set';
import ColorsFilter from '../Filter/ColorsFilter';
import CompletePartsFilter from '../Filter/CompletePartsFilter';
import OnlyMinifigFilter from '../Filter/OnlyMinifigFilter';
import {is} from 'immer/dist/internal';
import {yellow100} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const PartsList = ({parts}: PartsListProps) => {
  const dispatch = useReduxDispatch();
  const allColors = useReduxSelector(selectAllColors);
  const status = useReduxSelector(selectStatus);
  const [activeFilter, setActiveFilter] = useState(true);
  const isLoading = status === 'loading';
  const zeroPart = parts.length === 0;
  const ZERO_PART_MESSAGE = ' Zéro part 🤦';
  const SEE_FILTER = 'See Filters  🧐';
  const HIDE_FILTER = 'Hide Filters 🫣';

  useEffect(() => {
    dispatch(fetchParts());
  }, [dispatch]);
  return (
    <View>
      {isLoading && <ActivityIndicator />}
      {!isLoading && (
        <>
          <View style={styles.container}>
            {activeFilter && (
              <Button
                title={SEE_FILTER}
                variant="text"
                onPress={() => setActiveFilter(false)}
              />
            )}
            {!activeFilter && (
              <>
                <Button
                  title={HIDE_FILTER}
                  variant="text"
                  onPress={() => setActiveFilter(true)}
                />
                <ColorsFilter colors={allColors} />
                <CompletePartsFilter />
                <OnlyMinifigFilter />
              </>
            )}
          </View>
          {zeroPart && <Text>{ZERO_PART_MESSAGE}</Text>}
          {!zeroPart && (
            <FlatList
              contentContainerStyle={{paddingBottom: 180}}
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
        leadingMode="image"
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
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  complete: {
    backgroundColor: 'green',
  },
  incomplete: {
    backgroundColor: 'red',
  },
});
export default PartsList;
