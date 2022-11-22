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
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import store from './redux';
import AppNavigatorStack from './AppNavigatorStack';

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider
        settings={{
          icon: props => <AwesomeIcon {...props} />,
        }}>
        <NavigationContainer>
          <AppNavigatorStack />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
