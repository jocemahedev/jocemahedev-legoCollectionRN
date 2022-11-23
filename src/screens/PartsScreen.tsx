import React from 'react';
import {View, Button} from 'react-native';
import PartsList from '../components/List/PartsList';

import QuantityParts from '../components/Set/QuantityParts';

import {useReduxSelector} from '../redux';

import {selectPartsByColorByCompleted} from '../redux/set';

export default function ({navigation}: any) {
  const goTo = () => {
    navigation.navigate('Collection');
  };
  const allParts = useReduxSelector(selectPartsByColorByCompleted);

  return (
    <View>
      <QuantityParts />
      <PartsList parts={allParts} />
      <Button onPress={() => goTo()} title={`Return to Collection`} />
    </View>
  );
}
