import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CollectionScreen from './screens/CollectionScreen';
import HomeScreen from './screens/HomeScreen';
import SetScreen from './screens/SetScreen';
import PartsScreen from './screens/PartsScreen';
import {RootStackParamList} from './types/types';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigatorStack() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="HomeScreen" component={HomeScreen} />
      <RootStack.Screen name="CollectionScreen" component={CollectionScreen} />
      <RootStack.Screen name="SetScreen" component={SetScreen} />
      <RootStack.Screen name="PartsScreen" component={PartsScreen} />
    </RootStack.Navigator>
  );
}
