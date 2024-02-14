let counter = 999999;

const DISPLAY = document.getElementById('display'); //display is called
const ALERT_EL = document.getElementById('alert'); //alert is called
const ERROR_MSG_OUT_OF_MEMORY = 'Out of memory'; //message is shown if it crosses the limit 999999
const ERROR_MSG_INVALID_RANGE = 'Zero is the low limit'; //message is shown if input is less than zero
function updateDisplay(){
    const numberToString = addPaddingAtStart(counter.toString(), 4, 0); //convert counter to string and pad with zeros if necessary
    const boxCount = numberToString.length;
    const spanElements = DISPLAY.children;

    //removing the extra box after a decrement
    for (let i = spanElements.length - 1;  i > boxCount - 1; i--) {
        DISPLAY.removeChild(spanElements[i]);
    }

    //adding a box after a increment
    for (let i = 0; i < boxCount; i++) {
        if (i < spanElements.length) {
            spanElements[i].innerText = numberToString[i];
        } else {
            addBox();//add a new box if necessary
        }
    }
}

// Function to increment counter
function increment(){
    const boxCount = DISPLAY.children.length;
    counter++;
    if(counter.toString().length === 5 && boxCount === 4) { // Check if counter is 5 digits and box count is 4
        addBox();
    } else if(counter.toString().length === 6 && boxCount === 5) { // Check if counter is 6 digits and box count is 5
        addBox();
    }else if(counter.toString().length > 6) { // Check if counter is greater than 6 digits
        ALERT_EL.innerText = ERROR_MSG_OUT_OF_MEMORY;
        return;
    }
    ALERT_EL.innerText = '';

    updateDisplay();
}

//adding a box function
function addBox() {
    const SPAN = document.createElement('span');
    SPAN.classList.add('box');
    SPAN.innerText = 0;
    DISPLAY.append(SPAN);
}

//decrement function
function decrement(){
    if(counter === 0) { //error message if the number reach zero
        ALERT_EL.innerText = ERROR_MSG_INVALID_RANGE;
        return
    };
    counter--;
    updateDisplay();
}

//reset function
function reset(){
    counter =0;
    updateDisplay();
}

//addPadding function is used to add a value in a box after increment
function addPaddingAtStart(originalString, desiredLength, paddingCharacter) {
    const originalStringLength = originalString.length;
    const remainingSpace = desiredLength - originalStringLength;
    if(remainingSpace > 0) {
        let newString = originalString;
        for(let i=0; i < remainingSpace; i++) {
            newString = paddingCharacter + newString;
        }
        return newString
    }
    return originalString;
}

updateDisplay(); //calling a function 