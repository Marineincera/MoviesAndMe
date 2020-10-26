import 'react-native-gesture-handler';
import * as React from 'react';
 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
 
import Search from './components/Search'
import FilmDetail from './components/FilmDetail'
 
const Stack = createStackNavigator();
 
export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Search" component={Search} options={{ title: 'Search' }}/>
  <Stack.Screen name="FilmDetail" component={FilmDetail}></Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
    )
}