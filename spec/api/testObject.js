var myObject = {
    name: 'tacocopter'
}

var workObject = function( object, callback ){
    object ? callback(object) : null; 
}

var say = function( object ){
    console.log('saying your object:');
    console.dir( object );
}

var sayName = function( object ){
    console.log('saying your object\'s name:')
    console.dir( object.name );
}

var myWorkObject = new workObject( myObject, sayName );