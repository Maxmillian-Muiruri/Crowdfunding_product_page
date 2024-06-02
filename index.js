let rangeBtn = document.querySelector("#range");
const radioBtn = document.querySelectorAll('input[type="radio"]');
const modalBox = document.querySelectorAll(".modal--box");
const modalFooter = document.querySelectorAll(".modal--box-footer");
const priceBtn = document.querySelectorAll("#continueBtn");
const support = document.querySelector(".support");
const daysLeft = document.getElementById("daysleft");

// Set the target amount
const targetAmount = 10000;

// Function to update the progress bar
function updateProgressBar() {
  const backedAmount = document.getElementById("backedAmount");
  const currentAmount = getPledgedAmount();
  const percentage = (currentAmount * 100) / targetAmount;
  const progressBar = document.getElementById("myBar");
  progressBar.style.width = `${percentage}%`;
}

function updateCountdown() {
  const today = new Date();
  let targetDate = new Date(today.getFullYear(), 8, 17); // September 17th of the current year
  // If today is past September 17th, set the target date to next year
  if (today > targetDate) {
    targetDate.setFullYear(today.getFullYear() + 1);
  }
  const difference = targetDate - today;
  const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
  document.getElementById("daysleft").textContent = daysLeft;
}

// Call the function to set the initial countdown value
updateCountdown();
// Update the countdown every 24 hours (1000 milliseconds * 60 seconds * 60 minutes * 24 hours)
setInterval(updateCountdown, 1000 * 60 * 60 * 24);

let i = 0;
function move() {
  if (i == 0) {
    i = 1;
    let elem = document.getElementById("myBar");
    let width = 1;
    let id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}

radioBtn.forEach((btn, i) => {
  btn.addEventListener("change", () => {
    let current = modalBox[i];
    let currentItem = modalFooter[i];
    current.classList.toggle("outline-change");
    currentItem.classList.toggle("active");
    let currentValue = i;

    if (currentValue === 0) {
      rangeBtn.setAttribute("value", 25);
    }
    if (currentValue === 1) {
      rangeBtn.setAttribute("value", 50);
    }
    if (currentValue === 2) {
      rangeBtn.setAttribute("value", 75);
    }
  });
  priceBtn.forEach((el) => {
    el.addEventListener("click", () => {
      console.log("clicked");
      support.classList.add("active");
      modal.classList.remove("active");
    });
  });
  btn.addEventListener("mouseout", () => {
    currentItem.classList.remove("active");
  });
});

// support
const supportBtn = document.querySelector("#support-btn");
supportBtn.addEventListener("click", () => {
  support.classList.remove("active");
  modal.classList.remove("active");
  document.querySelector("body").classList.remove("overlay");
});

const select = document.querySelectorAll("#select-btn");

const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close-btn img");

select.forEach((e, i) => {
  e.addEventListener("click", () => {
    modal.classList.add("active");
    document.querySelector("body").classList.add("overlay");
  });
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("close-menu");
  menu.classList.toggle("active");
});

// Function to set pledged amount to localStorage
function setPledgedAmount(amount) {
  localStorage.setItem("pledgedAmount", amount);
}

// Function to get pledged amount from localStorage
function getPledgedAmount() {
  const pledgedAmount = localStorage.getItem("pledgedAmount");
  return pledgedAmount ? parseInt(pledgedAmount) : 0;
}

// Function to update backed amount and progress bar
function updateBackedAmount() {
  const pledgedAmount = getPledgedAmount();
  const backedAmount = document.getElementById("backedAmount");
  backedAmount.textContent = `$${pledgedAmount.toLocaleString()}`;
  updateProgressBar();
}

// Function to get backers count from localStorage
function getBackers() {
  let totalBackers = localStorage.getItem("totalBackers");
  if (totalBackers === null) {
    totalBackers = 0;
    localStorage.setItem("totalBackers", totalBackers);
  } else {
    totalBackers = parseInt(totalBackers, 10);
    if (isNaN(totalBackers)) {
      totalBackers = 0;
      localStorage.setItem("totalBackers", totalBackers);
    }
  }

  let myBackers = document.getElementById("backers");
  myBackers.innerHTML = totalBackers;

  return totalBackers;
}

// Function to increment total backers count
function incrementBackers() {
  let totalBackers = getBackers();
  totalBackers += 1;
  localStorage.setItem("totalBackers", totalBackers);

  let myBackers = document.getElementById("backers");
  myBackers.innerHTML = totalBackers;
}

// Function to handle pledge input changes
function handlePledgeInputChange(event) {
  const input = event.target;
  const enteredAmount = parseInt(input.value) || 0;

  if (enteredAmount > 0) {
    const currentPledgedAmount = getPledgedAmount();
    const newPledgedAmount = currentPledgedAmount + enteredAmount;

    setPledgedAmount(newPledgedAmount);
    updateBackedAmount();
    incrementBackers();

    input.value = ""; // Clear input after adding to total
  }
}

// Add event listeners for input changes
const pledgeInputs = document.querySelectorAll(
  ".modal--box-footer .quantity input"
);
pledgeInputs.forEach((input) => {
  input.addEventListener("change", handlePledgeInputChange);
});

// Initialize backed amount and progress bar on page load
document.addEventListener("DOMContentLoaded", function () {
  updateBackedAmount();
  getBackers(); // Ensure backers count is displayed correctly on page load
});
