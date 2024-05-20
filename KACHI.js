// eventlisteners
setBtn = document.querySelector('.SetBtn');
CheckBtn = document.querySelector('.Check-BTN');


// inputs

nums = document.querySelector('.nums');
titleProduct = document.querySelector('.Title-Product');
costProduct = document.querySelector('.Cost-Product');

// dom elements
TotalBudget = document.querySelector('.Total-budget');
totalExpense = document.querySelector('.Total-expenses');
totalBalance = document.querySelector('.Balance');
products = document.querySelector('.products');

TotalBudget.innerHTML = `<h3>Total Budget</h3>
<h3>0</h3>`

totalExpense.innerHTML = `<h3>Total Expense</h3>
<h3>0</h3>`

totalBalance.innerHTML = `<h3>Total Balance </h3>
<h3>0</h3>`

setBtn.addEventListener('click', function () {
    var data = nums.value;
    BudgetProduct(data)


});

CheckBtn.addEventListener('click', function () {
    let productTitle = titleProduct.value;
    let productCost = costProduct.value;
    Budgetexpense(productTitle, productCost);
    pushData(productTitle, productCost)

});

BudgetProductValue = 0;
function BudgetProduct(product) {
    if (product !== '') {
        BudgetProductValue += parseInt(product);
        TotalBudget.innerHTML = `<h3>Total Budget</h3>
        <h3>${BudgetProductValue}</h3>`
        nums.value = '';
    } else {
        alert('A budget amount is required');
    }
    balance();
}


totalExpenseValue = 0;

function Budgetexpense(expTitle, expenseCost) {
    if (BudgetProductValue !== 0) {
        totalExpenseValue += parseInt(expenseCost);
        totalExpense.innerHTML = `<h3>Expenses</h3>
    <h3>${totalExpenseValue}</h3>`
        titleProduct.value = '';
        costProduct.value = '';
    } else {
        alert("input your budget")
        return 0;
    }
    balance()
}
totalBalanceValue = 0;

function balance() {
    totalBalanceValue = BudgetProductValue - totalExpenseValue
    totalBalance.innerHTML = `<h3>Total balance</h3>
    <h3>${totalBalanceValue}</h3>`
}


var expenselist = [];

function pushData(productTitle, productCost) {

    const date = new Date();
    const id = date.getMilliseconds();

    var expensepush = {
        id,
        expTitle: productTitle,
        expcost: productCost
    };
    expenselist.push(expensepush);
    productValues();
};


function productValues() {
    products.innerHTML = '';
    for (let index = 0; index < expenselist.length; index++) {
        const { expTitle, expcost, id } = expenselist[index];
        products.innerHTML += `<div class="product">${index}
          <h4>${expTitle}</h4>
            <div class="price">
          <h4>${expcost}</h4>
      </div>
        <div class="icons">
          <i class="fa-solid fa-pen-to-square" data-id="${id}" id="data-edit"></i>
          <i class="fa-solid fa-trash" data-id="${id}" id="delete-button"></i>
        </div>
      </div>`;
    }
}

products.addEventListener('click', function (event) {
    let deleteButton = event.target.getAttribute('id'); // Get the ID attribute of the clicked element
    let getExpenseID = event.target.getAttribute('data-id');
    let editButton = event.target.getAttribute('id') === 'data-edit'; // Check if the clicked element is the edit button

    if (deleteButton === 'delete-button') { // Check if the clicked element is the delete button
        let IDforExpense = expenselist.findIndex(function (ExpDetails) {
            return ExpDetails.id == getExpenseID;
        });
        cook(IDforExpense);
    }

    if (editButton) { // Check if the clicked element is the edit button
        let IDforExpDetails = expenselist.findIndex(function (ExpSet) {
            return ExpSet.id == getExpenseID;
        });
        titleProduct.value = expenselist[IDforExpDetails].expTitle;
        costProduct.value = expenselist[IDforExpDetails].expcost;
        cook(IDforExpDetails);
    }
});

function cook(deleteID) {
    // Update total balance
    totalBalanceValue += parseInt(expenselist[deleteID].expcost);
    totalBalance.innerHTML = `<h3>Total balance</h3><h3>${totalBalanceValue}</h3>`;

    // Update total expenses
    totalExpenseValue -= parseInt(expenselist[deleteID].expcost);
    totalExpense.innerHTML = `<h3>Total Expense</h3><h3>${totalExpenseValue}</h3>`;

    // Remove expense from the list
    expenselist.splice(deleteID, 1);
    productValues();
}
