//所谓Promise，简单来说就是一个容器，里面保存着某个未来才会结束的事件（通常是个异步操作）

//Promise无法取消

const sleep = (ms = 1000) =>
  new Promise((resolve, _) => {
    setTimeout(resolve, ms);
  });

const delay = async (fn, ms = 1000) => {
  await sleep(ms);
  return await fn();
};

const loadImageAsync = url =>
  new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);

    image.onerror = () => reject(new Error('Could not load image at ' + url));

    image.src = url;
  });

const getJSON = url =>
  new Promise((resolve, reject) => {
    const handler = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.stastText));
      }
    };
    const client = new XMLHttpRequest();
    client.open('GET', url);
    client.onreadystatechange = handler;
    client.responseType = 'json';
    client.setRequestHeader('Acept', 'aplication/json');
    client.send();
  });

//一般来说，调用resolve或reffct以后，Promise的使命就完成了，后续操作应该放到then方法里面，而不应该直接写在resovle
//或reject的后面。所以，最好在他们前面加上return语句，这样就不会有意外

//Promise.cath 方法是.then(null,rejection)或.then(undefined, rejection)的别名，用户用于指定发生错误是的回调函数。

//Promise.prototype.finally
//finally方法的回调函数不接受反而参数，则意味着没有边防知道，前面的promise状态到底是fulfilled还是rejeted。这表明，finally方法联盟的操作，应该是与状态无关的，不依赖于Promise的执行结果。

Promise.prototype.finally = function(callback) {
  if (Promise.prototype.finally) {
    return Promise.prototype.finally(callback);
  }
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason =>
      P.resolve(callback()).then(() => {
        throw reason;
      })
  );
};

//Promie.resolve方法的参数分成四种情况
//1.参数是一个Promise实例：原封不动的返回这个实例
//2.参数是一个thenable对象
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};
//Promise.resolve方法会将这个对象转为Proise对象，然后就立即执行theable对象的then方法。
let p1 = Promise.resolve(thenable);
p1.then(value => console.log(value));
//3.参数不是具有then方法的对象，或根本就不是对象
//如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resovle方法返回一个新的Promsied对象，状态为resolved.
const p = Promise.resolve('Hello');
p.then(s => console.log(s));
//4.不带任何参数
//Promise.resolve()方法允许调用时不带参数，直接返回一个resolved状态的Promise对象
//所以如果希望得到一个Promise对象，比较方便的方法就是直接调用Promsie.resolve方法

//应用
//结合 Generator 函数管理流程，遇到异步操作的时候，通常返回一个Promise对象
function getFoo() {
  return new Promise((resolve, reject) => {
    resolve('foo');
  });
}

const g = function*() {
  try {
    const foo = yield getFoo();
    console.log(foo);
  } catch (e) {
    console.log(e);
  }
};

function run(generator) {
  const it = generator();

  function go(result) {
    if (result.done) return result.value;
    return result.value.then(
      function(value) {
        return go(it.next(value));
      },
      function(error) {
        return go(it.throw(error));
      }
    );
  }
  go(it.next());
}

//run(g)

export { delay, loadImageAsync, getJSON };
