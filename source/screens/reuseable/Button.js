import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import ReducersProps from '../../data/local/reducers/ReducersProps'

const Button = ({ title, onPress, theme, bgStyle, }) => {
    return (
        <TouchableOpacity style={{}} onPress={() => onPress && onPress()}>
            <View style={{ backgroundColor: theme.btnColor, padding: 10, ...bgStyle }}>
                <Text style={{}}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>

    )
}

export default connect(ReducersProps, null)(Button)
