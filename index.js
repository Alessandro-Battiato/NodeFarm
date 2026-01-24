const fs = require("fs");
const http = require("http");
const url = require("url");

// Blocking, synchronous way
// const textInput = fs.readFileSync("./txt/input.txt", "utf-8");

// const textOutput = `This is what we know about the avocado: ${textInput}. \nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOutput);

// Non-blocking, asynchronous way
/* fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      fs.writeFile(
        ".txt/final.txt",
        `${data2}\n${data3}`,
        "utf-8",
        (err) => {},
      );
    });
  });
});
*/

// Blocking synchronous code but being top-level code, gets executed only once

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the Overview");
  } else if (pathName === "/product") {
    res.end("This is the Product");
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {});
