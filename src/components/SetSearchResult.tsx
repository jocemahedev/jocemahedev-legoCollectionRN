import {Surface, Text} from '@react-native-material/core';
import {Image} from '@rneui/base';
import React from 'react';
import {StyleSheet, View} from 'react-native';

import {useGetSetByIdLegoQuery} from '../redux/services/rebrickable/rebrickable';
import AddSet from './AddSet';

const SetSearchResult = ({setIdLego}: SetSearchResultProps) => {
  const {data, isLoading, error} = useGetSetByIdLegoQuery(setIdLego + '-1');
  console.log('data is ');
  console.log(data);
  console.log('error');
  console.log(error);
  console.log('loading is ');
  console.log(isLoading);
  return (
    <View style={styles.container}>
      {error && (
        <Text>
          {'set number: ' + setIdLego + ' ' + error.data.detail}[{error.status}]
        </Text>
      )}
      {!error && data && (
        <>
          <Text>{data?.name}</Text>
          <Text>{data?.set_num}</Text>
          <Text>{data?.num_parts} parts</Text>
          <Surface elevation={2} category="medium">
            <Image source={{uri: data?.set_img_url}} style={styles.stretch} />
          </Surface>
          <AddSet previewSet={data} />
        </>
      )}
    </View>
  );
};

type SetSearchResultProps = {
  setIdLego: string;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'azure',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  stretch: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});

export default SetSearchResult;
