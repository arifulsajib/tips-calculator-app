// function to get Value in different field
const getValue = (initial) => {
    if (initial == "bill" || initial == "custom" || initial == "person") {
        const value = document.getElementById(`${initial}-value`).value;
        return parseFloat(value);
    } else {
        const value = document.getElementById(`${initial}-value`).innerText;
        return value;
    }
}

// function to set Value in different field
const setValue = (initial, amount) => {
    if (initial == "bill" || initial == "custom" || initial == "person") {
        const valueField = document.getElementById(`${initial}-value`);
        valueField.value = amount;
    } else {
        const valueField = document.getElementById(`${initial}-value`);
        valueField.innerText = amount;
    }
}

// function to get tip amount
const getTipAmount = (percent) => {
    const bill = getValue("bill");
    const tipAmount = (bill * percent) / 100;
    return tipAmount;
}

// function to show and hide error
const errorShow = (errorType, isShow) => {
    const errorMsg = document.getElementById(`${errorType}-error`);
    if (isShow == true) {
        errorMsg.style.display = "block";
    } else {
        errorMsg.style.display = "none";
    }
}

// function to Calculate tips per person and Total per person
const calculation = (percent) => {
    const bill = getValue("bill");
    const tipAmount = getTipAmount(percent);
    const personCount = getValue("person");

    if (isNaN(bill) == true || bill <= 0) {
        errorShow("bill", true);
    } else if (isNaN(personCount) == true || personCount <= 0) {
        errorShow("person", true);
    } else if (percent < 0 || isNaN(percent) == true) {
        errorShow("custom", true);
    } else {
        errorShow("bill", false);
        errorShow("person", false);
        errorShow("custom", false);

        const tipPerPerson = tipAmount / personCount;
        const totalPerPerson = (bill + tipAmount) / personCount;
        setValue("tip", tipPerPerson.toFixed(2));
        setValue("total", totalPerPerson.toFixed(2));
    }
}

// all tip using event bubble
document.getElementById("tip").addEventListener("click", (event) => {
    if (event.target.innerText == "5%") {
        calculation(5);
    } else if (event.target.innerText == "10%") {
        calculation(10);
    } else if (event.target.innerText == "15%") {
        calculation(15);
    } else if (event.target.innerText == "25%") {
        calculation(25);
    } else if (event.target.innerText == "50%") {
        calculation(50);
    } else {
        const customTip = getValue("custom");
        if (customTip >= 0) {
            calculation(customTip);
        }
    }
});

// custom tip percent
document.getElementById("custom-value").addEventListener("change", () => {
    const customTip = getValue("custom");
    calculation(customTip);
});

// reset button
document.getElementById("reset-btn").addEventListener("click", () => {
    setValue("bill", "");
    setValue("custom", "");
    setValue("person", 1);
    setValue("tip", 0);
    setValue("total", 0);

    errorShow("bill", false);
    errorShow("person", false);
    errorShow("custom", false);
});