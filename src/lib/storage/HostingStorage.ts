import IFileStorage from "./IFileStorage.js";
import NetworkClient from "../request/networkClient.js";
import axios from "axios";

export default class HostingStorage implements IFileStorage {

    public host: string;

    constructor(host: string) {
        this.host = host;
    }


    public async get_url(filename: string) {
        const response = await axios.get(`${this.host}/geturl.php?filename=${filename}`);
        
        if(response.status !== 200) {
            throw new Error(`Get url failed with ${response.status}`);
        }
        
        return response.data;
    }


    public async upload(file: File) {
        const form = new FormData();
        form.append('file', file, file.name);

        const response = await axios.post(`${this.host}/upload.php`, form);

        if(response.status !== 200) {
            throw new Error(`Upload faild with ${response.status}`)
        }
        return this.get_url(file.name);
    }

}