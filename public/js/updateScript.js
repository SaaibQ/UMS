const formEl = document.querySelector(".form-body");
const toastEl = document.querySelector(".toast");
const toastMsgEl = document.querySelector(".toast-msg");

const nameField = document.getElementById("name");
const emailField = document.getElementById("email");

const maleField = document.getElementById("male");
const femaleField = document.getElementById("female");

const inactiveField = document.getElementById("inactive");
const activeField = document.getElementById("active");

const toastDisappear = function () {
  setTimeout(() => {
    if (toastEl.classList.contains("success")) {
      toastEl.classList.remove("success");
    } else if (toastEl.classList.contains("error")) {
      toastEl.classList.remove("error");
    }
  }, 2000);
};

const fillFormByDefault = function (user) {
  const { data } = user;
  nameField.value = data.name;
  emailField.value = data.email;
  data.status === "active"
    ? (activeField.checked = true)
    : (inactiveField.checked = true);
  data.gender === "male"
    ? (maleField.checked = true)
    : (femaleField.checked = true);
};

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const id = window.location.search.split("=")[1];
    const resp = await fetch(`/api/v1/users/${id}`);
    const data = await resp.json();
    if (!data.status) {
      console.log("Throwing error...");
      throw new Error(data.message);
    }
    fillFormByDefault(data);
  } catch (err) {
    console.log(`🛑ERROR :${err}`);
    toastMsgEl.innerText = `Failed to get user data`;
    toastEl.classList.add("error");
    toastDisappear();
  }
});

formEl.addEventListener("submit", async function (e) {
  e.preventDefault();
  const id = window.location.search.split("=")[1];
  const formData = new FormData(formEl);
  try {
    const updateResp = await fetch(`/api/v1/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData).toString(),
    });
    const data = await updateResp.json();
    if (!data.status) {
      console.log("Throwing error...");
      console.log(data);
      if (data.err.name) throw new Error("Please fill all the fields");
      throw new Error(data.message);
    }
    toastMsgEl.innerText = "User successfully updated!";
    toastEl.classList.add("success");
    toastDisappear();
  } catch (err) {
    console.log(`🛑ERROR :${err}`);
    if (`${err}`.includes("E11000")) {
      toastMsgEl.innerText = `Email address already in use`;
    } else toastMsgEl.innerText = `${err.message}`;
    toastEl.classList.add("error");
    toastDisappear();
  }
});
