import { generateArt } from "../../services/imageservice";

test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});

test('image service generates images', () => {
  const test = generateArt(
    "Solana",
    {
      BackgroundType: 1,
      ShapeType: 1,
      borderType: 1,
    }
    ,
    () => undefined
  );
  expect(test).toBe(undefined);
}, 60000);