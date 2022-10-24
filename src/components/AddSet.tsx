import {Button} from '@react-native-material/core';
import React from 'react';

import {useReduxDispatch} from '../redux';
import {addSet} from '../redux/collection';

import {RebrickableSet} from '../redux/services/rebrickable/type';

const AddSet = ({previewSet}: AddSetProps) => {
  const dispatch = useReduxDispatch();

  return (
    <Button title="Add SET" onPress={() => dispatch(addSet(previewSet))} />
  );
};

type AddSetProps = {
  previewSet: RebrickableSet;
};

export default AddSet;
