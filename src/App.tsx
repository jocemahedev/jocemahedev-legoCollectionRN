/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import store from './redux';
import AppNavigatorStack from './AppNavigatorStack';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigatorStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
