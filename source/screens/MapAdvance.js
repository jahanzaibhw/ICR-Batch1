import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import MapView, { Polyline, Circle, Marker, PROVIDER_GOOGLE, ProviderPropType, } from 'react-native-maps';
import { check, request, checkMultiple, requestMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions'
import GeoLocation from 'react-native-geolocation-service'

const LAT_DELTA = 0.0060, LNG_DELTA = 0.0060
export default class MapAdvance extends Component {
    constructor() {
        super()
        this.state = {
            currentLat: 28.4212,
            currentLng: 70.2989,

            shops: []

        }
    }
    async checkForLocationPermission(onResult) {
        const locPerms = [
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION
        ]
        try {
            let result = await checkMultiple(locPerms)
            let gCount = locPerms.filter(p => result[p] == "granted").length
            if (gCount == locPerms.length) {
                onResult(true)
            } else {
                let result2 = await requestMultiple(locPerms)
                let rCount = locPerms.filter(p => result2[p] == "granted").length
                onResult(rCount == locPerms.length)
            }
        } catch (error) {
            console.log(error)
            onResult(false)
        }
    }
    loadCurrentLocation() {
        this.checkForLocationPermission((isAllowed) => {
            if (isAllowed) {
                GeoLocation.getCurrentPosition((position) => {
                    this.setState({
                        currentLat: position.coords.latitude,
                        currentLng: position.coords.longitude,
                    })
                }, (error) => {
                    console.log(error)
                }, { enableHighAccuracy: true })
            } else {
                console.log("permission not allowed")
            }
        })
    }
    render() {
        const { currentLat, currentLng, shops } = this.state

        let polyLines = []
        shops.map((s) => {
            polyLines.push({ latitude: s.lat, longitude: s.lng })
        })

        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={styles.back_Icon_View}>
                    <TouchableOpacity style={styles.back_Icon_Touch} onPress={() => this.props.navigation.navigate('Home_Screen')}>
                        {/* <Back_Icon name='arrow-back' size={25} /> */}
                        <Text>{"Back"}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.back_Icon_View1}>
                    <TouchableOpacity style={styles.back_Icon_Touch1} onPress={() => this.loadCurrentLocation()}>
                        {/* <Location name='my-location' size={25} /> */}
                        <Text>{"Location"}</Text>
                    </TouchableOpacity>
                </View>
                <MapView
                    style={{ flex: 1 }}
                    region={{
                        latitude: currentLat,
                        longitude: currentLng,
                        latitudeDelta: LAT_DELTA,
                        longitudeDelta: LNG_DELTA,
                    }}
                    showsUserLocation={true}
                >
                    {/* <Marker
                        title={"Me"}
                        description={"some description"}
                        coordinate={{
                            latitude: currentLat,
                            longitude: currentLng,
                            latitudeDelta: LAT_DELTA,
                            longitudeDelta: LNG_DELTA,
                        }}
                    /> */}

                    <Circle
                        center={{
                            latitude: currentLat,
                            longitude: currentLng,
                            latitudeDelta: LAT_DELTA,
                            longitudeDelta: LNG_DELTA,
                        }}
                        radius={100}
                        fillColor={"red"}
                    />

                    {shops.length > 1 &&
                        <Polyline
                            coordinates={polyLines}
                        />
                    }

                    {shops.map((item, index) => {
                        return (
                            <Marker
                                key={index}
                                title={item.title}
                                description={""}
                                coordinate={{
                                    latitude: item.lat,
                                    longitude: item.lng,
                                    latitudeDelta: LAT_DELTA,
                                    longitudeDelta: LNG_DELTA,
                                }}
                                pinColor={item.color}
                            />
                        )
                    })}
                </MapView>

                <View style={{ height: 250, elevation: 10, backgroundColor: '#FDFDFD' }}>
                    <View style={{ borderBottomWidth: 1.5, marginHorizontal: 20, borderBottomColor: '#EEEFF2' }}>
                        <Text style={{ alignSelf: 'center', padding: 10, fontWeight: 'bold', color: '#5B5B5B' }}>Move pin to adjust pickup point</Text>
                    </View>
                    <View style={{ marginTop: 20, marginLeft: 20, }}>
                        <TouchableOpacity style={{ backgroundColor: "red", marginRight: 20, padding: 10 }}
                            onPress={() => {
                                //API call 
                                this.setState({
                                    shops: [
                                        {
                                            title: "shop no 1",
                                            lat: 28.4212,
                                            lng: 70.2989,
                                            color: "red"
                                        },
                                        {
                                            title: "shop no 2",
                                            lat: 28.4312,
                                            lng: 70.3989,
                                            color: "yellow"
                                        },
                                        // {
                                        //     title: "shop no 2",
                                        //     lat: 29.5212,
                                        //     lng: 70.6989,
                                        // },
                                    ]
                                })
                            }}
                        >
                            <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', color: '#fff' }}>Show multiple markers</Text>
                        </TouchableOpacity>
                    </View>
                    <View >
                        <TouchableOpacity style={{ marginHorizontal: 20, marginTop: 20, flexDirection: 'row', alignItems: 'center', backgroundColor: '#E6E8EC' }}>
                            {/* <Location name='my-location' size={20} style={{ borderRightWidth: 1, padding: 15, borderRightColor: '#EEEFF2' }} /> */}
                            <Text style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 10 }}>Radius</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={{ marginTop: 20, marginHorizontal: 20, backgroundColor: "green", padding: 10 }}
                            onPress={() => {
                                //API call 
                                this.setState({
                                    shops: [
                                        {
                                            title: "shop no 1",
                                            lat: 28.4212,
                                            lng: 70.2989,
                                            color: "red"
                                        },
                                        {
                                            title: "shop no 2",
                                            lat: 28.4312,
                                            lng: 70.3989,
                                            color: "yellow"
                                        },
                                        {
                                            title: "shop no 3",
                                            lat: 29.5212,
                                            lng: 70.6989,
                                        },
                                    ]
                                })
                            }}
                        >
                            <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                                Poly Lines
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    back_Icon_View: {
        position: 'absolute',
        zIndex: 1
    },
    back_Icon_Touch: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 40,
        marginTop: 10,
        marginLeft: 10,
    },
    back_Icon_View1: {
        position: 'absolute',
        zIndex: 1,
        bottom: 300,
        right: 20
    },
    back_Icon_Touch1: {
        backgroundColor: '#E6E8EC',
        padding: 10,
        borderRadius: 40,
        marginTop: 10,
        marginLeft: 10,
    },
})