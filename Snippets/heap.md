# Heap

> ヒープ(二分ヒープ)は優先度付きキューの実装によく使われており、最小値(最大値)を効率よく取り出すことができるデータ構造です。ヒープの実装は二分木でなく実際には配列で実装するのが一般的のようです。

__実装例1)__
```js
/**
 * @constructor
 * @see http://d.hatena.ne.jp/otaks/20121220/1355993039
 */
function Heap() {
  this.heap = new Array();
  this.size = 0;
}
Heap.prototype.push = function(val) {
  var k = this.size++;
  
  while(0 < k) {
    var p = Math.floor( (k - 1) / 2 );
    if ( this.heap[p] <= val) break;
    this.heap[k] = this.heap[p];
    k = p;
  }
  this.heap[k] = val;
};
Heap.prototype.pop = function() {
  var ret = this.heap[0];
  var x = this.heap[--this.size];
  
  var k = 0;
  while (k * 2 + 1 < this.size) {
    var a = k * 2 + 1;
    var b = k * 2 + 2;
    if (b < this.size && this.heap[b] < this.heap[a]) {
      a = b;
    }
    if (x <= this.heap[a]) {
      break;
    }
    
    this.heap[k] = this.heap[a];
    k = a;
  }
  
  this.heap[k] = x;
  return ret;
};
Heap.prototype.top = function() {
  return this.heap[0];
};
Heap.prototype.size = function() {
  return this.size;
};
```

__実装例1-b) 実装1をクラスに書き換え__
```js
/**
 * @class
 * @see http://d.hatena.ne.jp/otaks/20121220/1355993039
 */

class Heap {
  constructor() {
    this.heap = new Array();
    this.size = 0;
  }
  push(value) {
    var k = this.size++;
    
    while (0 < k) {
      var p = Math.floor( (k - 1) / 2 );
      if (this.heap[p] <= value) {
        break;
      }
      this.heap[k] = this.heap[p];
      k = p;
    }
    this.heap[k] = value;
  }
  pop() {
    var ret = this.heap[0];
    var x = this.heap[--this.size];
    var k = 0;
    
    while (k * 2 + 1 < this.size) {
      var a = k * 2 + 1;
      var b = k * 2 + 2;
      if (b < this.size && this.heap[b] < this.heap[a]) {
        a = b;
      }
      if (x <= this.heap[a]) {
        break;
      }
      this.heap[k] = this.heap[a];
      k = a;
    }
    this.heap[k] = x;
    return ret;
  }
  top() {
    return this.heap[0];
  }
  size() {
    return this.size;
  }
  dump() {
    return this.heap;
  }
}
```

__実装例2)__
```js
/**
 * binaryHeap
 * http://goo.gl/Aghz4K
 */

class BinaryHeap {
  constructor() {
    this._ary = [];
  }

  build() {

    /**
     * heapify
     * 3要素を比較して最も小さい要素を親とする
     * @param {Array} ary 
     * @param {Number} i
     * @param {Number} max
     */

    var heapify = (ary, i, max) => {
      var swap = (ary, x, y) => {
        var a = ary[x];
        var b = ary[y];
        ary[x] = b;
        ary[y] = a;
        return true;
      };
      
      var l = 2 * i + 1;
      var r = 2 * i + 2;
      var li = 0;
      
      if (l < max && ary[l].priority < ary[i].priority) {
        li = l;
      } else {
        li = i;
      }
      
      if (r < max && ary[r].priority < ary[li].priority) {
        li = r;
      }
      
      if (li !== i) {
        swap(ary, i, li);
        heapify(ary, li, max);
      }
    };
    
    var ary = this._ary;
    for (var i = ary.length - 1; i >= 0; i--) {
      heapify(ary, i, this._ary.length);
    }
  }

  /**
   * insert
   * 要素をヒープに追加する
   * @param {Object} elm
   * @param {Number} priority
   */
  insert(elm, priority) {
    this._ary.push({
      'priority': priority,
      'elm': elm
    });
    this.build();
  }

  /**
   * changePriority
   * 要素の優先度を変更する
   * @param {Object} elm
   * @param {Number} priority
   */
  changePriority(elm, priority) {
    var ary = this._ary;
    for (var i = 0; i < ary.length; i++) {
      if (elem === ary[i]['elm']) {
        ary[i]['priority'] = priority;
        this.build();
        return true;
      }
    }
    return false;
  }

  /**
   * getPrior
   * 優先度の高い要素を取得する
   */
  getPrior() {
    var elm = this._ary.shift();
    if (!elm) return ;
    this.build();
    return elm['elm'];
  }

  /**
   * ヒープを返す
   */
  getList() {
    return this._ary;
  }
}

// test
var pq = new BinaryHeap();

pq.insert('pochi', 0);
pq.insert('son', 4);
pq.insert('mike', 10);
pq.insert('father', 1);
pq.insert('mother', 2);
console.log(pq.getList());
console.log(pq.getPrior());
console.log(pq.getPrior());
```
