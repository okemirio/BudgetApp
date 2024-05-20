// buttons setbutton and checkbutton
setBtn = document.querySelector('.SetBtn');
CheckButton = document.querySelector('.Check-BTN');

// inputs
nums = document.querySelector('.nums');
titleProduct = document.querySelector('.Title-Product');
costProduct = document.querySelector('.Cost-Product');

// html DOMSelector
TotalBudget = document.querySelector('.Total-budget');
totalExpense = document.querySelector('.Total-expenses');
totalBalance = document.querySelector('.Balance');
products = document.querySelector('.products');

TotalBudget.innerHTML = `<h3>Total Budget</h3>
<h3>0</h3>`
totalExpense.innerHTML = `<h3>Total Expenses</h3>
<h3>0</h3>`
totalBalance.innerHTML = `<h3>Total Balance</h3>
<h3>0</h3>`

setBtn.addEventListener('click', function () {
    const budgetAmountValue = nums.value;
    assignBudget(budgetAmountValue);
    balance();
});

CheckButton.addEventListener('click', function () {
    const productTitle = titleProduct.value;
    const productCost = costProduct.value;

    addExpense(productTitle, productCost);
    var expensepush ={
        expTitle: productTitle,
        expcost: productCost
    }
    expenseList.push(expensepush);
    productValues();
});

expenseList = [

]

var totalBudgetValue = 0;

function assignBudget(data) {
    if (data !== ' ') {
        totalBudgetValue += parseInt(data);
        TotalBudget.innerHTML = `<h3>Total Budget</h3>
        <h3>${totalBudgetValue}</h3>`
        nums.value = '';
    } else {
        alert('A budget amount is required');
    }
    balance();
}
console.log(totalBudgetValue)

var expenseTotal = 0;
function addExpense(expenseTitle, expenseCost) {
    if (totalBudgetValue !== 0) {
        expenseTotal += parseInt(expenseCost);
        totalExpense.innerHTML = `<h3>Expenses</h3>
        <h3>${expenseTotal}</h3>`
        titleProduct.value = '';
        costProduct.value = '';
        balance();
    } else {
        alert("input your budget")
        return 0;
    }
}

var totalBalanceValue = 0;
function balance(){
    console.log("Balance =" + totalBalanceValue)
    console.log("Expense" + expenseTotal);
    totalBalanceValue = totalBudgetValue - expenseTotal;
    totalBalance.innerHTML = `<h3>Balance</h3>
    <h3>${totalBalanceValue}</h3>`
}

function productValues() {
    products.innerHTML = ''
    for (let index = 0; index < expenseList.length; index++) {
          const {expTitle, expcost} = expenseList[index];
          products.innerHTML += `<div class="product">
          <h4>${expTitle}</h4>
            <div class="price">
          <h4>${expcost}</h4>
      </div>
        <div class="icons">
          <i class="fa-solid fa-pen-to-square"></i>
          <i class="fa-solid fa-trash"></i>
        </div>
      </div>`      
    }
}