import React from 'react'
import {Animated} from 'react-native'

export default class ShareAnimated extends React.Component {

    constructor(props){

        super(props),
        this.state = {
            topPosition: new Animated.Value(0)
        }
    }

    componentDidMount(){
        Animated.timing(
            this.state.topPosition,
            {
                toValue: 80,
                duration: 3000
            }
        ).start()
    }

    render(){
        return (
            <Animated.View style={{top: this.state.topPosition}}>
                {this.props.children}
            </Animated.View>
        )
    }
}

