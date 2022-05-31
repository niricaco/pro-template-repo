const { default: axios } = require("axios");

const http = baseurl => {

    const instance = axios.create({
        baseUrl: baseurl || '',
        timeout: 3000,
    });

    const post = async(url, body) => {
        try {
            const response = await instance.post(url, body);
            return response;
        } catch (err) {
            console.log(err);
            return err.response;
        }
    }

    return { post }
}

module.exports = http;