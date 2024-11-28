const showSomethimg = jest.fn(foo => foo.toUpperCase());

showSomethimg('shmarp!!!');

showSomethimg.mockReturnValueOnce('sudden lowercase')();

const wackyObject = {};
const boundedMock = showSomethimg.bind(wackyObject);

boundedMock('Wow, such log UwU');

test('mocking test', () => {
  expect(showSomethimg.mock.calls.length).toBe(3);
  expect(showSomethimg.mock.results[0].value).toBe('SHMARP!!!');
  expect(showSomethimg.mock.results[1].value).toBe('sudden lowercase');
  expect(showSomethimg.mock.results[2].value).toBe('WOW, SUCH LOG UWU');
  expect(showSomethimg.mock.contexts[0]).toBeUndefined();
  expect(showSomethimg.mock.contexts[1]).toBeUndefined();
  expect(showSomethimg.mock.contexts[2]).toEqual(wackyObject);
});