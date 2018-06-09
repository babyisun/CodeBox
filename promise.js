console.log("start");

let p = new Promise((resolve, reject) => {
    // setTimeout(() => {
    //     resolve("hello");
    // }, 1000);
    setTimeout(() => {
        reject("error");
    }, 2000);
}).then(value => {
    let s = value + " world";
    console.log(s);
    // new Promise(resolve => {
    //     resolve(value);
    // })
    return s;
}, error => {
    console.log(error);
    return "错误";
}).then(value => {
    console.log(value + " north");
})
