import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import TrackPlayer from 'react-native-track-player';
import Modal from 'react-native-modalbox'

export default class Player extends Component {

    state = {

    }

    render() {
        return (
            <Modal
                style={styles.modalBG}
                isOpen={false}
                backButtonClose={true}
                backdropPressToClose={true}
                swipeToClose={false}
                coverScreen={true}
                ref={ref => this.modalref = ref}
                position="center"
            >
                <View style={{ ...styles.container, backgroundColor: "#fff", }}>
                    <TouchableOpacity style={{ padding: 10, marginVertical: 10 }}
                        onPress={() => this.cancelModal()}
                    >
                        <Text style={{ fontSize: 18 }}>
                            Cancel
                    </Text>
                    </TouchableOpacity>

                </View>
            </Modal>
        )
    }

    async playAudio(recordedFile) {
        if (recordedFile) {
            // Set up the player
            await TrackPlayer.setupPlayer();

            // Add a track to the queue
            await TrackPlayer.add({
                //id: 'trackId',
                url: recordedFile,
                // title: 'Track Title',
                // artist: 'Track Artist',
                // artwork: require('track.png')
            });

            // Start playing it
            await TrackPlayer.play();

        }
    }

    showModal(filePath) {
        this.modalref.open()

        this.playAudio(filePath)
    }

    cancelModal() {
        let { isRecording } = this.state
        if (isRecording) {
            SoundRecorder.stop()
            this.resetRecorder()
        }
        this.modalref.close()
    }
}

const styles = StyleSheet.create({
    modalBG: { backgroundColor: "rgba(0,0,0,0.3)", padding: 25, justifyContent: "center" },
    container: { borderRadius: 10, overflow: "hidden" },
})