import React from 'react';
import {View} from 'react-native';
import UserAuthentification from '../components/UserAuthentification';

export default function ({navigation}: any) {
  const goToCollection = () => {
    navigation.navigate('CollectionScreen');
  };

  return (
    <View>
      <UserAuthentification current="login" redirect={goToCollection} />
    </View>
  );
}
