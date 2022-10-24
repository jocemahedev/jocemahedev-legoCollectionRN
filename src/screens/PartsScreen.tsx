import {Text} from '@react-native-material/core';
import React from 'react';
import {View, Button} from 'react-native';
import PartsList from '../components/PartsList';

import {useReduxSelector} from '../redux';
import {selectAllParts} from '../redux/set';

export default function ({navigation}: any) {
  const goTo = () => {
    navigation.navigate('CollectionScreen');
  };
  const allParts = useReduxSelector(selectAllParts);
  const quantityCollectorParts = allParts.reduce(
    (tot, part) => tot + part.quantityCollectorPart,
    0,
  );
  const quantityParts = allParts.reduce(
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
