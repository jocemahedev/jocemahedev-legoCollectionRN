import { Stack} from '@react-native-material/core';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Part} from '../types/types';
import {Button} from 'react-native-paper';
import {
  completePart,
  decrementPart,
  incrementPart,
  updateParts,
} from '../redux/set';
import {useReduxDispatch} from '../redux';

const Quantity = ({part}: QuantityProps) => {
  const dispatch = useReduxDispatch();
  return (
    <Stack direction="row" spacing={1} style={styles.stackQuantity}>
      <Button
        onPress={() => {
          dispatch(decrementPart(part));
          dispatch(updateParts());
        }}
        icon="minus"
      />
      <Text style={styles.quantity}>
        {part.quantityCollectorPart} sur {part.quantityPart}
      </Text>
      <Button
        onPress={() => {
          dispatch(incrementPart(part));
          dispatch(updateParts());
        }}
        icon="plus"
      />
      <Button
        onPress={() => {
          dispatch(completePart(part));
          dispatch(updateParts());
        }}
        icon="check"
      />
    </Stack>
  );
};

type QuantityProps = {
  part: Part;
};

const styles = StyleSheet.create({
  stackQuantity: {
    backgroundColor: '#fff9c4',
    borderRadius: 6,
  },
  quantity: {
    paddingTop: 7,
  },
});

export default Quantity;
