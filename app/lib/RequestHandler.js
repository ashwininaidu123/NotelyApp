
import { API } from '../config'
import Toast from 'react-native-simple-toast';



export function fetchData(requestType, requestPath, data) {
    return fetch(API + requestPath, {
        method: requestType,
        timeout: 30 * 1000,
        headers: {
            'Accept': 'application/json',
        }
    }).then(response => {
        return Promise.all([response, response.json()])
    }).catch((error) => {
        console.warn('API Error ' + error)
        Toast.show('Something went wrong, Please try after sometime. ', Toast.SHORT);
        Promise.reject()
    });
}

export function fetchPostData(methodType, apiName, postData) {
    console.log(methodType + API + apiName + " Post Data == " + toQueryString(postData));
    return fetch(API + apiName,
        {
            method: methodType,
            timeout: 30 * 1000,
            body: toQueryString(postData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => Promise.all(
            [response, response.json()]
        )).catch((error) => {
            Toast.show('Something went wrong, Please try after sometime. ', Toast.SHORT);
            Promise.reject()
            console.warn(JSON.stringify(error))
        });
}

export function fetchTestPostData(methodType, apiName, postData) {
    console.log(methodType + API + apiName + " Post Data == " + toQueryString(postData));
    return fetch(API + apiName + '?' + toQueryString(postData),
        {
            method: methodType,
            timeout: 30 * 1000,
        }).then(response => {
            return (Promise.all(
                [response, response.json()]))
        }
        ).catch((error) => {
            Toast.show('Something went wrong, Please try after sometime. ', Toast.SHORT);
            Promise.reject()
            console.warn(JSON.stringify(error))
        });
}

export function logoutPostData(methodType, apiName, postData) {
    console.log(methodType + API + apiName + postData);
    return fetch(API + apiName + postData,
        {
            method: methodType,
            timeout: 30 * 1000,
        }).then(response => {
            return (Promise.all(
                [response, response.json()]))
        }).catch((error) => {
            Toast.show('Something went wrong, Please try after sometime. ', Toast.SHORT);
            Promise.reject()
            console.warn(JSON.stringify(error))
        });
}

export function toQueryString(obj) {
    return obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];

        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            }).join('&');
        }

        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
}


