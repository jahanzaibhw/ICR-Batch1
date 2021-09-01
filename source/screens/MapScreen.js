import React, { Component } from 'react'
import { Text, View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { check, request, checkMultiple, requestMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions'
import GeoLocation from 'react-native-geolocation-service'

const LAT_DELTA = 0.0015, LNG_DELTA = 0.0021

export default class MapScreen extends Component {

    state = {
        currentLat: 37.78825,
        currentLng: -122.4324
    }

    render() {
        const { currentLat, currentLng } = this.state
        return (
            <View style={{ flex: 1 }}>
                <MapView
                    // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={{ flex: 1 }}
                    region={{
                        latitude: currentLat,
                        longitude: currentLng,
                        latitudeDelta: LAT_DELTA,
                        longitudeDelta: LNG_DELTA,
                    }}
                    onMapReady={() => { this.loadCurrentLocation() }}
                >
                    <Marker
                        title={"Me"}
                        description={"some description"}
                        coordinate={{
                            latitude: currentLat,
                            longitude: currentLng,
                            latitudeDelta: LAT_DELTA,
                            longitudeDelta: LNG_DELTA,
                        }}
                    />
                </MapView>
            </View>
        )
    }

    async checkForLocationPermission(onResult) {
        // const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        // if (result === "granted") {
        //     onResult(true)
        // } else {
        //     const reqResult = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        //     if (reqResult === "granted") {
        //         onResult(true)
        //     } else {
        //         onResult(false)
        //     }
        // }
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
}
