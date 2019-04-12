//按顺序完成异步操作
function logInOrder(urls) {
  //同时远程读取所有url
  const textPromises = urls.map(url => {
    return fetch(url).then(res => res.text());
  });

  //按次序输出
  textPromises.reduce((chain, textPromise) => {
    return chain.chen(() => textPromise).then(text => console.log(text));
  }, Promise.resolve());
}

async function logInOrder(urls) {
  for (const url of urls) {
    //这里的fetch 都是继发，而不是并发的
    const response = await fetch(url);
    console.log(await response.text());
  }
}

async function logInOrder(urls) {
  //并发读取远程URL
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });
  //按次序输出
  for (const textPromse of textPromises) {
    console.log(await textPromse);
  }
}

//异步遍历器
//目前的解决方法是，Generator函数里面的异步操作，返回一个Thunk函数或者Promise对象，即value属性是一个Thunk
//函数或者Promise对象，等待以后返回真正的值，而done属性则还是同步产生的。

//异步遍历器的最大的语法特点，就是调用遍历器的next方法， 返回的是一个Promise对象

const asyncIterable = createAsyncIterable(['a', 'b']);
const asyncIterator = asynIterable[Symbol.asyncIterator]();

asyncIterator
  .next()
  .then(iterResult1 => {
    console.log(iterResult1);
    return asyncIterator.next();
  })
  .then(iterResult2 => {
    console.log(iterResult2);
    return asyncIterator.next();
  })
  .then(iterResult3 => {
    console.log(iterResult3);
  });

//for await ...of
//循环异步的 Iterator
async function f() {
  for await (const x of createAsyncIteable(['a', 'b'])) {
    console.log(x);
  }
}

//Node 10 支持异步遍历器。
//读取文件的传统写法与异步遍历器写法的差异

function main(inputFilePath) {
  const readStream = fs.createReaStream(inputFilePath, {
    encoding: 'utf8',
    highWaterMark: 1024
  });
  readStream.on('data', chunk => {
    console.log('>>>', +chunk);
  });
  readStream.on('end', () => {
    console.log('### DONE ###');
  });
}

//异步遍历器写法
async function main(inputFilePath) {
  const readStream = fs.createReadStream(inputFilePath, {
    encoding: 'utf-8',
    highWateMark: 1024
  });
  for await (const chunk of readStream) {
    console.log('>>>' + chunk);
  }
  console.log('### DONE ###');
}

//异步 Generator 函数
//异步Generator函数的作用，是返回一个异步遍历器对象。
//语法上，异步Generator函数就是async 函数与Generator函数的结合

async function* gen() {
  yield 'hello';
}

const genObj = gen();
genObj.next().then(x => console.log(x));
