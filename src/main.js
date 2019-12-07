console.log('Hello World！');

let a = 23;

const b = 26;

let pro = new Promise((resolve, reject) => {
  console.log('hahaha')
  setTimeout(() => {
    resolve();
  }, 2000)
})