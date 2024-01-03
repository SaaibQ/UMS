const formEl = document.querySelector(".form-body");
const toastEl = document.querySelector(".toast");
const toastMsgEl = document.querySelector(".toast-msg");

const toastDisappear = function () {
  setTimeout(() => {
    if (toastEl.classList.contains("success")) {
      toastEl.classList.remove("success");
    } else if (toastEl.classList.contains("error")) {
      toastEl.classList.remove("error");
    }
  }, 3000);
};

formEl.addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(formEl);
  try {
    const postResp = await fetch("/api/v1/users", {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData).toString(),
    });
    const data = await postResp.json();
    if (!data.status) {
      console.log("Throwing error...");
      throw new Error(data.message);
    }
    toastMsgEl.innerText = "User successfully added!";
    toastEl.classList.add("success");
    toastDisappear();
  } catch (err) {
    console.log(`🛑ERROR :${err}`);
    if (`${err}`.includes("E11000")) {
      toastMsgEl.innerText = `Email address already in use`;
    } else toastMsgEl.innerText = `${err}`;
    toastEl.classList.add("error");
    toastDisappear();
  }
});
