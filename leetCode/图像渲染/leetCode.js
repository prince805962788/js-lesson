// 输入: image = [
//   [1, 1, 1],
//   [1, 1, 0],
//   [1, 0, 1],
// ];
// (sr = 1), (sc = 1), (newColor = 2);
// 输出: [
//   [2, 2, 2],
//   [2, 2, 0],
//   [2, 0, 1],
// ];

let floodFill = (image, sr, sc, newColor) => {
  if (image[sr][sc] === newColor) {
    return image;
  }
  let oldColor = image[sr][sc];
  let i = image.length;
  let j = image[0].length;
  let dfs = (x, y) => {
    image[x][y] = newColor;
    if (x > 0 && image[x - 1][y] === oldColor) dfs(x - 1, y);
    if (y > 0 && image[x][y - 1] === oldColor) dfs(x, y - 1);
    if (x < i - 1 && image[x + 1][y] === oldColor) dfs(x + 1, y);
    if (y < j - 1 && image[x][y + 1] === oldColor) dfs(x, y + 1);
  };
  dfs(sr, sc);
  return image;
};
let arr = [
  [1, 1, 1],
  [1, 1, 0],
  [1, 0, 1],
];
let res = floodFill(arr, 1, 1, 2);
console.log(res);
