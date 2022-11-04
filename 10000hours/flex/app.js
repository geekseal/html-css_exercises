// 기본 DOM
const $ruleInput = document.querySelector(".rule-input");
const $ruleResult = document.querySelector(".rule-result");
const $loadingResult = document.querySelector(".rule-loading_result");
const $modalGo = document.querySelector(".modal-go-section");

// buttons
const startBtn = $ruleInput.querySelector(".btn-submit");
const openBtn = $ruleResult.querySelector(".btn-go");
const shareBtn = $ruleResult.querySelector(".btn-share");
const closeBtn = $modalGo.querySelector(".btn-close");

// button 클릭 시 새로고침 되지 않기 위함?
// $ruleInput.querySelector(".input-form").addEventListener("click", event => {
//     event.preventDefault();
// });

function calculate() {
    if (!$ruleInput.querySelector("#inpField").value || !$ruleInput.querySelector("#inpTime").value) {
        alert("비정상 접근입니다.");
        return;
    } else if (parseInt($ruleInput.querySelector("#inpTime").value) > 24) {
        // parseInt 안해도 자동 타입 변환 해줘서 되긴 됨.
        alert("하루는 24시간입니다.");
        return;
    }

    $ruleResult.style.display = "none";

    const fieldVal = document.querySelector("#inpField").value;
    const timeVal = parseInt(document.querySelector("#inpTime").value);
    console.log(fieldVal, timeVal);

    $loadingResult.style.display = "block";
    $loadingResult.scrollIntoView({ behavior: "smooth" });

    setTimeout(function () {
        const $resultField = $ruleResult.querySelector("#resultField");
        const $resultTime = $ruleResult.querySelector("#resultTime");

        $loadingResult.style.display = "none";
        $ruleResult.style.display = "block";

        $resultField.textContent = fieldVal;
        $resultTime.textContent = Math.round(10000 / parseInt(timeVal));
    }, 2000);
}

function openModal() {
    $modalGo.style.display = "flex";
}

function closeModal() {
    $modalGo.style.display = "none";
}

function copyUrl() {
    // 1. 구버전, 2. 신버전, 3. clipboard.js 라이브러리 사용 방법
    /* 1. -> 만나면 수정 필요
    let url = window.location.href;
    console.log(url);
    let temp = document.createElement("input");
    temp.value = url;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
    alert("URL이 복사되었습니다.");
    */

    // 2.
    let url = window.location.href;
    navigator.clipboard
        .writeText(url)
        .then(() => {
            alert("URL이 복사되었습니다.");
        })
        .catch(err => {
            alert("URL이 복사되지 않았습니다. 호환되는 브라우저가 아닙니다.");
            console.log(err);
        });
}

startBtn.addEventListener("click", calculate);
openBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
shareBtn.addEventListener("click", copyUrl);

window.onclick = function (event) {
    if (event.target === $modalGo) {
        closeModal();
    }
};
