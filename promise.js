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
    // throw new Error("error");
}).catch(err => {
    console.log(err);
})

// Define the callback function.
const appendCurrent = (previousValue, currentValue) => {
    return previousValue + "::" + currentValue;
}

// Create an array.
const elements = ["abc", "def", 123, 456];

// Call the reduce method, which calls the callback function
// for each array element.
let result = elements.reduce(appendCurrent);
console.log(result);
