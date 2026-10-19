let totalBalance = document.getElementById("total-balance");
let totalIncome = document.getElementById("total-income");
let totalExpense = document.getElementById("total-expense");
let description = document.getElementById("desc-input");
let inputAmount = document.getElementById("amount-input");
let selectType = document.getElementById("type-select");
let addBtn = document.getElementById("add-trans-btn");
let tranListUl = document.getElementById("transaction-list");

function updateTotals() {
  let allItems = document.querySelectorAll(".trans-item");

  let incomeTotal = 0;
  let expenseTotal = 0;

  allItems.forEach(function (item) {
    let amt = Number(item.dataset.amount);
    let itemType = item.dataset.type;

    if (itemType === "income") {
      incomeTotal += amt;
    } else {
      expenseTotal += amt;
    }
  });

  let balance = incomeTotal - expenseTotal;

  totalIncome.innerText = `+$${incomeTotal.toFixed(2)}`;
  totalExpense.innerText = `-$${expenseTotal.toFixed(2)}`;
  totalBalance.innerText = `$${balance.toFixed(2)}`;
}

addBtn.addEventListener("click", function () {
  let userInput = description.value.trim();
  let userAmount = Number(inputAmount.value);
  let type = selectType.value;

  // Simple validation: disallow empty desc or amount <= 0
  if (userInput === "" || isNaN(userAmount) || userAmount <= 0) {
    return;
  }

  // 1. Create list item
  let newLi = document.createElement("li");
  newLi.className = `trans-item ${type}-item`;
  newLi.dataset.amount = userAmount;
  newLi.dataset.type = type;

  // 2. Info container (matches your CSS structure)
  let infoDiv = document.createElement("div");
  infoDiv.className = "trans-info";

  let descSpan = document.createElement("span");
  descSpan.className = "trans-desc";
  descSpan.innerText = userInput;

  let amtSpan = document.createElement("span");
  amtSpan.className = "trans-amount";
  amtSpan.innerText = (type === "income" ? "+$" : "-$") + userAmount.toFixed(2);

  infoDiv.appendChild(descSpan);
  infoDiv.appendChild(amtSpan);
  newLi.appendChild(infoDiv);

  // 3. Delete button
  let deleteBtn = document.createElement("button");
  deleteBtn.className = "trans-delete";
  deleteBtn.innerText = "✕";
  deleteBtn.addEventListener("click", function () {
    newLi.remove();
    updateTotals(); // Recalculate after deleting!
  });
  newLi.appendChild(deleteBtn);

  // 4. Append to list
  tranListUl.appendChild(newLi);

  // 5. Update numbers and clear fields
  updateTotals();
  description.value = "";
  inputAmount.value = "";
});

let filterTabs = document.querySelectorAll(".filter-tab");

filterTabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    // 1. Highlight clicked tab, unhighlight others
    filterTabs.forEach(function (t) {
      t.classList.remove("active");
    });
    tab.classList.add("active");

    // 2. Read which filter was clicked: "all", "income", or "expense"
    let selectedType = tab.dataset.type;

    // 3. Grab all transactions currently in the DOM
    let allItems = document.querySelectorAll(".trans-item");

    // 4. Decide show vs hide for each item
    allItems.forEach(function (item) {
      let itemType = item.dataset.type;

      if (selectedType === "all") {
        item.style.display = "flex";
      } else if (selectedType === itemType) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  });
});