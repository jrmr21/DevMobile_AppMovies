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
            backgroundColor: '#383838',
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
            isLoading:false
        };

    async componentDidMount() {
        this.props.actions.initFilmsFavorite();
    }

    _loadFilms() {
        console.log("page fav props", this.props.favoritesFilm);
        //on execute la fonct de rech sur api et on modifie le state avec le resultat de la recherche
        this.setState({ isLoading: true })
        this.props.servMovies.getFilmWithID(this.props.favoritesFilm).then(data => {
            this.setState({
                films: [...this.state.films, ...data.results],
                isLoading: false
            })
            this.props.favoritesFilm.initFilmsFavorite();
            console.log("state favorite", this.state);
        }).catch(console.log("ERROR GETTING FAVORITE FILM WITH ID FROM API", this.props.favoritesFilm[0]))

    }

    refresh() {
        this.setState({ refreshing: true });
        this.props.actions.initFilmsFavorite();
        this._loadFilms();
        console.log("page fav props", this.props.favoritesFilm[0]);
        this.setState({ refreshing: false });
        /*AsyncStorage.getItem('cities').then((data) => {
            this.props.navigation.setParams({ count: JSON.parse(data).length });
            //this.setState({ cities: JSON.parse(data).sort(), refreshing: false });
            this.props.actions.loadCities(JSON.parse(data));
            this.setState({ refreshing: false });
        });*/
        //this.setState({cities: this.props.cities});
    }

    render() {

        return (

            <View style={styles.container}>
                {/* <NavigationEvents onDidFocus={() => this.refresh()} />
                <Text>{this.props.favoritesFilm}</Text>
                <Text>{this.state.films}</Text>
                <FlatList data={this.props.favoritesFilm}
                    refreshControl={<RefreshControl refreshing={this.state.refreshing}
                        onRefresh={() => this.refresh()} />}
                    renderItem={(element) => (
                        <View>
                            <FilmItem
                                films={this.state.films}
                                navigation={this.props.navigation}
                                favoriteList={true}
                            />
                        </View>
                    )} /> */}

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