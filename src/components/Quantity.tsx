import {IconButton, Stack} from '@react-native-material/core';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Part} from '../types/types';
import {decrementPart, fetchParts, incrementPart} from '../redux/set';
import {useReduxDispatch} from '../redux';

const Quantity = ({part}: QuantityProps) => {
  const dispatch = useReduxDispatch();
  return (
    <Stack direction="row" spacing={1} style={styles.stackQuantity}>
      <IconButton
        onPress={() => {
          dispatch(decrementPart(part));
          dispatch(fetchParts());
        }}
        icon={<Text>-</Text>}
      />
      <Text style={styles.quantity}>
        {part.quantityCollectorPart} sur {part.quantityPart}
      </Text>
      <IconButton
        onPress={() => {
          dispatch(incrementPart(part));
          dispatch(fetchParts());
        }}
        icon={<Text>+</Text>}
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
    paddingTop: 15,
  },
  all: {
    paddingTop: 15,
    paddingRight: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Quantity;
