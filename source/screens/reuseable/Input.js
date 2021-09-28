import React, { useState, useEffect } from 'react'
import { View, Text, TextInput } from 'react-native'

const Input = ({ bgStyle, onChange, icon }) => {

    const [value, setValue] = useState("")

    return (
        <View style={{ backgroundColor: "#fff", padding: 10, borderRadius: 7, ...bgStyle }}>

            {icon}

            <TextInput
                style={{ padding: 10 }}
                value={value}
                onChangeText={(txt) => handleonTextChange(txt)}
            />

        </View>
    )

    function handleonTextChange(txt) {
        setValue(txt)
        onChange && onChange(txt)
    }
}

export default Input
