// 자판기 음료 배치
const colaList = [
    { name: "Original_Cola", alt: "오리지널 콜라", price: 1000, quantity: 10 },
    { name: "Violet_Cola", alt: "바이올렛 콜라", price: 1000, quantity: 10 },
    { name: "Yellow_Cola", alt: "옐로우 콜라", price: 1000, quantity: 10 },
    { name: "Cool_Cola", alt: "쿨 콜라", price: 1000, quantity: 10 },
    { name: "Green_Cola", alt: "그린 콜라", price: 1000, quantity: 10 },
    { name: "Orange_Cola", alt: "오렌지 콜라", price: 1000, quantity: 10 },
];

const $drinkItems = document.querySelectorAll(".drink_items");

[...$drinkItems].forEach((item, i) => {
    const $itemImage = item.querySelector(".img-item");
    const $itemName = item.querySelector(".txt-item_name");
    const $itemPrice = item.querySelector(".txt-item_price");
    $itemImage.setAttribute("src", `images/${colaList[i]["name"]}_2x.png`);
    $itemImage.setAttribute("alt", `${colaList[i]["alt"]}입니다.`);
    $itemName.textContent = `${colaList[i]["name"]}`;
    $itemPrice.textContent = `${colaList[i]["price"]}원`;
});

// 소지금, 입금
let inMyWallet = 25000;
const $wallet = document.querySelector(".wallet");
const $inMyWallet = $wallet.querySelector(".txt-right");
$inMyWallet.textContent = `${addComma(inMyWallet)} 원`;

function addComma(int) {
    const intToArray = int.toString().split("");
    for (let i = intToArray.length - 3; i > 0; i -= 3) {
        intToArray.splice(i, 0, ",");
    }
    return intToArray.join("");
}

let balance = 0;
let insertedMoney = 0;

const $formInsertMoney = document.querySelector(".form-insert_money");
const $inpInsertMoney = $formInsertMoney.querySelector(".inp-insert_money");
const $btnInsertMoney = $formInsertMoney.querySelector(".btn-insert_money");
const $balance = document.querySelector(".balance > .txt-right");

$btnInsertMoney.addEventListener("click", () => {
    inMyWallet -= $inpInsertMoney.getAttribute("value");
    insertedMoney += $inpInsertMoney.getAttribute("value");
    balance += insertedMoney;

    $inMyWallet.textContent = `${addComma(inMyWallet)} 원`;
    $balance.textContent = `${addComma(balance)} 원`;
});
