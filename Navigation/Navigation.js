
import Search from '../Components/Search'
import { createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation'
import FilmDetail from '../Components/FilmDetail'

const SearchStackNavigator = createStackNavigator({
    Search : {
        screen: Search,
        navigationOptions: {
            title: 'Rechercher'
        }
    },
    FilmDetail: {
        screen: FilmDetail
    }
})

const MoviesTabNavigator = createBottomTabNavigator({
    Search: {
        screen: Search
    },
    Favorites: {
        screen: Favorites
    }
})


export default createAppContainer(MoviesTabNavigator)