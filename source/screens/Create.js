import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import Routes from '../data/remote/Routes'
import WebHandler from '../data/remote/WebHandler'

export default class Create extends Component {

    state = {
        name: "",
        salary: "",
        age: "",

        isLoading: false
    }

    render() {
        const { name, salary, age, isLoading } = this.state
        return (
            <View style={{ flex: 1, padding: 10, justifyContent: "center" }}>

                <View style={{ padding: 10 }}>

                    <TextInput
                        style={{ ...styles.inputBG }}
                        placeholder={"Name"}
                        value={name}
                        onChangeText={(text) => { this.setState({ name: text }) }}
                    />

                    <TextInput
                        style={{ ...styles.inputBG }}
                        placeholder={"Salary"}
                        value={salary}
                        onChangeText={(text) => { this.setState({ salary: text }) }}
                    />

                    <TextInput
                        style={{ ...styles.inputBG }}
                        placeholder={"Age"}
                        value={age}
                        onChangeText={(text) => { this.setState({ age: text }) }}
                    />

                    {isLoading &&
                        <ActivityIndicator size={"large"} color={"red"} />
                    }
                    {!isLoading &&
                        < TouchableOpacity style={{ ...styles.btnBG }}
                            onPress={() => this.handleOnCreate()}>
                            <Text style={{ color: "#fff" }}>
                                {"Create"}
                            </Text>
                        </TouchableOpacity>
                    }

                </View>

            </View >
        )
    }


    handleOnCreate() {
        const { name, age, salary } = this.state

        if (name == "") {
            alert("empty field not allowed")
            return
        }
        this.setState({ isLoading: true })
        const webHandler = new WebHandler()

        const bodyParams = { name: name, salary: salary, age: age }

        webHandler.sendPostDataRequest(Routes.LOGIN, bodyParams, (resp) => {
            alert(resp.message)
            this.setState({ isLoading: false })
        }, (errorData) => {
            alert("error")
            this.setState({ isLoading: false })
        })
    }
}


const styles = StyleSheet.create({
    inputBG: {
        borderBottomColor: "#ccc", borderBottomWidth: 1, paddingVertical: 0, marginVertical: 10
    },
    btnBG: {
        borderRadius: 7, backgroundColor: "green", paddingVertical: 10, marginVertical: 10,
        alignItems: "center"
    }
})