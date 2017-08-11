var http = require("http");
var url = require("url");
var fs = require("fs");
function readBooks(callback) {
  fs.readFile('./book.json', 'utf8', function (err, data) {
    if (err || data.length == 0) data = "[]";
    callback(JSON.parse(data));
  })
}
function writeBooks(data, callback) {
  fs.writeFile("./book.json", JSON.stringify(data), callback)
}
http.createServer(function (req, res) {
  let {pathname, query} = url.parse(req.url, true);
  if (pathname == "/book") {
    let id = query.id;
    switch (req.method) {
      case "GET":
        if (id) {
          readBooks(function (books) {
            let book = books.find(item=>item.id == id)
            res.end(JSON.stringify(book))
          })
        } else {
          readBooks(function (data) {
            res.end(JSON.stringify(data));
          })
        }
        break;
      case "POST":
        //发送过来的请求体，默认就是对象格式
        var str = '';
        req.on('data', function (data) {
          str += data
        });
        req.on('end', function () {
          var book = JSON.parse(str);
          readBooks(function (books) {  //读取所有的书，获取最后一项的id累加
            book.id = books.length > 0 ? books[books.length - 1].id + 1 : 1;
            books.push(book);
            writeBooks(books, function () {
              res.end(JSON.stringify(book))
            })
          })
        });
        break;
      case "PUT":
        var str = '';
        req.on('data', function (data) {
          str += data
        });
        req.on('end', function () {
          let book = JSON.parse(str);
          readBooks(function (books) {
            books = books.map(item=> {
              if (item.id == id) {
                return book;
              }
              return item
            });
            writeBooks(books, function () {
              res.end(JSON.stringify(book))
            })
          })
        });
        break;
      case "DELETE":
        readBooks(function (books) {
          books = books.filter(item=>id != item.id);
          writeBooks(books, function () {
            res.end(JSON.stringify({}))
          });
        });
        break;
    }
  }
}).listen(4000);
