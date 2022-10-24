import React from 'react';
import {Text, View} from 'react-native';
import {Set} from '../types/types';

export default function SetPartsInfo({set}: SetPartsInfoProps) {
  return (
    <View>
      <Text>
        {set.quantityCollectorParts}/{set.quantityParts}
      </Text>
    </View>
  );
}

type SetPartsInfoProps = {
  set: Set;
};
