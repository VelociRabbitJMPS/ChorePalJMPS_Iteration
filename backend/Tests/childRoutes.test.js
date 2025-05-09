/*Unit testing version*/
// const childRoutes = require('../childRoutes'); // Assuming this exports a router

// describe('Child Routes', () => {
//   let app;

//   beforeAll(() => {
//     app = express();
//     app.use(express.json());
//     app.use('/', childRoutes); // Mount your routes
//   });

//   describe('GET /children/:id', () => {
//     it('fetches all child data successfully', async () => {
//       const mockData = {
//         _id: 1,
//         username: 'child 1',
//         _id: 2,
//         username: 'child 2',
//       };

//       axios.get.mockResolvedValue({ data: mockData }); // Proper mocking

//       const response = await request(app).get(`/children`);

//       expect(response.statusCode).toBe(200); // assert status code
//       expect(response.body).toEqual(mockData); //assert response body
//       expect(axios.get).toHaveBeenCalledWith('/children'); //assert axios call
//     });

//     it('fetches one child by id data successfully', async () => {
//       const childId = 'someId';
//       const mockData = { _id: childId, username: 'Existing User' };

//       axios.get.mockResolvedValue({ data: mockData }); // Proper mocking

//       const response = await request(app).get(`/children/${childId}`);

//       expect(response.statusCode).toBe(200);
//       expect(response.data).toEqual(mockData);
//       expect(axios.get).toHaveBeenCalledWith('/children');
//     });
//   });

//   describe('POST /children/:id', () => {
//     it('Creates one child successfully', async () => {
//       const childId = 'someId';
//       const mockData = { _id: childId, username: 'New User' };

//       axios.post.mockResolvedValue({ data: mockData });

//       const  = await axios.post(`/children/${childId}`);

//       expect(.data).toEqual(mockData);
//     });
//   });

//   describe('PUT /children/:id', () => {
//     it('Updates one child by id data successfully', async () => {
//       const childId = 'someId';
//       const mockData = { _id: childId, username: 'Existing User' };

//       axios.put.mockResolvedValue({ data: mockData });
//       const result = await axios.put(`/children/${childId}`);

//       expect(result.data).toEqual(mockData);
//     });
//   });

//   describe('DELETE /children/:id', () => {
//     it('Removes one child by id data successfully', async () => {
//       const childId = 'someId';
//       const mockData = { _id: childId, username: 'Existing User' };

//       axios.delete.mockResolvedValue({ data: mockData });
//       const result = await axios.delete(`/children/${childId}`);

//       expect(result.data).toEqual(mockData);
//     });
//   });
// });
// childRoutes.test.js

/*Integration Testing version*/

// const request = require('supertest');'
const express = require('express');

const request = require('supertest');
const { ObjectId } = require('mongodb');

// // Mock data for child routes
const mockChildData = {
  _id: new ObjectId('60d21b17a1b2c3d4e5f6a7b8'),
  name: 'John Doe',
  age: 10,
};

const mockUpdatedChild = {
  _id: new ObjectId('60d21b17a1b2c3d4e5f6a7b8'),
  name: 'John Updated',
  age: 11,
};

// // Mock MongoDB collection methods for testing
const mockChildCollection = {
  findOne: jest.fn(),
  updateOne: jest.fn(),
  deleteOne: jest.fn(),
};

// // Mocking the database connection for testing
jest.mock('../connect', () => ({
  getDb: jest.fn().mockReturnValue({
    collection: () => mockChildCollection, // 👈 Fix is here
  }),
  connectToServer: jest.fn().mockResolvedValue(true),
}));

// // Import after mock setup
const childRoutes = require('../childRoutes'); // Import child routes after mocking
const { connectToServer, getDb } = require('../connect'); // Import the DB connection logic

const app = express();
app.use(express.json());
app.use('/', childRoutes);

beforeAll(async () => {
  await connectToServer(); // Ensure the DB connection is established before running tests
});

afterEach(() => {
  jest.clearAllMocks(); // Clear mocks after each test to avoid interference
});

describe('Child Routes', () => {
  // Testing GET /children/:id
  describe('GET /children', () => {
    it('fetches one child by id data successfully', async () => {
      const childId = mockChildData._id.toString();
      mockChildCollection.findOne.mockResolvedValue(mockChildData);

      const response = await request(app).get(`/children/${childId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        ...mockChildData,
        _id: mockChildData._id.toString(),
      });
      expect(mockChildCollection.findOne).toHaveBeenCalledWith({
        _id: new ObjectId(childId),
      });
    });
  });
  describe('POST /children', () => {
    it('creates a new child successfully', async () => {
      const mockUsername = 'new_user';
      const insertedId = new ObjectId();

      // Mock insertOne to simulate successful insert
      mockChildCollection.insertOne = jest
        .fn()
        .mockResolvedValue({ insertedId });

      // Mock findOne to return the created child
      const mockNewChild = { _id: insertedId, username: mockUsername };
      mockChildCollection.findOne = jest.fn().mockResolvedValue(mockNewChild);

      const response = await request(app)
        .post('/children')
        .send({ username: mockUsername });

      expect(response.statusCode).toBe(200); // Should be 201 for successful creation
      expect(response.body).toEqual({
        insertedId: insertedId.toString(), // Normalize _id for comparison
      });

      expect(mockChildCollection.insertOne).toHaveBeenCalledWith({
        username: mockUsername,
      });
    });
  });
  describe('PUT /children/:id', () => {
    it('updates a child successfully', async () => {
      const childId = new ObjectId();
      const newUsername = 'updated_user';

      mockChildCollection.updateOne = jest
        .fn()
        .mockResolvedValue({ modifiedCount: 1 });

      const mockUpdatedChild = { _id: childId, username: newUsername };
      mockChildCollection.findOne = jest
        .fn()
        .mockResolvedValue(mockUpdatedChild); // Ensure findOne returns the updated data

      const response = await request(app)
        .put(`/children/${childId.toString()}`)
        .send({ username: newUsername });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        modifiedCount: 1,
      });

      expect(mockChildCollection.updateOne).toHaveBeenCalledWith(
        { _id: childId },
        { $set: { username: newUsername } }
      );
    });
  });

  describe('DELETE /children/:id', () => {
    it('deletes a child successfully', async () => {
      const childId = new ObjectId();

      mockChildCollection.deleteOne = jest
        .fn()
        .mockResolvedValue({ deletedCount: 1 });

      // Mock findOne to simulate that the document existed before deletion (optional, but good practice for thorough testing)
      mockChildCollection.findOne = jest
        .fn()
        .mockResolvedValue({ _id: childId, username: 'some_user' });

      const response = await request(app).delete(
        `/children/${childId.toString()}`
      );

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ deletedCount: 1 });
      expect(mockChildCollection.deleteOne).toHaveBeenCalledWith({
        _id: childId,
      });
    });
  });
});
