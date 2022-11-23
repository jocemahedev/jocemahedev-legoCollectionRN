import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {useReduxDispatch} from '../../redux';
import {setCurrentCompleteFilter} from '../../redux/set';
import {SegmentedButtons} from 'react-native-paper';

export default function CompletePartsFilter() {
  const dispatch = useReduxDispatch();
  const [completeFilter, setCompleteFilter] = useState<
    'none' | 'complete' | 'incomplete'
  >('none');
  const [value, setValue] = useState('');
  useEffect(() => {
    console.log('completeFilter');
    dispatch(setCurrentCompleteFilter(completeFilter));
  }, [dispatch, completeFilter]);
  const completeFilterHandler = (
    filterComplete: 'none' | 'complete' | 'incomplete',
  ): void => {
    if (completeFilter === filterComplete) {
      setCompleteFilter('none');
    } else {
      setCompleteFilter(filterComplete);
    }
  };
  const segmentedButtonHandler = (newValue: string): void => {
    if (value === newValue) {
      setValue('');
    } else {
      setValue(newValue);
    }
  };
  return (
    <ScrollView horizontal>
      <SegmentedButtons
        value={value}
        onValueChange={segmentedButtonHandler}
        buttons={[
          {
            value: 'complete',
            label: 'Complete parts',
            onPress: () => completeFilterHandler('complete'),
          },
          {
            value: 'incomplete',
            label: 'Incomplete parts',
            onPress: () => completeFilterHandler('incomplete'),
          },
        ]}
      />
    </ScrollView>
  );
}
