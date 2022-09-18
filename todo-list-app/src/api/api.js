import * as axios from 'axios'

export default class Api {
    constructor(apiRouter) {
        this.client = null
        this.api_url = `${process.env.REACT_APP_API_ENDPOINT}${apiRouter}`
    }

    init = () => {
        let headers = {
            Accept: "application/json",
        };

        this.client = axios.create({
            baseURL: this.api_url,
            timeout: 31000,
            headers: headers,
            withCredentials: true
          });
      
          return this.client;
    }

    get = (path, params) => {
        return this.init().get(path, {params, withCredentials: true})
    }

    post = (path, data) => {
        return this.init().post(path, data, {withCredentials: true})
    }
}