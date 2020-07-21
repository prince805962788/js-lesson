// 有 N 个房间， 开始时你位于 0 号房间。 每个房间有不同的号码： 0， 1， 2，...，N - 1， 并且房间里可能有一些钥匙能使你进入下一个房间。

// 在形式上， 对于每个房间 i 都有一个钥匙列表 rooms[i]， 每个钥匙 rooms[i][j] 由[0, 1，...，N - 1] 中的一个整数表示， 其中 N = rooms.length。 钥匙 rooms[i][j] = v 可以打开编号为 v 的房间。

// 最初， 除 0 号房间外的其余所有房间都被锁住。

// 你可以自由地在房间之间来回走动。

// 如果能进入每个房间返回 true， 否则返回 false。
// 输入: [
//   [1],
//   [2],
//   [3],
//   []
// ]
// 输出: true

//DFS
let canVisitAllRooms = (rooms) => {
  let opens = new Set() //已经打开的房间
  let openRooms = (key) => {
    if (!opens.has(key)) { //进开过的门进去拿钥匙
      opens.add(key)
      for (let otherKeys of rooms[key]) { //遍历房间内的其他钥匙
        openRooms(otherKeys)
      }
    }
  }
  openRooms(0)
  return opens.size >= rooms.length
};
//BFS 
let canVisitAllRooms = (rooms) => {
  let opens = new Set() //已经打开的房间
  let keys = [0]
  while (keys.length) {
    let key = keys.shift()
    if (!opens.has(key)) {
      opens.add(key)
      for (let otherKeys of rooms[key]) {
        keys.push(otherKeys)
      }
    }
  }
  return opens.size >= rooms.length
};