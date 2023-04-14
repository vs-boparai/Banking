'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  _id: 1,
  accountNumber: 1000,
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  encodedPin: "MTExMQ=="
};

const account2 = {
  _id: 2,
  accountNumber: 1001, 
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  encodedPin: "MjIyMg=="
};

const account3 = {
  _id: 3,
  accountNumber: 1002, 
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  encodedPin: "MzMzMw=="
};

const account4 = {
  _id: 4,
  accountNumber: 1003, 
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  encodedPin: "NDQ0NA=="
};

const accounts = [account1, account2, account3, account4];
let loggedInAccount;

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const createUserName= function (){
  accounts.forEach(element => {
    let userName=element.owner.split(" ")[0];

   element.userName=userName;
  
  });
  console.log(accounts);
 
  
  }
createUserName();

btnLogin.addEventListener("click",(e)=>{
  e.preventDefault();

  let result = false;
  for(let element of accounts)
  {
    if(inputLoginUsername.value === element.userName && btoa(inputLoginPin.value) === element.encodedPin)
    {
     result = true;
     loggedInAccount = element;
    
    //  window.location.href = window.location.origin
     labelBalance.innerHTML= `$ ${calculateBal()}`
     transcation();
     ;
     break;
    }
  }

  result===true ? console.log("Success") : console.log("Wrong username or Password. Please try again!");
});


const calculateBal= function(){
  let calcu = loggedInAccount.movements.reduce((a,b)=>{return (a+b)})
  return calcu;
}

const transcation= function(){
  
  containerMovements.innerHTML = '';
  loggedInAccount.movements.forEach((element)=>{
  if(element>0)
  {
    containerMovements.innerHTML+=`<div class="movements__row">
  <div class="movements__type movements__type--deposit"> deposit</div>
  <div class="movements__value">$ ${element}</div>
</div>`
    
  }
  else
  {
    containerMovements.innerHTML+=`<div class="movements__row">
    <div class="movements__type movements__type--withdrawal">
      withdrawal
    </div>

    <div class="movements__value">$ ${element}</div>
  </div>
</div>`
  }
})
}

const transfer= function(event)
{
  event.preventDefault();
  let mov=Number(inputTransferAmount.value);
accounts.forEach(element=>{
  if(element.accountNumber===Number(inputTransferTo.value))
  {
    console.log(inputTransferTo.value);
    loggedInAccount.movements.push(-mov);
    element.movements.push(mov);
    labelBalance.innerHTML= `$ ${calculateBal()}`
    transcation();
  }
});
  return false;
  
}
const deposits=function(event)
{
  event.preventDefault();
  let deposit= Number(inputLoanAmount.value);
  loggedInAccount.movements.push(deposit);
  labelBalance.innerHTML= `$ ${calculateBal()}`;
  transcation();

  
}
