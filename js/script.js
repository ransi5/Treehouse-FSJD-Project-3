/*
Treehouse Techdegree:
FSJS Project 3 - Interactive Form
*/

/*
Global Variables
1   variable for input field with `name` id
2   variable for `other` job role option field
3   variable for `job Role` select field
4   variable for 'Shirt design' select field
5   variable for selecting shirt color select field
6   variable for activities input field
7   variable for totalCost used to calculate total cost of activities declared as global
8   variable for payment method `#payment`
9   variable for credit card payment method form `#credit-card`
10  variable for paypal payment method instructions `#paypal`
11  variable for bitcoin payment instructions `#bitcoin`
12  variable for children of 'payment method' select options
13  variable for `email` input element
14  variable for `register for activities section`
15  variable to get user `card number`
16  variable to get user `zip code`
17  variable to get user `cvv` number
*/

const name = getId('name');     //1
const otherJob = getId('other-job-role');     //2
const jobRole = getId('title');     //3
const shirtDesign = getId('design');    //4
const shirtColor = getId('color');      //5
const register = selectAll('#activities input[type=checkbox]');   //6
let totalCost = 0;      //7
const paymentMethod = getId('payment');     //8
const creditCard = getId('credit-card');      //9
const payPal = getId('paypal');       //10
const bitCoin = getId('bitcoin');       //11
const paymentOption = paymentMethod.children;     //12
const email = getId('email');       //13
const registerActivity = getId('activities');     //14
const cardNumber = getId('cc-num');     //15
const zipCode = getId('zip');         //16
const cvv = getId('cvv');         //17
const formSubmit = document.querySelector('form');

/*
code script
1     the code below will bring focus to the name input field on load
2     the code below will set default display `Other Job Role` input field to none
3     the `color` field for shirt set default disabled till the user selects a shirt color
4     the function will hide `#payPal` payment instruction as this to be displayed only when user selects 'paypal'
      as payment method
5     the function will hide `#bitcoin` payment instruction as this to be displayed only when user selects 'bitcoin'
      as payment method
6     The code will set 'credit card' method as default payment as credit cart payment form is displayed by default
*/

name.focus();     //1

otherJob.style.display = 'none';    //2

shirtColor.disabled = true;     //3

hide(payPal);     //4

hide(bitCoin);      //5

paymentMethod.selectedIndex = '1';      //6

/*
Program to display 'other job role' input field when user selects other in the select field
the program includes an event listener and a function
1   Event lsitener will listen for change in value of `Job Role` select field
2   the `displayOtherJob` function will display `Other job role` input field based on users
    selection and bring focus to it.
2   function scope variable gets the value of selected option for `job role`
2.2 the `displayOtherJob` function's conditional statement will check the value of selected field.
    if the value is `other` it will display other job role input field and bring it to focus
    if user later selects other field the other job role input field will set to its default hidden state
*/

jobRole.addEventListener('change', displayOtherJob);    //1

function displayOtherJob(event) {     //2
  let jobRoleValue = event.target.value;    //2.1

  if ( jobRoleValue == 'other') {     //2.2
    otherJob.style.display = 'initial';
    otherJob.focus();
  } else {
    otherJob.style.display = 'none';
  }
}

/*
This program will enable `color` field and relevant color option to display based on user shirt `design` choice
1   Event listener listens for change in `shirt Design` select field and exceute `setShirtColor` function
2   the `setShirtColor` function will enable the `shirt color` select field and display relevant options depending
    on users `shirt design` selection
2.1 the code enables `shirt color` selection field
2.2 variable gets users `shirt design` selected value
2.3 the for statements loops over all the chidren of `shirt color` select field
    the loops starts from `1` as the first child is merely a prompt to select an option.
2.4 the conditional statements checks if the `data-theme` value matches the user selected 'shirt design'
    if true it displays all the color options for users selected `shirt design` and sets the rest of option to hidden
2.5 Sets the default `selected Index` for `shirt color` field to the prompt option if the users changes 'shirt design selection'
*/

shirtDesign.addEventListener('change', setShirtColor);  //1

