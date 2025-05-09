const express = require('express');
const request = require('supertest');
const { ObjectId } = require('mongodb');

// Mock chore data
const mockChoreId = new ObjectId();
const mockChore = {
  _id: mockChoreId,
  choreName: 'Clean Room',
  isWeekly: true,
  isCompleted: false,
  rating: 3,
  childName: 'Alice',
  image: 'image-url',
  day: 'Monday',
};

// Setup mock collection
const mockChoreCollection = {
  find: jest.fn(),
  findOne: jest.fn(),
  insertOne: jest.fn(),
  updateOne: jest.fn(),
  deleteOne: jest.fn(),
};

// Mock database module
jest.mock('../connect', () => ({
  getDb: jest.fn(() => ({
    collection: () => mockChoreCollection,
  })),
  connectToServer: jest.fn().mockResolvedValue(true),
}));

const choreRoutes = require('../choreRoutes');
const { connectToServer } = require('../connect');

const app = express();
app.use(express.json());
app.use('/', choreRoutes);

beforeAll(async () => {
  await connectToServer();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Chore Routes', () => {
  describe('GET /chores', () => {
    it('returns all chores', async () => {
      mockChoreCollection.find.mockReturnValue({
        toArray: jest.fn().mockResolvedValue([mockChore]),
      });

      const res = await request(app).get('/chores');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([
        {
          ...mockChore,
          _id: mockChore._id.toString(),
          status: "Pending",
        },
      ]);
      expect(mockChoreCollection.find).toHaveBeenCalledWith({});
    });
  });

  describe('GET /chores/:id', () => {
    it('returns a specific chore', async () => {
      mockChoreCollection.findOne.mockResolvedValue(mockChore);

      const res = await request(app).get(`/chores/${mockChoreId.toString()}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        ...mockChore,
        _id: mockChore._id.toString(),
      });
      expect(mockChoreCollection.findOne).toHaveBeenCalledWith({
        _id: mockChoreId,
      });
    });
  });

  describe('POST /chores', () => {
    it('creates a new chore', async () => {
      const insertedId = new ObjectId();
      const newChore = {
        choreName: 'Do Laundry',
        isWeekly: true,
        isCompleted: false,
        rating: 2,
        childName: 'Bob',
        image: 'image-url',
        day: 'Friday',
      };

      mockChoreCollection.insertOne.mockResolvedValue({ insertedId });

      const res = await request(app).post('/chores').send(newChore);

      expect(res.statusCode).toBe(200); // Consider 201 Created
      expect(res.body).toEqual({ insertedId: insertedId.toString() });

      expect(mockChoreCollection.insertOne).toHaveBeenCalledWith(newChore);
    });
  });

  describe('PUT /chores/:id', () => {
    it('updates a chore', async () => {
      const mockUpdatedChore = {
        choreName: 'Clean Room (Updated)',
        isWeekly: false,
        isCompleted: true,
        rating: 5,
        childName: 'Alice',
        image: 'updated-image-url',
        day: 'Tuesday',
      };

      mockChoreCollection.updateOne.mockResolvedValue({ modifiedCount: 1 });

      const res = await request(app)
        .put(`/chores/${mockChoreId.toString()}`)
        .send(mockUpdatedChore);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ modifiedCount: 1 });

      expect(mockChoreCollection.updateOne).toHaveBeenCalledWith(
        { _id: mockChoreId },
        { $set: mockUpdatedChore }
      );
    });
  });

  describe('DELETE /chores/:id', () => {
    it('deletes a chore', async () => {
      mockChoreCollection.deleteOne.mockResolvedValue({ deletedCount: 1 });

      const res = await request(app).delete(`/chores/${mockChoreId.toString()}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ deletedCount: 1 });

      expect(mockChoreCollection.deleteOne).toHaveBeenCalledWith({
        _id: mockChoreId,
      });
    });
  });
});
