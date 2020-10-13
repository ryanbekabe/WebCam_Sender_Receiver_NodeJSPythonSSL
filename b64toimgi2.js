var fs      = require('fs');
const buf = Buffer.alloc(22, 'aGVsbG8gd29ybGQ=', 'base64');
console.log(buf);
fs.writeFile('im.jpg', buf, (err) => {
  if (err) return console.error(err)
  console.log('file saved to ', 'im.jpg')
})
