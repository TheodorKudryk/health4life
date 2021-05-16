const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
  var a = [1,2,3]
  a.splice(0, a.length)
  expect(a).toEqual([])
});