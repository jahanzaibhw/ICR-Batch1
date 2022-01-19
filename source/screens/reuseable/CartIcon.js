import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import ReducersProps from '../../data/local/reducers/ReducersProps';
import ReducersActions from '../../data/local/reducers/ReducersActions';

function CartIcon(props) {

    return (
        <TouchableOpacity
            onPress={() => {
                this.props.navigation.navigate("Checkout")

                props.resetCartCounter()
            }}
        >
            <Text>{props.cartReducer.counter}</Text>
        </TouchableOpacity>
    );
}

export default connect(ReducersProps, ReducersActions)(CartIcon)