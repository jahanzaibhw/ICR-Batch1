import AsyncStorage from '@react-native-async-storage/async-storage'
import LightTheme from '../../assets/theme/light.json'

const ACTIVE_THEME = "@General:Theme"

export default class PrefManager {

    async setTheme(theme) {
        try {
            await AsyncStorage.setItem(ACTIVE_THEME, JSON.stringify(theme))
        } catch (error) {
            console.log(error)
        }
    }

    async getTheme(onLoaded) {
        try {
            const theme = await AsyncStorage.getItem(ACTIVE_THEME)
            const mTheme = theme ? JSON.parse(theme) : LightTheme
            onLoaded(mTheme)
        } catch (error) {
            console.log(error)
            onLoaded(LightTheme)
        }
    }

}