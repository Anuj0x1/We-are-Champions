import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://wearechamp-39596-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const infoInDB = ref(database, "info-list");

const inputFieldEl = document.getElementById("input-field");
const btnEle = document.getElementById("btn");
const ulEle = document.getElementById("list-info");

btnEle.addEventListener("click", function () {
  let inputvalue = inputFieldEl.value;

  push(infoInDB, inputvalue);

  clearOutInputField();
});

onValue(infoInDB, function (snapshot) {
  if (snapshot.exists()) {
    let listItem = Object.entries(snapshot.val());

    clearoutInfoItem();

    for (let i = 0; i < listItem.length; i++) {
      let itemInfo = listItem[i];

      renderOutInfoItem(itemInfo);
    }
  } else {
    ulEle.innerHTML = `<p> No items here yet...</p>`;
  }
});

function renderOutInfoItem(value) {
  let valueID = value[0];
  let valueItem = value[1];

  let newEl = document.createElement("li");

  newEl.textContent = valueItem;

  newEl.addEventListener("click", function () {
    let exactlocationinDB = ref(database, `info-list/${valueID}`);

    remove(exactlocationinDB);
  });

  ulEle.append(newEl);
}

function clearOutInputField() {
  inputFieldEl.value = "";
}

function clearoutInfoItem() {
  ulEle.innerHTML = "";
}
