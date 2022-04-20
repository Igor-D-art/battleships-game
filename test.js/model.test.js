import { model } from "../src/model"

test('ship has length', () => {
  expect(model.cruiser).toMatchObject(
  {
    shipLength:3
  });
});