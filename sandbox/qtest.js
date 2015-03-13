var Q = require('q');

Q.fcall(promisedStep1)
.then(promisedStep2)
.then(promisedStep3)
.then(promisedStep4)
.then(function (value4) {
  console.log(value4);
    // Do something with value4
})
.catch(function (error) {
    console.log(error);
    // Handle any error from all above steps
})
.done();


var promisedStep1 = function(a){
    return a+1;
};
var promisedStep2 = function(a){
    return a+1;
};
var promisedStep3 = function(a){
    return a+1;
};
var promisedStep4 = function(a){
    return a+1;
};