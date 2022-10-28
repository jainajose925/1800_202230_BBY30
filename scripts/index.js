const button = document.getElementById('ate');

    function ate() {
    console.log("button pressed");

    return true;
};

let ateBreak = false;

button.addEventListener('click', ate());

if (ateBreak == true) {
    console.log("ateBreak is true");
    document.getElementById('col1').style.backgroundColor = 'green';
};