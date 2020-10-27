import 'react-native-gesture-handler';
import * as React from 'react';
 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
 
import Search from './Components/Search'
import FilmDetail from './Components/FilmDetail'
import  Store from './Store/configureStore'
import { Provider } from 'react-redux';
 
const Stack = createStackNavigator();
 
export default function App() {
    return(
      <Provider store={Store}>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Search" component={Search} options={{ title: 'Search' }}/>
  <Stack.Screen name="FilmDetail" component={FilmDetail}></Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
    )
  }
