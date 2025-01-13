

export default interface IFileStorage {

    get_url: (path: string) => Promise<string>;
    upload: (file: File) =>Promise<string>;
}