function setShirtColor() {    //2

  shirtColor.disabled = false;    //2.1
  shirtDesignValue = shirtDesign.value;     //2.2

  for (var i = 1; i < shirtColor.length; i++) {    //2.3

    if ( shirtColor[i].getAttribute('data-theme') === shirtDesignValue) {    //2.4
      shirtColor[i].hidden = false;
    } else {
      shirtColor[i].setAttribute('hidden', 'true');
    }
  }
  shirtColor.selectedIndex = '0';     //2.5
}

/*
This program will calculate and print `Total Cost` in real time and disable activities which are at same day and time
1   `forEach` lood attaches eventlistener to every child element of `#activities` of type `checkbox`
1.1 the `getTotalCost` function in the event listener will get cost of each activity and print the `totalCost`
1.2 the `disablSameTimeActivity' function will disable or enable all activities which occur at same time depending on
    whether user has selected or unselected an activity
2   `event` parameter passed to `getTotalCost` function to get `event.target` attribute `data-cost'
2.1 `totalEle` variable gets `#activities-cost` variable where total cost of activities will be printed
2.2 `cost` variable gets cost of the activity from the `data-cost` attribute of the activity clickbox just checked by user
2.3 the conditional statement adds cost to the `totalCost` global variable if activity is checked
    the `totalCost` is set as global to avoid reset to 0 every time an activity is checked
    possible other solution is to get the total cost from 'totalEle' variable everytime an activity is checked
    the problem with above alternative is more code will be required to slice the $ vlaue from string
2.4 the else statements deducts cost of the activity from total cost if the activity is deselected by user
2.5 prints total Cost after every click
3   'event' paramet passed to the `disablSameTimeActivity' functions
3.1 using `event` parameter the day and time of the activity selected/unselected by user is got and stored in `activityTime` variable
3.2 all activities with `data-day-and-time` are got and stored in `dayAndTime` variable
3.3 the conditiponal statement checks if user selected/unselcted the activity and runs a block of Code
3.4 if user has selected an activity using `foreach` loop the `data-day-and-time` of each activity is got
3.5 the condtional statement checks if the activity in loop is the same as the activity selected by user if not it then matches
    the value each activity's day and time with `activityTime` if True the input item is disabled to avoid the user
    from selecting conflicting activities
3.6 if user has deselected an activity for any reason this block of code will enable all activities of same
    day and time which were previously disabled
3.7 `forEach` loop is used to get day and time of each activity
3.8 the conditional statment matches day and time of every activity with 'activityTime' is true it enables the activity which
    was previusly disabled
*/

register.forEach((item, i) => {   //1
  item.addEventListener('change', (event) => {
    getTotalCost(event);      //1.1
    disableSameTimeActivity(event);     //1.2
  });
});


function getTotalCost(event) {      //2
  let totalEle = getId('activities-cost');      //2.1
  let cost = event.target.getAttribute('data-cost');      //2.2

  if (event.target.checked == true) {       //2.3
    totalCost = totalCost + parseInt(cost);
  } else {                                  //2.4
    totalCost = totalCost - parseInt(cost);
  }
  totalEle.innerHTML = `Total: $${totalCost}.00`;       //2.5
}

function disableSameTimeActivity(event) {         //3
  let activityTime = event.target.getAttribute('data-day-and-time');      //3.1
  let dayAndTime = selectAll(`#activities input[data-day-and-time]`);     //3.2

  if (event.target.checked == true) {           //3.3
    dayAndTime.forEach((item, i) => {           //3.4
      if ( item.checked == false && item.getAttribute('data-day-and-time') == activityTime ) {      //3.5
        item.disabled = true;
      }
    });
  } else {                          //3.6
    dayAndTime.forEach((item, i) => {       //3.7
      if ( item.getAttribute('data-day-and-time') == activityTime ) {   //3.8
        item.disabled = false;
      }
    });
  }
}

/*
This program will display payment method instructions or form is response to user selection
1   Event listener attached to select field for `payment method`. It listenns for'change event in value.
1.1 `displayPaymentMethod` function with event parameter is executed whenever user makes a selection of `payment method`
2   function 'displayPaymentMethod' with event parameter will display relevant form or instruction based on user selection
2.1 the selection made by user is got using `event.target` and stored in `payMethod` variable
2.2 for the sake of minimalist, simple code JS `switch` instead of if and else conditional statement
    the switch statement will depending on `payMethod` value run a block of code to hide and display relevant information.
*/

