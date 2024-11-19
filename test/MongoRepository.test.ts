import { Model, Document } from "mongoose";
import MongoRepository from "../src/lib/repository/MongoRepository";
import IRepository from "../src/lib/repository/IRepository";


// Mock Mongoose model methods
const mockModel = {
  create: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
} as unknown as Model<Document>;

type TestResource = Document & { name: string; age: number };

// Mock data
const mockData: TestResource = { _id: "mockId", name: "Test", age: 25 } as unknown as TestResource;

describe("MongoRepository", () => {
  let repository: MongoRepository<TestResource>;

  beforeEach(() => {
    repository = new MongoRepository<TestResource>("TestCollection", mockModel);
  });

  afterEach(() => {
    jest.clearAllMocks();
    
  });

  // Test for createData
  it("should create a document", async () => {
    mockModel.create.mockResolvedValue(mockData);

    await repository.createData(mockData);
    expect(mockModel.create).toHaveBeenCalledWith(mockData);
  });

  // Test for readData
  it("should read a document by ID", async () => {
    const mockId = "mockId";
    mockModel.findById.mockResolvedValue(mockData);

    const result = await repository.readData(mockId);
    expect(mockModel.findById).toHaveBeenCalledWith(mockId);
    expect(result).toEqual(mockData);
  });

  it("should throw an error if document not found on read", async () => {
    const mockId = "nonExistentId";
    mockModel.findById.mockResolvedValue(null);

    await expect(repository.readData(mockId)).rejects.toThrow(
      `Resource with ${mockId} not found for reading`
    );
  });

  // Test for updateData
  it("should update a document by ID", async () => {
    const mockId = "mockId";
    const updatedData = { name: "Updated", age: 30 } as TestResource;
    mockModel.findByIdAndUpdate.mockResolvedValue(updatedData);

    await repository.updateData(mockId, updatedData);
    expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(mockId, updatedData);
  });

  it("should throw an error if document not found on update", async () => {
    const mockId = "nonExistentId";
    mockModel.findByIdAndUpdate.mockResolvedValue(null);

    await expect(repository.updateData(mockId, mockData)).rejects.toThrow(
      `Resource with ${mockId} not found for updating`
    );
  });

  // Test for deleteData
  it("should delete a document by ID", async () => {
    const mockId = "mockId";
    mockModel.findByIdAndDelete.mockResolvedValue(mockData);

    await repository.deleteData(mockId);
    expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith(mockId);
  });

  it("should throw an error if document not found on delete", async () => {
    const mockId = "nonExistentId";
    mockModel.findByIdAndDelete.mockResolvedValue(null);

    await expect(repository.deleteData(mockId)).rejects.toThrow(
      `Resource with ${mockId} not found for deleting`
    );
  });
});
