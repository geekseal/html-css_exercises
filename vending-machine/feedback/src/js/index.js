import ColaGenerator from "./components/colaGenerator.js";
import VendingMachine from "./components/vendingMachine.js";

const colaGenerator = new ColaGenerator();
const vendingMachine = new VendingMachine();

await colaGenerator.setUp();
vendingMachine.setUp();

/* 원래는 이런 식으로, top level await를 사용하면 위 방법으로)
(async () => {
    await colaGenerator.setUp();
    vendingMachine.setUp();
})();
*/
