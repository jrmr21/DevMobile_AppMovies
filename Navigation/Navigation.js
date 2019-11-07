import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import PageSearch from '../Pages/PageSearch'
import FilmDetail from '../Components/FilmDetail'
import PageFavorites from '../Pages/PageFavorites'
import PageHome from '../Pages/PageHome'
import PageCalendar from '../Pages/PageCalendar'
import { Image, StyleSheet } from 'react-native'
import React from 'react'

const HomeStackNavigator = createStackNavigator({
    PageHome: {
        screen: PageHome,
    },
    FilmDetail: {
        screen: FilmDetail,
    }

})

const SearchNavigator = createStackNavigator({

    
    PageSearch: {
        screen: PageSearch,
    },
    FilmDetail: {
        screen: FilmDetail,
    }

});

const FavoritesStackNavigator = createStackNavigator({
   
    PageFavorites: {
        screen: PageFavorites,
    },
    FilmDetail: {
        screen: FilmDetail
    }
})


const CalendarStackNavigator = createStackNavigator({
    PageCalendar: {
        screen: PageCalendar,
    },
})

const MoviesTabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeStackNavigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image
                        source={require('../assets/Accueil.png')}
                        style={styles.icon} />
                }
            }
        },
        Search: {
            screen: SearchNavigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image
                        source={require('../assets/Search.png')}
                        style={styles.icon} />
                }
            }
        },
        Favorites: {
            screen: FavoritesStackNavigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image
                        source={require('../assets/FavorisAcc.png')} 
                        style={styles.iconFav} />
                }
            }
        },
        Calendar: {
            screen: CalendarStackNavigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image
                        source={require('../assets/calend.png')}
                        style={styles.icon} />
                }
            }
        }
    },
    {
        tabBarOptions: {
            showLabel: false,
            showIcon: true,
            activeBackgroundColor: '#708090',
            inactiveBackgroundColor: '#DCDCDC',
            

        }
    }
)

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    },
    iconFav:{
        width: 40,
        height: 40
    }
})
export default createAppContainer(MoviesTabNavigator) 