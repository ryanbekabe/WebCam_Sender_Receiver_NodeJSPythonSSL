var sleep = require('system-sleep');
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function function2() {
    // all the stuff you want to happen after that pause
    console.log('Blah blah blah blah extra-blah');
}
var i=0;
while(i < 10) {
  //sleep(2000);
  console.log('Loop: ' + i);
  sleep(10*1000);
  i++;
}
