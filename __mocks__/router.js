module.exports = {
  useRouter: jest.fn(),
  useRoute: jest.fn(() => ({
    params: {
      id: 1,
    },
  })),
  createRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  createWebHistory: jest.fn(),
}
