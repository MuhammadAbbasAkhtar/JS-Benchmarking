import "./styles.css";
var Benchmark = require("./benchmark.min.js");
var suite = new Benchmark.Suite();
function test1() {
  return document.getElementById("t1");
}

function test2() {
  return document.getElementsByClassName("t2");
}

var cycleResults = document.getElementById("cycleResults");
var result = document.getElementById("result");
var btn = document.getElementById("btn");

// BENCHMARK ====================
btn.onclick = function runTests() {
  btn.setAttribute("disable", true);
  cycleResults.innerHTML = "";
  result.textContent = "Tests running...";

  // add tests
  suite
    .add("test1", test1)
    .add("test2", test2)
    // add listeners
    .on("cycle", function (event) {
      var result = document.createElement("li");
      result.textContent = String(event.target);

      document.getElementById("cycleResults").appendChild(result);
    })
    .on("complete", function () {
      result.textContent = "Fastest is " + this.filter("fastest").pluck("name");
      btn.setAttribute("disable", false);
    })
    // run async
    .run({ async: true });
};
