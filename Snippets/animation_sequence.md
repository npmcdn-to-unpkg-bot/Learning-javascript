# Animation sequence

## Use `Promise()`
[Sample](https://jsfiddle.net/walfo/07xphesh/)

```js
const el = document.querySelector('.element');
const animStart = () => new Promise((resolve) => {
  setTimeout(() => {
    el.classList.add('animate');
    resolve({
      message: 'animation stated'
    });
  }, 3000);
});

const anim1 = () => new Promise((resolve) => {
  el.style.animationName = 'animation-name-1';
  el.addEventListener('animationend', resolve, false);
  // if you need the `arguments` to `resolve()`.
  // or `el.addEventListener('animationend, e => resolve(), false');`
});

const anim2 = () => new Promise((resolve) => {
  el.style.animationName = 'animation-name-2';
  el.addEventListener('animationend', resolve, false);
});

const anim3 = () => new Promise((resolve) => {
  el.style.animationName = 'animation-name-3';
  el.addEventListener('animationend', resolve, false);
});

animStart()
  .then(anim1)
  .then(anim2)
  .then(anim3);
```

## Use `Generator`
[Sample](https://jsfiddle.net/walfo/36p3cpts/)

```js
// アニメーションの定義は Promise のときと同じ

async(gen());

function* gen() {
  console.log('[start]');

  yield animStart();
  yield anim1();
  yield anim2();
  yield anim3();
  // 並列処理
  yield Promise.all([anim1(), anim2(), anim3()]);
  // 即時関数で定義
  yield (function() {
    console.log('3000ms wait...');
    return new Promise(resolve => {
      setTimeout(resolve, 3000);
    });
  })();
  // `Promise.resolve` を使う
  const msg = yield Promise.resolve(`[end]`);

  return console.log(`${msg}`);
}

// async flow
function async(g) {
  let p = g.next();
  if (p.done) return ;
  
  p.value.then(() => {
    main(g);
  });
}

// async flow of another implementation
function _async(g) {
  const next = (value) => {
    const result = g.next(value);
    if (!result.done) {
      const promise = result.value;
      promise.then((value) => {
        return next(value);
      });
    }
  };
  return next();
}
```

## Use `async/await`

```js
async function animationSequence() {
  await animStart();
  await anim1();
  await anim2();
  await anim3();
  return 'Animation is End';
}
animationSequence().then(result => console.log(result) );
```

## Links
- [Promiseについて](http://js-next.hatenablog.com/entry/2013/11/28/093230)
- [JavaScriptは如何にしてAsync/Awaitを獲得したのか](http://qiita.com/gaogao_9/items/5417d01b4641357900c7)
