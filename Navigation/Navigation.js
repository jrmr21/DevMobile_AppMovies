import {createAppContainer} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createStackNavigator} from 'react-navigation-stack'
import Search from '../Pages/PageSearch';
import FilmDetail from '../Components/FilmDetail'
import Favorites from '../Pages/PageFavorites'
import {Image, StyleSheet} from 'react-native'
import React from 'react' 

const SearchNavigator = createStackNavigator({

    Search: {
        screen: Search,
    },
    FilmDetail: {
        screen: FilmDetail,
    }

});

const FavoritesStackNavigator = createStackNavigator({
    Favorites: {
      screen: Favorites,
    },
    FilmDetail: {
      screen: FilmDetail
    }
  })

const MoviesTabNavigator = createBottomTabNavigator (
    {
        Search:{
            screen: SearchNavigator,
            navigationOptions:{
                tabBarIcon:() => {
                    return <Image 
                        source = {require('../assets/Search.png')}
                        style = {styles.icon} />
                }
            }
        },
        Favorites:{
            screen:FavoritesStackNavigator,
            navigationOptions:{
                tabBarIcon:() => {
                    return <Image 
                        source = {require('../assets/Favoris.png')}
                        style = {styles.icon} />
                }
            }
        }
    },
    {
        tabBarOptions:{
            showLabel: false,
            showIcon: true,
            activeBackgroundColor: '#A2273C',
            inactiveBackgroundColor: '#fff' 

        }
    }
)

const styles = StyleSheet.create ({
    icon:{
        width: 30,
        height: 30
    }
})
export default createAppContainer(MoviesTabNavigator) 