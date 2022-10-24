import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {setCurrentCollection} from '../redux/collection';

export default function ({navigation}) {
  const dispatch = useDispatch();
  const goTo = () => {
    dispatch(
      setCurrentCollection({
        id: '1',
        idSets: '12345',
      }),
    );
    navigation.navigate('CollectionScreen');
  };

  return (
    <View style={styles.container}>
      <Button onPress={() => goTo()} title={`go to Collection`} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'azure',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