paymentMethod.addEventListener('change', (event) => {     //1
  displayPaymentMethod(event);          //1.1
})

function displayPaymentMethod(event){       //2
  let payMethod = event.target.value;       //2.1

  switch (payMethod) {        //2.2
    case 'credit-card':
      hide(payPal);
      hide(bitCoin);
      show(creditCard);
      break;
    case 'paypal':
      hide(creditCard);
      hide(bitCoin);
      show(payPal);
      break;
    case 'bitcoin':
      hide(creditCard);
      hide(payPal);
      show(bitCoin);
      break;
  }
}

/*
form Validatiion Program
*/

/*
Name Validatiion Program
This program will run the validation program as the user types. It will detect errors and either coorect it or give
prompt about what the error is for correction
1   The event listener will listen for 'keyup' event as the user types and pass the `event` parameter in the function
1.1 The event listener will fire run the `validateName` function
2   The `validateName` function will match the user input to a regex pattern and based on it will provide reali time
    validation and correction
2.1 The variable will get user input in the name field
2.2 The variable will get parent element of the name input field
2.3 The regex pattern the user input is matched against
    The pattern requires that the name be atleast two alphabet and one word long
    The First alphabet be capital case followed by lower case alphabets
    Only English alphabet, ' and - are allowed
2.4 The `formatName` function will auto correct for correct alphabet capitalization and only allow one space inbetween words
2.5 The conditional state will test the user input against regex pattern and run a block of code
    `if` input matches the pattern it will add 'valid' class to the `parent` element and hide `error message` display
    `else` it will run conditional statemtents to identify the error and give relevant error message
    first it will set the display or error messsage handling element to `initial`
    second it will check if the parent element already has `not-valid` class. this is done so the error message does not change
    until the user has corrected the first error. the option to add multiple message was not applied based of safe assumption on
    users intelligence inorder to avoid confusion, to keep user focussed on one task at a time
    if 'not-valid' is not applied it will run other conditional statments to identify the type of error and give appropriate message
*/

name.addEventListener('keyup', (event) => {   //1
  validateName(event)       //1.1
})

