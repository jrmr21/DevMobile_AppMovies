import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import PageSearch from '../Pages/PageSearch'
import FilmDetail from '../Components/FilmDetail'
import PageFavorites from '../Pages/PageFavorites'
import PageHome from '../Pages/PageHome'
import PageCalendar from '../Pages/PageCalendar'
import { StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';



const FilmDetailNavigator = createStackNavigator(
    {
        FilmDetail: {
            screen: FilmDetail,
        },
        PageCalendar: {
            screen: PageCalendar,
        },
    },
    {
        initialRouteName    : 'FilmDetail',
    }
);



const HomeStackNavigator = createStackNavigator({
    PageHome: {
        screen: PageHome,
    },
    FilmDetail: {
        screen: FilmDetailNavigator,
    },
})

const SearchNavigator = createStackNavigator({

    
    PageSearch: {
        screen: PageSearch,
    },
    FilmDetail: {
        screen: FilmDetailNavigator,
    },
});

const FavoritesStackNavigator = createStackNavigator({
   
    PageFavorites: {
        screen: PageFavorites,
    },
    FilmDetail: {
        screen: FilmDetailNavigator,
    },
})


/*
const CalendarStackNavigator = createStackNavigator({
    PageCalendar: {
        screen: PageCalendar,
    },
})*/

const MoviesTabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeStackNavigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Icon size={25} color={styles.iconColor.color} name={'ios-home'} />
                }
            }
        },
        Search: {
            screen: SearchNavigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Icon size={25} color={styles.iconColor.color} name={'ios-search'} />
                }
            }
        },
        Favorites: {
            screen: FavoritesStackNavigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Icon size={25} color={styles.iconColor.color} name={'ios-heart'} />
                }
            }
        },
        /*Calendar: {
            screen: CalendarStackNavigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Icon size={25} color={styles.iconColor.color} name={'ios-calendar'} />
                }
            }
        }*/
    },
    {
        tabBarOptions: {
            showLabel: false,
            showIcon: true,
            activeBackgroundColor: '#5e5e5e',
            inactiveBackgroundColor: '#303030',
            

        }
    }
)

const styles = StyleSheet.create({
    iconColor : {
        color : "#fff",
    }
})
export default createAppContainer(MoviesTabNavigator) 