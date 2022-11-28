import {Button, Stack, Text, TextInput} from '@react-native-material/core';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import CountSets from '../components/Set/CountSets';
import SetSearchResult from '../components/Set/SetSearchResult';
import {useReduxDispatch} from '../redux';
import { setAddSetStatus} from '../redux/collection';

export default function () {
  const [text, setText] = useState('');
  const [viewResult, setViewResult] = useState('');
  const [viewSearchVisible, setviewSearchVisible] = useState(true);
  const dispatch = useReduxDispatch();

  return (
    <>
      <View>
        <Stack style={styles.stack}>
          <CountSets />
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
        </Stack>
      </View>
      {viewResult && <SetSearchResult setIdLego={viewResult} />}
    </>
  );

}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    //margin: 30,
    //flex: 1,
    backgroundColor: 'azure',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  stack: {
    flexGrow: 1,
    margin: 30,
    marginTop: 15,
    justifyContent: 'space-between',
  },
});
