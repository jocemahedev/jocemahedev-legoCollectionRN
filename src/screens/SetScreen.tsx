import {TextInput} from '@react-native-material/core';
import React, {useState} from 'react';

import {View, Button} from 'react-native';
import SetSearchResult from '../components/SetSearchResult';

export default function () {
  const [text, setText] = useState('');
  const [viewResult, setViewResult] = useState('');

  return (
    <>
      <View>
        <TextInput
          onChangeText={setText}
          value={text}
          placeholder="Type Set Number like 31120"
        />
        <Button
          onPress={() => {
            setViewResult(text);
          }}
          title={'Search Set'}
        />
      </View>
      {viewResult && <SetSearchResult setIdLego={viewResult} />}
    </>
  );
}
