import { model } from "../src/model"

test('adds 1 + 2 to equal 3', () => {
  expect(model.add(1, 2)).toBe(3);
});