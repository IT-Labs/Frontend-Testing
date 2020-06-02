describe('hooks', () => {
  beforeAll(() => {
    console.log('BeforeAll');
  });
  beforeEach(() => {
    console.log('BeforeEach');
  });
  afterEach(() => {
    console.log('afterEach');
  });
  afterAll(() => {
    console.log('afterAll');
  });

  test('first run', () => {
    console.log('first run');
  });
  
  test('second run', () => {
    console.log('second run');
  })
})