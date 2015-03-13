var frisby = require('frisby');
var q = require('q');

var categoriesP = q.defer();
var statusListP = q.defer();
var categories, statusList;

frisby.create("Get categories")
      .get("http://api/category")
      .expectStatus(200)
      .expectJSON("*",{...})
      .afterJSON(function(result)
      {   
          categories = result;
          categoriesP.resolve(result);
      })
     .toss();


frisby.create("Get status list")
    .get("http://api/status")
    .expectStatus(200)
    .expectJSON("*",{...})
    .afterJSON(function(result){
         statusList = result;
         statusListP.resolve(result);
     })
    .toss();

q.all([categoriesP.promise, statusListP.promise])
 .then(function()
  {
     var luckyCategory = chooseLuckyCategory(categories);
     var happyStatus = chooseHappyStatus(status);
     frisby.create("Create new user")
           .post(
               "http://api/user", 
               { 
                 name : "John", 
                 category : luckyCategory 
               })
           .expectStatus(202)
           .toss();
  });