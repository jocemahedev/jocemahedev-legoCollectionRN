import {Button, Text, TextInput} from '@react-native-material/core';
import React, {useState} from 'react';

import {View} from 'react-native';
import SetSearchResult from '../components/Set/SetSearchResult';
import {useReduxDispatch, useReduxSelector} from '../redux';
import {countSets, setAddSetStatus} from '../redux/collection';

export default function () {
  const [text, setText] = useState('');
  const [viewResult, setViewResult] = useState('');
  const [viewSearchVisible, setviewSearchVisible] = useState(true);
  const dispatch = useReduxDispatch();
  const numberSets = useReduxSelector(countSets);
  return (
    <>
      <View>
        <Text>{'You have ' + numberSets + ' set(s)'}</Text>
        {!viewSearchVisible && (
          <Button
            onPress={() => {
              dispatch(setAddSetStatus('none'));
              setviewSearchVisible(true);
              setText('');
              setViewResult('');
            }}
            title={'Search New Set'}
          />
        )}
        {viewSearchVisible && (
          <>
            <TextInput
              onChangeText={setText}
              value={text}
              placeholder="Type Set Number like 31120"
            />
            <Button
              onPress={() => {
                setViewResult(text);
                setviewSearchVisible(false);
              }}
              title={'Search Set'}
              disabled={text.length <= 0}
            />
          </>
        )}
      </View>
      {viewResult && <SetSearchResult setIdLego={viewResult} />}
    </>
  );
}
