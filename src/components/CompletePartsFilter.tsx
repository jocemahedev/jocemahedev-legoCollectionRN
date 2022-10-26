import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Chip} from '@react-native-material/core';
import {useReduxDispatch} from '../redux';
import {setCurrentCompleteFilter} from '../redux/set';

export default function CompletePartsFilter() {
  const dispatch = useReduxDispatch();
  const [completeFilter, setCompleteFilter] = useState<
    'none' | 'complete' | 'incomplete'
  >('none');

  useEffect(() => {
    console.log('completeFilter');
    dispatch(setCurrentCompleteFilter(completeFilter));
  }, [dispatch, completeFilter]);
  const completeFilterHandler = (
    filterComplete: 'none' | 'complete' | 'incomplete',
  ): void => {
    setCompleteFilter(filterComplete);
  };
  return (
    <ScrollView horizontal>
      <TouchableOpacity>
        <Chip
          label={'No filter'}
          color={'#000'}
          key={'none'}
          onPress={() => completeFilterHandler('none')}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Chip
          label={'Complete Parts only'}
          color={'#000'}
          key={'complete'}
          onPress={() => completeFilterHandler('complete')}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Chip
          label={'Incomplete Parts only'}
          color={'#000'}
          key={'incomplete'}
          onPress={() => completeFilterHandler('incomplete')}
        />
      </TouchableOpacity>
    </ScrollView>
  );
}
