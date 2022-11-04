class ColaGenerator {
    constructor() {
        this.itemList = document.querySelector(".list-item");
    }

    async setUp() {
        await this.loadData(json => {
            this.colaFactory(json);
        });
        // json 매개변수를 전달하기 위해 콜백 형태로 작성
    }

    async loadData(callback) {
        /*
        const requestObj = new XMLHttpRequest();
        requestObj.open("GET", "src/js/item.json");
        requestObj.send();
        requestObj.onreadystatechange = () => {
            if (requestObj.readyState === 4 && requestObj.status === 200) {
                callback(JSON.parse(requestObj.responseText));
            }
        };
        */

        const response = await fetch("src/js/item.json");

        if (response.ok) {
            // 상태코드가 200~299일 때
            callback(await response.json()); // 응답 본문을 읽으면서 객체 형태로 파싱합니다.
        } else {
            alert("통신 에러!" + response.status);
        }
    }

    colaFactory(data) {
        const docFrag = document.createDocumentFragment();
        data.forEach(item => {
            const items = document.createElement("li");
            const itemTemplate = `
            <button type="button" class="btn-item" data-name="${item.name}" data-inStock="${item.inStock}" data-price="${item.price}" data-img="${item.img}">
                <img src="src/images/${item.img}" alt="" class="img-item" />
                <strong class="tit-item">${item.name}</strong>
                <span class="txt-price">${item.price}원</span>
            </button>
            `;
            items.innerHTML = itemTemplate;
            docFrag.appendChild(items);
        });
        this.itemList.appendChild(docFrag);
    }
}

export default ColaGenerator;
