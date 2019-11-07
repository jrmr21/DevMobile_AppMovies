import React from 'react'
import {View,Text,Image,StyleSheet,TouchableOpacity} from 'react-native'

class FilmHome extends React.Component {

    render () {

        return(

            <View style={{height:250, width:130, marginLeft:10}}>
                <View style={{flex:8}}>                    
                        <Image
                            style={{flex:1, height: null,width: null,resizeMode: 'cover'}}
                            source={{uri: this.props.image}} 
                        />                  
                </View>
                <View style={{flex:1, paddingTop:1, paddingBottom:1}}>
                    <Text style={{fontSize:12, color:'#DCDCDC',textAlign: 'center'}}>{this.props.title}</Text>
                </View>
                    
            </View>
        )
    }
}

export default FilmHome

const styles = StyleSheet.create({
    film:{

        margin: 2
    },
    text_title:{
        fontSize: 10,
        textAlign: 'center',
        color: '#DCDCDC'
    },
    image:{
        height:300,
        width: 70
    }
    
})