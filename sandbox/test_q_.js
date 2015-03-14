

promiseMeSomething()
    .then(function (value) {
    }, function (reason) {
});


var outputPromise = getInputPromise()
    .then(function (input) {
    }, function (reason) {
});


function authenticate() {
    return getUsername()
    .then(function (username) {
        return getUser(username);
    })
    // chained because we will not need the user name in the next event 
    .then(function (user) {
        return getPassword()
        // nested because we need both user and password next 
        .then(function (password) {
            if (user.passwordHash !== hash(password)) {
                throw new Error("Can't authenticate");
            }
        });
    });
}    