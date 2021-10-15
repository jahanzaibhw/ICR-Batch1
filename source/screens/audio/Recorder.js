import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import Modal from 'react-native-modalbox'
import SoundRecorder from 'react-native-sound-recorder';
import SLIcons from 'react-native-vector-icons/SimpleLineIcons'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { check, request, PERMISSIONS } from 'react-native-permissions'

export default class AudioRecorder extends Component {

    state = {
        isRecording: false,
        maxDuration: this.props.maxDuration ? this.props.maxDuration : 60, //in seconds
        currentDuration: 0,
    }

    componentDidMount() {

    }

    render() {
        let { isRecording, currentDuration } = this.state
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

                    <View style={{ padding: 10, backgroundColor: "green", alignItems: "center" }}>
                        <Text style={{ fontSize: 14, color: "#fff" }}>
                            {"Record a voice note"}
                        </Text>
                    </View>

                    <View style={{ padding: 10, alignItems: "center" }}>

                        <View style={{
                            borderWidth: 1, borderRadius: 100, borderColor: "#000",
                            padding: 10, margin: 10
                        }}>
                            <SLIcons name={"microphone"} color={"#000"} size={40} />
                        </View>

                        <Text style={{ color: "#ccc", fontSize: 16 }}>
                            {this.getSecAsTimeString(currentDuration)}
                        </Text>

                        <TouchableOpacity activeOpacity={0.5} style={{ padding: 0, margin: 10, marginTop: 20 }}
                            onPress={() => this.handleOnToggle()}>
                            <View style={{
                                borderWidth: 1, borderRadius: 100, borderColor: "#999",
                            }}>
                                {isRecording ?
                                    <MCIcons name={"stop"} color={"#eb4d4b"} size={48} /> :
                                    <MCIcons name={"record"} color={"#eb4d4b"} size={48} />
                                }
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ padding: 10, alignSelf: "flex-end" }}
                            onPress={() => this.cancelModal()}>
                            <Text style={{ color: "#000", fontSize: 14 }}>
                                {"Cancel"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
        )
    }

    handleOnToggle() {
        let { isRecording } = this.state
        if (isRecording) {
            this.stopRecording()
        } else {
            this.startRecording()
        }
    }

    startTimer() {
        this.clearRecordingTimer = setInterval(() => {
            let { maxDuration, currentDuration, isRecording } = this.state
            if ((currentDuration < maxDuration) && isRecording) {
                this.setState({ currentDuration: (currentDuration + 1) })
            } else {
                // clearInterval(this.clearRecordingTimer)
                this.stopRecording()
            }
        }, 1000)
    }

    getSecAsTimeString(seconds) {
        const h = parseInt(seconds / (60 * 60));
        const m = parseInt(seconds % (60 * 60) / 60);
        const s = parseInt(seconds % 60);

        let hStr = h > 0 ? ((h < 10 ? '0' + h : h) + ':') : ""
        let mStr = ((m < 10 ? '0' + m : m) + ':')
        let sStr = ((s < 10 ? '0' + s : s))

        return (`${hStr}${mStr}${sStr}`);
    }

    startRecording() {
        this.checkForMicPermission((isGranted) => {
            if (isGranted) {
                SoundRecorder.start(SoundRecorder.PATH_CACHE + `/voice_note.aac`,
                    {
                        fomat: SoundRecorder.FORMAT_AAC_ADTS,
                        quality: SoundRecorder.QUALITY_MAX,
                        encoder: SoundRecorder.ENCODER_AAC
                    }
                )
                    .then(() => {
                        console.log('started recording');
                        this.setState({ isRecording: true }, () => {
                            this.startTimer()
                        })
                    })
                    .catch((error) => {
                        console.log(error)
                        this.setState({ isRecording: false })
                    })
            }
        })
    }

    stopRecording() {
        SoundRecorder.stop()
            .then((result) => {
                this.resetRecorder()

                console.log('stopped recording, audio file saved at: ' + result.path);
                let filePath = (Platform.OS === "android") ? `file://${result.path}` : result.path

                let { onAudioSelected } = this.props
                onAudioSelected && onAudioSelected(filePath)

                this.cancelModal()
            })
            .catch((error) => {
                this.setState({ isRecording: false })
                console.log(error)
            })
    }

    resetRecorder() {
        this.setState({ isRecording: false, currentDuration: 0 })
        clearInterval(this.clearRecordingTimer)
    }

    showModal() {
        this.modalref.open()
    }

    cancelModal() {
        let { isRecording } = this.state
        if (isRecording) {
            SoundRecorder.stop()
            this.resetRecorder()
        }
        this.modalref.close()
    }

    async checkForMicPermission(onResult) {
        const result = await check(PERMISSIONS.ANDROID.RECORD_AUDIO)
        if (result === "granted") {
            onResult(true)
        } else {
            const reqResult = await request(PERMISSIONS.ANDROID.RECORD_AUDIO)
            if (reqResult === "granted") {
                onResult(true)
            } else {
                onResult(false)
            }
        }
    }
}

const styles = StyleSheet.create({
    modalBG: { backgroundColor: "rgba(0,0,0,0.3)", padding: 25, justifyContent: "center" },
    container: { borderRadius: 10, overflow: "hidden" },
})