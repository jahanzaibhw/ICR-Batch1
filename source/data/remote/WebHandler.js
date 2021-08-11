import axios from 'axios'

export default class WebHandler {


    sendPostDataRequest(url, bodyParams, onSuccess, onFailure) {

        let headers = { 'Content-Type': 'application/json' }

        console.log("------------API POST REQUEST--------------")
        console.log("URL==>", url)
        console.log("HEADER==>", headers)
        console.log("BODYPARAMS==>", JSON.stringify(bodyParams))

        axios.post(url, bodyParams, {
            headers: headers
        }).then((response) => {
            const respJson = response.data
            console.log("RESPOSNE==>", JSON.stringify(respJson, null, 3))

            if (respJson.status == "success") {
                onSuccess(respJson)
            } else {
                onFailure(respJson.message)
            }
        }).catch((error) => {
            console.log("RESPOSNE==>", error);

            onFailure(error.message)
        })
    }

    sendGetDataRequest(url, params, onSuccess, onFailure) {

        let headers = { 'Content-Type': 'application/x-www-form-urlencoded' }

        console.log("------------API GET REQUEST--------------")
        console.log("URL==>", url)
        console.log("HEADER==>", headers)
        console.log("PARAMS==>", params)

        axios.get(url, {
            headers: headers,
            params: params
        }).then((response) => {
            const respJson = response.data
            console.log("RESPOSNE==>", JSON.stringify(respJson, null, 3))

            if (respJson.status == true) {
                onSuccess(respJson)
            } else {
                onFailure(respJson.message)
            }

        }).catch((error) => {
            console.log("RESPOSNE==>", error);

            onFailure(error.message)
        })
    }

}