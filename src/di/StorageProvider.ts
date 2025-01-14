import HostingStorage from "../lib/storage/HostingStorage.js";

export default class StorageProvider {

    private hostingStorage: HostingStorage | undefined;

    public provideHostingStorage() {
        if(this.hostingStorage === undefined) {
            this.hostingStorage == new HostingStorage('http://gebeya.free.nf');
        }
        return this.hostingStorage;
    }
}