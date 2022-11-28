import {Text} from '@react-native-material/core';
import React, {useEffect, useState} from 'react';
import {Switch} from 'react-native-paper';
import {useReduxDispatch} from '../../redux';
import {setOnlyMinifig} from '../../redux/set';

export default function OnlyMinifigFilter() {
  const dispatch = useReduxDispatch();

  const [minifigFilter, setMinifigFilter] = useState<boolean>(false);

  useEffect(() => {
    dispatch(setOnlyMinifig(minifigFilter));
  }, [dispatch, minifigFilter]);

  const minifigFilterHandler = (filterMinifig: boolean): void => {
    setMinifigFilter(filterMinifig);
  };

  return (
    <>
      <Text>{'Only Minifig'}</Text>
      <Switch value={minifigFilter} onValueChange={minifigFilterHandler} />
    </>
  );
}
