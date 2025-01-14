

export default interface IFileStorage {

    get_url: (filename: string) => Promise<string>;
    upload: (file: File) =>Promise<string>;
}