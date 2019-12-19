/**
 * GitHub Api App
 * (c) Minna Hannula, 11/2019
 * Navigation between home and commit screens
 */

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Repos from './src/components/Repos';
import Commit from './src/components/Commits';

const MainNavigator = createStackNavigator(
  {
    Home: {screen: Repos},
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