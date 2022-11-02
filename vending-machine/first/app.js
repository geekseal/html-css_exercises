// 기본 DOM
const $vendingMachine = document.querySelector(".vending_machine");
const $wallet = document.querySelector(".wallet");
const $purchased = document.querySelector(".purchased");

// 판매할 음료
const colaList = [
    { name: "Original_Cola", alt: "오리지널 콜라", price: 1000, quantity: 10 },
    { name: "Violet_Cola", alt: "바이올렛 콜라", price: 1000, quantity: 10 },
    { name: "Yellow_Cola", alt: "옐로우 콜라", price: 1000, quantity: 10 },
    { name: "Cool_Cola", alt: "쿨 콜라", price: 1000, quantity: 10 },
    { name: "Green_Cola", alt: "그린 콜라", price: 1000, quantity: 10 },
    { name: "Orange_Cola", alt: "오렌지 콜라", price: 1000, quantity: 10 },
];

// 자판기 음료 배치
const $drinkItems = $vendingMachine.querySelectorAll(".drink_items");

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
function addComma(int) {
    const intToArray = int.toString().split("");
    for (let i = intToArray.length - 3; i > 0; i -= 3) {
        intToArray.splice(i, 0, ",");
    }
    return intToArray.join("");
}

class Builder {
    constructor(seedMoney) {
        this.seedMoney = seedMoney;
        this.readyMoney = seedMoney;
        this.insertedMoney = 0;
        this.balance = 0;
    }

    $btnInsertMoney = $vendingMachine.querySelector(".btn-insert_money");
    $inpInsertMoney = $vendingMachine.querySelector(".inp-insert_money");
    $btnReturnChange = $vendingMachine.querySelector(".btn-change");
    $balance = $vendingMachine.querySelector(".balance > .txt-right");
    $inMyWallet = $wallet.querySelector(".txt-right");

    activate() {
        this.$btnInsertMoney.addEventListener("click", this.insertMoney.bind(this));
        this.$btnReturnChange.addEventListener("click", this.returnChange.bind(this));
    }

    insertMoney() {
        if (parseInt(this.$inpInsertMoney.value) > this.readyMoney) {
            alert("소지금을 초과하였습니다.");
            this.$inpInsertMoney.value = null;
        } else if (parseInt(this.$inpInsertMoney.value) <= 0) {
            alert("0과 음수는 입금이 불가능합니다.");
            this.$inpInsertMoney.value = null;
        } else {
            this.readyMoney -= parseInt(this.$inpInsertMoney.value);
            this.insertedMoney += parseInt(this.$inpInsertMoney.value);
            this.balance += parseInt(this.insertedMoney);
            this.updateBalance();
            this.updateReadyMoney();
            this.$inpInsertMoney.value = null;
            this.insertedMoney = 0;
        }
    }

    returnChange() {
        this.readyMoney += this.balance;
        this.balance = 0;
        this.updateBalance();
        this.updateReadyMoney();
    }

    updateBalance() {
        this.$balance.textContent = `${addComma(this.balance)} 원`;
    }

    updateReadyMoney() {
        this.$inMyWallet.textContent = `${addComma(this.readyMoney)} 원`;
    }

    pickItem() {}
}

const machine = new Builder(25000);
machine.updateReadyMoney(machine.seedMoney);
machine.activate();
