/**
 * GitHub Api App
 * (c) Minna Hannula, 11/2019
 * Navigation between home and commit screens
 */

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './src/screens/Home';
import Commit from './src/screens/Commit';

const MainNavigator = createStackNavigator(
  {
    Home: {screen: Home},
    Commit: {screen: Commit},
  },
  {
    defaultNavigationOptions: {
      header: null
    },
  }
);

const App = createAppContainer(MainNavigator);

export default App;