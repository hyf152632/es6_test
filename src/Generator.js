//Generator 是实现状态机的最佳结构。

const low_stateMachine = () => {
  let ticking = true;
  const reverse = () => (ticking = !ticking);
  if (ticking) {
    return () => {
      console.log('Tick!');
      reverse();
    };
  } else {
    console.log('Tock!');
    reverse();
  }
};

const super_stateMachine = function*() {
  while (true) {
    console.log('Tick!');
    yield;
    console.log('Tock!');
    yield;
  }
};

//改善代码运行流程
function* longRuningTask(value1) {
  try {
    const value2 = yield step1(value1);
    const value3 = yield step2(value2);
    const value4 = yield step3(value3);
    const value5 = yield step4(value4);
  } catch (e) {}
}

function scheduler(task) {
  const taskObj = task.next(task.value);

  if (!taskObj.done) {
    task.value = taskObj.value;
    scheduler(task);
  }
}

// scheduler(longRunningTask(initialValue))
