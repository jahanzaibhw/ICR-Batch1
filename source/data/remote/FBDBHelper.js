import firestore from '@react-native-firebase/firestore';

const locationCollection = firestore().collection('batch_no_1');
export default class FBDBHelper {

    updateLocToDB(id, lat, lng) {
        locationCollection.doc(String(id)).set({
            lat: lat,
            lng: lng
        }).then(() => {
            console.log("update sent")
        }).catch((error) => {
            console.log(error)
        })
    }
}