export default interface IRepository<Resource> {
    createData: (resource: Resource) => Promise<void>;
    readData: (id: string) => Promise<Resource | null>;
    updateData: (id: string, resource: Resource) => Promise<void>;
    deleteData: (id: string) => Promise<void>;
}