import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import ReducersProps from '../../data/local/reducers/ReducersProps'

const Header = ({ title, onPress, theme }) => {

    return (
        <View style={{ backgroundColor: theme.background }}>
            <TouchableOpacity onPress={() => onPress && onPress()}>
                <Text>Go Back</Text>
            </TouchableOpacity>
            <Text>
                {title}
            </Text>
        </View>
    )
}

export default connect(ReducersProps, null)(Header)
