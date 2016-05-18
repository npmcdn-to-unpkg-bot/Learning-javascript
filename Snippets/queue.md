# Queue

キューとは、先に入力したデータが先に出力されるという特徴をもつ、データ構造の一種。  
ちょうど遊園地の乗り物待ちのような構造になっており、データを入れるときは新しいデータが最後尾につき、データを出すときは一番古いデータが優先して出てくる。

- [キュー 【 queue 】 待ち行列](http://e-words.jp/w/%E3%82%AD%E3%83%A5%E3%83%BC.html)

```js
/**
 * Queue
 * - first in first out
 */
 */

class Queue {
  constructor() {
    this.data = [];
  }
  push(value) {
    this.data.push(value);
    return value;
  }
  pop() {
    return this.data.shift();
  }
  front() {
    return this.data[0]
  }
  size() {
    return this.data.length;
  }
  empty() {
    return this.data.length === 0;
  }
  dump() {
    return this.data;
  }
}
```