# Treehouse-FSJD-Project-3


Exceed Expectations grade requirement 1 

"The user is prevented from selecting two activities that are at the same day and time."

the `disableSameTimeActivity` function at line 177 fulfills this requirement

The code is described in indexed comments below

3   'event' parameter passed to the `disablSameTimeActivity' functions

3.1 using `event` parameter the day and time of the activity selected/unselected by user is got and stored in `activityTime` variable

3.2 all activities with `data-day-and-time` are got and stored in `dayAndTime` variable

3.3 the conditiponal statement checks if user selected/unselcted the activity and runs a block of Code

3.4 if user has selected an activity using `foreach` loop the `data-day-and-time` of each activity is got

3.5 the condtional statement checks if the activity in loop is the same as the activity selected by user if not it then matchesthe value each activity's day and time with `activityTime` if True the input item is disabled to avoid the user from selecting conflicting activities 

3.6 if user has deselected an activity for any reason this block of code will enable all activities of same day and time which were previously disabled

3.7 `forEach` loop is used to get day and time of each activity

3.8 the conditional statment matches day and time of every activity with 'activityTime' and if true it enables the activity which was previusly disabled
    
Exceed Expectations grade requirement 2

"At least one required field validates user input in real time as the user interacts with the field."

"At least one required form field provides validation error messages that differ depending on the reason the field is invalid."

"Form fields that have real time validation and conditional error messages are detailed in the project’s README.me file."

The program to meet all the above requirement is coded in `validateName` and `formatName` functions attached to an event listener triggered on `keyup` event at line 261.

This program will run the validation program as the user types. It will detect errors and either correct it or give prompt about what the error is for correction

1   The event listener will listen for 'keyup' event as the user types and pass the `event` parameter in the function

1.1 The event listener will fire run the `validateName` function

2   The `validateName` function will match the user input to a regex pattern and based on it will provide real time validation and correction

2.1 The variable will get user input in the name field

2.2 The variable will get parent element of the name input field

2.3 The regex statement defines the pattern the user input is matched against
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
    
3   The `formatName` function will auto correct for correct alphabet capitalization and only allow one space inbetween words, the string to be formatted is passed as a parameter     in the function

3.1 the string is allocated to `userName` variable

3.2 'formattedName' variable used to store the formatted string is set to empty; as the program uses loop statements to format the string everytime the function is triggered

3.3 `for` loop is run based on the length of the string

3.4 this condition capitalizes the first character and every character preceded by a space

3.5 this else if statement adds space in the string to `formattedName`

3.6 this else if statement formats all other characters to lower case

3.7 this code prints the formatted name in the 'name' input field while replacing all instances of double space with single space


