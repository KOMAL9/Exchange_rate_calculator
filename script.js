
const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');
//we cant update amount two by self.
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');


// Fetch exchange rates and update the DOM   
function calculate() {
  console.log("RAN");

  //the 3-letter currency abbr
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  
  /* `https://v6.exchangerate-api.com/v6/7c4694aca7566a45d6a60cf6/latest/${currency_one}` */
  /*skipped*/

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json()) 
    .then(data => {
       console.log(data);

      const rate = data.rates[currency_two];

      console.log(rate);
      
      // only amount2 and rateEL container values are changed
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(3);
    });
}


// Event listeners -------------------------------------------------------------------------- 
/* change any of the 4 parameters */
currencyEl_one.addEventListener('change', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
amountEl_two.addEventListener('input', calculate);


swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});


calculate(); // intial call on mounting
