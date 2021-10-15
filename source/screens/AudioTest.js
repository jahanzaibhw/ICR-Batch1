import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import AudioRecorder from './audio/Recorder'
import AudioPlayer from './audio/Player'

export default class AudioTest extends Component {

    state = {
        recordedFile: null
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

                <AudioRecorder
                    ref={ref => this.audioRecorder = ref}
                    onAudioSelected={(filePath) => {
                        this.setState({ recordedFile: filePath })
                    }}
                />

                <AudioPlayer
                    ref={ref => this.audioPlayer = ref}
                />

                <TouchableOpacity style={{ padding: 10, marginVertical: 10 }}
                    onPress={() => this.handleOnStartRecording()}
                >
                    <Text style={{ fontSize: 18 }}>
                        Record Voice Note
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ padding: 10, marginVertical: 10 }}
                    onPress={() => this.handleOnPlayRecording()}
                >
                    <Text style={{ fontSize: 18 }}>
                        Play Voice Note
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }

    handleOnStartRecording() {
        this.audioRecorder.showModal()
    }

    async handleOnPlayRecording() {
        const { recordedFile } = this.state

        if (recordedFile) {
            this.audioPlayer.showModal(recordedFile)
        }
    }
}
