/**
 * Mock Data Layer for the Startup Simulator.
 * Simulates a MongoDB-like environment with in-memory storage.
 */

let db = {
  users: [],
  reports: [],
  projects: []
};

export const models = {
  User: {
    create: async (data) => {
      const newUser = { _id: Math.random().toString(36).substr(2, 9), ...data, createdAt: new Date() };
      db.users.push(newUser);
      return newUser;
    },
    findOne: async (query) => {
      return db.users.find(u => Object.keys(query).every(k => u[k] === query[k] || (k === '_id' && u._id === query[k])));
    }
  },
  Report: {
    create: async (data) => {
      const newReport = { _id: Math.random().toString(36).substr(2, 9), ...data, createdAt: new Date() };
      db.reports.push(newReport);
      return newReport;
    },
    find: async (query = {}) => {
      return db.reports.filter(r => Object.keys(query).every(k => r[k] === query[k])).sort((a, b) => b.createdAt - a.createdAt);
    },
    findOne: async (query) => {
      return db.reports.find(r => Object.keys(query).every(k => r[k] === query[k]));
    },
    findOneAndDelete: async (query) => {
      const index = db.reports.findIndex(r => Object.keys(query).every(k => r[k] === query[k]));
      if (index === -1) return null;
      return db.reports.splice(index, 1)[0];
    }
  },
  Project: {
    create: async (data) => {
      const newProject = { _id: Math.random().toString(36).substr(2, 9), ...data, createdAt: new Date() };
      db.projects.push(newProject);
      return newProject;
    },
    find: async (query = {}) => {
      return db.projects.filter(p => Object.keys(query).every(k => p[k] === query[k]));
    }
  }
};
