import {Text} from '@react-native-material/core';
import React, {useEffect} from 'react';
import {View, Button} from 'react-native';
import PartsList from '../components/PartsList';

import {useReduxDispatch, useReduxSelector} from '../redux';
import {updateQuantityCurrentSet, updateQuantitySet} from '../redux/collection';
import {selectAllParts, selectPartsByColorByCompleted} from '../redux/set';

export default function ({navigation}: any) {
  const goTo = () => {
    navigation.navigate('CollectionScreen');
  };
  const dispatch = useReduxDispatch();
  useEffect(() => {
    dispatch(updateQuantitySet(quantityCollectorParts));
    dispatch(updateQuantityCurrentSet(quantityCollectorParts));
  });
  const allParts = useReduxSelector(selectPartsByColorByCompleted);
  const allQuantityParts = useReduxSelector(selectAllParts);
  const quantityCollectorParts = allQuantityParts.reduce(
    (tot, part) => tot + part.quantityCollectorPart,
    0,
  );
  const quantityParts = allQuantityParts.reduce(
    (tot, part) => tot + part.quantityPart,
    0,
  );
  return (
    <View>
      <Text>
        {quantityCollectorParts}/{quantityParts}
      </Text>
      <PartsList parts={allParts} />
      <Button onPress={() => goTo()} title={`Return to Collection`} />
    </View>
  );
}
