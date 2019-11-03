import React from 'react'
import { Text, StyleSheet, View, FlatList, RefreshControl, Button } from 'react-native'
import { connect } from 'react-redux'
import { NavigationEvents } from 'react-navigation';
import FilmList from '../Components/FilmList'
import { bindActionCreators } from 'redux';
import { initAsync, deleteAsync } from '../Store/Actions/FilmsAction'
import FilmItem from '../Components/FilmItem';

class PagesFavorites extends React.Component {

    static navigationOptions = {
        title: 'Mes favoris',
        headerStyle: {
            backgroundColor: '#A2273C',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    }


    state =
        {
            films: [],
            refreshing: false,
            isLoading: false
        };

    refresh() {
        this.setState({ refreshing: true });
        this.props.actions.initFilmsFavorite();
        this.setState({ refreshing: false });
    }

    render() {

        return (

            <View style={{ flex: 1 }}>
                <NavigationEvents onDidFocus={() => this.refresh()} />
                <FlatList data={this.props.favoritesFilm}
                    refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.refresh()} />}
                    renderItem={(element) => (
                        <View>
                            <FilmItem
                                filmID={element.item}
                                navigation={this.props.navigation}
                                isFilmFavorite={true}
                            />
                        </View>
                    )} />

            </View>

        )
    }
}

//je créer cette fonction pour récupérer le state du store
const mapStateToProps = (stateStore) => {
    return {
        favoritesFilm: stateStore.toggleFavorite.favoritesFilm,
        servMovies: stateStore.theMovieDBReducer.servMovies
    }
}

const mapActionsToProps = (payload) => ({
    actions: {
        initFilmsFavorite: bindActionCreators(initAsync, payload),
        deleteFilmFavorite: bindActionCreators(deleteAsync, payload),
    }
});

export default connect(mapStateToProps, mapActionsToProps)(PagesFavorites) 