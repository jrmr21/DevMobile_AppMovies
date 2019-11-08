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
            backgroundColor: '#303030',
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
        console.log("Refreshing favorite");
        this.setState({ refreshing: true });
        this.props.actions.initFilmsFavorite();
        this.setState({ refreshing: false });
    }

    render() {

        return (

            <View style={{ flex: 1, backgroundColor: '#383838' }}>
                <NavigationEvents onDidFocus={() => this.refresh()} />
                <FlatList
                   
                    data={this.props.favoritesFilm}//affiche les données la première fois
                    extraData={this.props.favoritesFilm}//lie les datas au reducer pour qu'elles puissent être mises à jour
                    renderItem={( element ) => (
                        <FilmItem
                            key={element.item}
                            filmID={element.item}
                            isFilmFavorite={true}//cherche si le film fait partie des films favoris et on affiche un petit coeur si oui
                            navigation={this.props.navigation}
                            choix = {0} //recuperer le choix depuis le storage
                        />

                    )}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (!this.props.faviriteList && this.props.page < this.props.totalPages) {
                            this.props.loadFilms()
                        }
                    }}
                />

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

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#383838'
    }
})