function validateName(event) {        //2
  let userName = name.value;          //2.1
  let parent = name.parentNode;         //2.2
  let pattern = /(^[A-Z][a-z\'\-]+\s?)([A-Z][a-z\'\-]+\s?)*$/g;      //2.3

  formatName(name.value);       //2.4

  if ( event.type == 'keyup' && !userName ) {        //2.4
    parent.className = '';
    parent.lastElementChild.style.display = 'none';
  } else if (pattern.test(userName)) {       //2.5
    parent.className = 'valid';
    parent.lastElementChild.style.display = 'none';
    return true;
  } else {
    parent.lastElementChild.style.display = 'initial';
    if ( !parent.classList.contains('not-valid') ) {
      if (userName.length == 1 || userName.charAt(userName.length-2) == ' ') {
        parent.lastElementChild.innerHTML = 'all words in "Name" must be more than one character long';
      } else if ( !userName ) {
        parent.lastElementChild.innerHTML = 'Name field cannot be blank';
      } else {
        parent.lastElementChild.innerHTML = `"${userName.charAt(userName.length - 1)}" is not allowed. Only English aplhabet, - and ' characters are allowed.`
      }
      parent.className = 'not-valid';
      return false;
    }
  }
}

/*
3   The `formatName` function will auto correct for correct alphabet capitalization and only allow one space inbetween words, the string
    to be formatted is passed as a parameter in the function
3.1 the string is allocated to `userName` variable
3.2 'formattedName' variable used to store the formatted string is set to empty; as the program uses loop statements to format the
    string everytime the function is triggered
3.3 `for` loop is run based on the length of the string
3.4 this condition capitalizes the first character and every character preceded by a space
3.5 this else if statement adds space in the string to `formattedName`
3.6 this else if statement formats all other characters to lower case
3.7 this code prints the formatted name in the 'name' input field while replacing all instances of double space with single space
*/

function formatName(str) {      //3
  userName = str;         //3.1
  let formattedName = '';       //3.2

  for (var i = 0; i < userName.length; i++) {     //3.3

    if (i == 0 || userName.charAt(i-1) == ' ') {      //3.4
       formattedName += userName.charAt(i).toUpperCase();
     } else if (userName.charAt(i) == ' ') {        //3.5
        formattedName += userName.charAt(i);
     } else if (userName.charAt(i-1) != ' ') {      //3.6
       formattedName += userName.charAt(i).toLowerCase();
     }
  }
   name.value = formattedName.replace(/\s\s/g, ' ');      //3.7
}

/*
`Email` Validatiion Program
1   The event listener will listen for 'blur' event and pass the `event` parameter in the function
1.1 The evnet listner will run the `validateEmail` function with `event` as a parameter
2   The `validateEmail` function will match user inputted email to regex pattern and provide appropriate
    messsage signalling success or error
2.1 the `userEmail` variable gets the value in the `email` input field
2.2 The 'email' input field parent element is allocated to `parent` elements
2.3 The RegEx pattern to validate the `userEmail` against is stored in `pattern` Variable
    reference `https://www.formget.com/regular-expression-for-email/`
2.4 the conditional statments test the user `email` input to RegEx `pattern`
    if `userEmail` is empty no action takes place
2.5 if `true` it adds the `valid` to `parent` element and hides error message if already displayed
2.6 if `false` it displays appropriate error message; adds `not-valid` class to parent element and
    brings focus back to `email` input field
*/

email.addEventListener('blur', (event) => {   //1
  validateEmail(event)       //1.1
})

function validateEmail(event) {     //2
  let userEmail = email.value;        //2.1
  parent = email.parentNode;            //2.2
  pattern = /^\w+[\.\w\-]*@([\w\-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/ig;   //2.3

  if ( event.type == 'blur' && !userEmail ) {        //2.4
    parent.className = '';
    parent.lastElementChild.style.display = 'none';
  } else if (pattern.test(userEmail)) {               //2.5
    parent.className = 'valid';
    parent.lastElementChild.style.display = 'none';
    return true;
  } else {                                              //2.6
    parent.lastElementChild.style.display = 'initial';
    parent.className = 'not-valid';
    if ( event.type == 'blur' ) {email.focus();}
    return false;
  }
}

/*
activities Validatiion Program
1   The 'validateActivities' function will vlaidate if atleast one activity is selected on form submission
1.1 The 'checked' will count the number of activities checked. initial value is set to 0;
1.2 The `forEach` checks all input field with type checkbox which are checked and adds 1 to `checked` variable
    for each checked activity
1.3 The conditional statement return true and removes error message display if `checked` variable value
    is greater than 0
1.4 the else statement displays error message and return false if `checked` variable value is 0
*/

function validateActivities() {     //1
  var checked = 0;                      //1.1
  register.forEach((activity, i) => {   //1.2
    if ( activity.checked ) {
      checked++;
    }
  });
  if ( checked > 0 ) {                                          //1.3
    registerActivity.lastElementChild.style.display = 'none';
    return true;
  } else {                                                      //1.4
    registerActivity.lastElementChild.style.display = 'initial';
    return false;
  }
}

/*
Payment Method Validatiion Program
This program will check if all credit card payment fields have valid informtion
*/

/*
Credit Card number Validatiion Program
1   Event listener set to trigger on `blur` event added to `cardNumber` variable
1.1 function 'validateCCNumber' will run when the event is triggered
2   validateCCNumber will validate the user input if it is either 13 or 16 digits long with one
    space. It will also format user input so there is a space after every 4 digits regardless of space
    and - charcters inputted by user
2.1 user input is formatted by formatCCNo and allocated to variable `userCCNo`
2.2 variable `parent` represents the parent node of `cardNumber`
2.3 RegEx statement stored in pattern variable.
    `(\d{4}[\ \-]?){3}` allows 4 consecutive digits followed by space or -
    `([\d{1}]?|[\d{4}]?[\ \-]?)*` allows for last set to be either 1 digit or 4 consecutive digits followed by space or -
2.4 the first conditional statement will set all properties to default if event type is blur and user has
    provided no input
2.5 if user input matches regex pattern, `valid` class will be added to `parent` and error message if displayed wil be hidden
2.6 else statement will display error message add `not-valid` class to parent and bring focus back to CC No input field
*/

cardNumber.addEventListener('blur', (event) => {   //1
  validateCCNumber(event)       //1.1
})

function validateCCNumber(event) {     //2
  let userCCNo = formatCCNo(event);        //2.1
  parent = cardNumber.parentNode;            //2.2
  pattern = /^(\d{4}[\ \-]?){3}([\d{1}]|[\d{4}][\ \-]?)*$/g;   //2.3

  if (event.type == 'blur' && !userCCNo) {        //2.4
    parent.className = '';
    parent.lastElementChild.style.display = 'none';
  } else if (pattern.test(userCCNo)) {               //2.5
    parent.className = 'valid';
    parent.lastElementChild.style.display = 'none';
    return true;
  } else {                                              //2.6
    parent.lastElementChild.style.display = 'initial';
    parent.className = 'not-valid';
    if (event.type == 'blur') {cardNumber.focus()};
    return false;
  }
}

/*
3   `formatCCNo` function will format user input and add or delete unnecessay space and characters
3.1 user input is stored in `userCCNo` variable
3.2 regex pattern with paranthesis for inputs to match and format
3.3 `replace` statement is run on user input and user input is formatted as per `pattern` regex and stored in userCCNo
3.4 the `cardNumber` value field is updated with the formatted number
3.5 return the formatted credit card Number
*/

function formatCCNo(event) {                    //3
  userCCNo = cardNumber.value;                //3.1
  pattern = /^(\d{4})[\ \-]*(\d{4})[\ \-]*(\d{4})[\ \-]*([\d{1}?]|\d{4})[\ \-]*?$/g;      //3.2
  userCCNo = userCCNo.replace(pattern, '$1 $2 $3 $4');                                //3.3
  cardNumber.value = userCCNo;                                                //3.4
  return userCCNo;                                                              //3.5
}

/*
US Zip code Validatiion Program
1   Event listener set to trigger on `blur` event added to `zipCode` variable
1.1 function 'validateZipCode' will run when the event is triggered
2   `validateZipCode` will validate the user input if it is either 5 or 9 digits long with one
    space. It will also format user input so there is a space after every 5 digits regardless of space
    and - charcters inputted by user
2.1 user input is formatted by `formatZipCode` and allocated to variable `userZipCode`
2.2 variable `parent` represents the parent node of `zipCode`
2.3 RegEx statement stored in pattern variable.   https://regexland.com/zip-codes/
    `\d{5}([\-\ ]?` allows 5 consecutive digits followed by optional space or -
2.4 the first conditional statement will set all properties to default if event type is blur and user has
    provided no input
2.5 if user input matches regex pattern, `valid` class will be added to `parent` and error message if displayed wil be hidden
2.6 else statement will display error message add `not-valid` class to parent and bring focus back to CC No input field
*/

zipCode.addEventListener('blur', (event) => {   //1
  validateZipCode(event)       //1.1
})

function validateZipCode(event) {     //2
  let userZipCode = formatZipCode(event);        //2.1
  parent = zipCode.parentNode;            //2.2
  pattern = /^\d{5}$/g;   //2.3

  if (event.type == 'blur' && !userZipCode) {        //2.4
    parent.className = '';
    parent.lastElementChild.style.display = 'none';
  } else if (pattern.test(userZipCode)) {               //2.5
    parent.className = 'valid';
    parent.lastElementChild.style.display = 'none';
    return true;
  } else {                                              //2.6
    parent.lastElementChild.style.display = 'initial';
    parent.className = 'not-valid';
    if (event.type == 'blur') {zipCode.focus();}
    return false;
  }
}

/*
3   `formatZipCode` function will format user input and add or delete unnecessay space and characters
3.1 user input is stored in `userZipCode` variable
3.2 regex pattern with paranthesis for inputs to match and format
3.3 `replace` statement is run on user input and user input is formatted as per `pattern` regex and stored in `userZipCode`
3.4 the `zipCode` value field is updated with the formatted number
3.5 return the formatted Zip Code Number
*/

function formatZipCode(event) {                    //3
  userZipCode = zipCode.value;                //3.1
  pattern = /^(\d)[\-\ ]*(\d)[\-\ ]*(\d)[\-\ ]*(\d)[\-\ ]*(\d)[\-\ ]*$/g;      //3.2
  userZipCode = userZipCode.replace(pattern, '$1$2$3$4$5');                                //3.3
  zipCode.value = userZipCode;                                                //3.4
  return userZipCode;                                                              //3.5
}

/*
CVV Validatiion Program
1   Event listener set to trigger on `blur` event added to `cvv` variable
1.1 function 'validateCvv' will run when the event is triggered
2   `validateCvv` will validate the user input if it is 3 digits long. It will also format user input
    so there is no space before or after every digit
2.1 user input is formatted by `formatCvv` and allocated to variable `userCvv`
2.2 variable `parent` represents the parent node of `cvv`
2.3 RegEx statement stored in pattern variable.
    `^\d{3}$` allows for 3 consecutive digits
2.4 the first conditional statement will set all properties to default if event type is blur and user has
    provided no input
2.5 if user input matches regex pattern, `valid` class will be added to `parent` and error message if displayed wil be hidden
2.6 else statement will display error message add `not-valid` class to parent and bring focus back to cvv input field
*/

cvv.addEventListener('blur', (event) => {   //1
  validateCvv(event)       //1.1
})

function validateCvv(event) {     //2
  let userCvv = formatCvv(event);        //2.1
  parent = cvv.parentNode;            //2.2
  pattern = /^\d{3}$/g;   //2.3

  if (event.type == 'blur' && !userCvv) {        //2.4
    parent.className = '';
    parent.lastElementChild.style.display = 'none';
  } else if (pattern.test(userCvv)) {               //2.5
    parent.className = 'valid';
    parent.lastElementChild.style.display = 'none';
    return true;
  } else {                                              //2.6
    parent.lastElementChild.style.display = 'initial';
    parent.className = 'not-valid';
    if (event.type == 'blur') {cvv.focus();}
    return false;
  }
}

/*
3   `formatCvv` function will format user input and delete unnecessay space
3.1 user input is stored in `userCvv` variable
3.2 regex pattern with paranthesis for inputs to match and format
3.3 `replace` statement is run on user input and user input is formatted as per `pattern` regex and stored in `userCvv`
3.4 the `cvv` value field is updated with the formatted number
3.5 return the formatted cvv Number
*/

function formatCvv(event) {                    //3
  userCvv = cvv.value;                //3.1
  pattern = /^[\ ]*(\d)[\ ]*(\d)[\ ]*(\d)[\ ]*$/g;      //3.2
  userCvv = userCvv.replace(pattern, '$1$2$3');         //3.3
  cvv.value = userCvv;                                  //3.4
  return userCvv;                                        //3.5
}

/*
Validatiion on form submission Program
1   This program will check if all required user input fields have valid data and submit form if true.
1.2 The `validPayment` function will validate credit card payment fields if user payment method
    selection is `credit-card`. for other selections it wall validate `true`.
*/

formSubmit.addEventListener('submit', (event) => {      //1
  let validName = validateName(event);
  let validEmail = validateEmail(event);
  let validActivities = validateActivities(event);
  var validPayMethod = validPayment();

  function validPayment() {                             //1.2
    let validCCNumb = validateCCNumber(event);
    let validZip = validateZipCode(event);
    let validCvv = validateCvv(event);
    if ( paymentMethod.value == 'credit-card' ) {
      if (validCCNumb && validZip && validCvv) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
  if ( validName && validEmail && validActivities && validPayMethod ) {
    formSubmit.submit();
  } else {
    event.preventDefault();
  }
})

/*
Accessbility program not already programmed
*/

/*
Accessbility program for activities in focus
this program will add focus class to the activity parent when in focus and remove the same on blur event
*/

register.forEach((activity, i) => {
  activity.addEventListener('focus', (event) => {
    parent = event.target.parentNode;
    parent.classList.add('focus');
  })
  activity.addEventListener('blur', (event) => {
    parent = event.target.parentNode;
    parent.classList.remove('focus');
  })
});

/*
Helper functions
These function are meant to ease typing same code repeatedly
1     The `getId` is a helper function will select elements by ID
2     The `selectAll` is a helper function for selecting multiple elements usine querySelectorAll
3     The `hide` function set dsiplay to none
4     the 'show' function will set display to block
*/

function getId(id) {      //1
  return document.getElementById(id);
}

function selectAll(ele) {       //2
  return document.querySelectorAll(ele);
}

function hide(ele) {      //3
  ele.style.display = 'none'
}

function show(ele) {      //4
  ele.style.display = 'block';
}
