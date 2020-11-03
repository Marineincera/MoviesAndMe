
import * as React from 'react';
 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
 
import Search from './Components/Search'
import FilmDetail from './Components/FilmDetail'
import  Store from './Store/configureStore'
import { Provider } from 'react-redux';
import Favorites from './Components/Favorites';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import{ Icon } from 'react-native-elements';
const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();
function Home() {
  return (   
    <Tab.Navigator  screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Search') {
          iconName = 'search';
        } else if (route.name === 'Favorites') {
          iconName = 'favorite';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      activeBackgroundColor: '#DDDDDD',
      inactiveBackgroundColor: '#FFFFFF',
      showLabel: false
    }}>
    <Tab.Screen name="Search" component={Search}  />
    <Tab.Screen  name="Favorites" component={Favorites}/>
  </Tab.Navigator>
  );
}
 
export default function App() {
    return(
      <Provider store={Store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Search" component={Search} options={{ title: 'Search' }}/>
            <Stack.Screen name="FilmDetail" component={FilmDetail}  options={{ title: 'FilmDetail' }}/>
        </Stack.Navigator>       
      </NavigationContainer>
    </Provider>
    )
  }
