import React from 'react'
import { connect } from 'react-redux'
import { View,Text } from 'react-native'
import { bindActionCreators } from 'redux';
import { initAsync } from '../Store/Actions/FilmsAction';


class Initialization extends React.Component {

    componentDidMount(){
        this.props.actions.initFilmsFavorite();
    }
    render() {

        return (<View></View>)
    }

}


  
  const mapStateToActions = (payload) => ({
    actions: {
        initFilmsFavorite: bindActionCreators(initAsync, payload),
    }
  })
  
  export default connect(null, mapStateToActions)(Initialization);