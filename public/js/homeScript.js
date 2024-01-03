const userBoard = document.querySelector(".user-board");

const addUserHtml = function (data) {
  const users = data.map((user) => {
    return {
      name: user.name,
      email: user.email,
      gender: user.gender,
      status: user.status,
      id: user._id,
    };
  });
  let html = ``;
  users.forEach((user) => {
    html =
      html +
      `<div class="user grid-col-5">
        <div>${user.name}</div>
        <div>${user.email}</div>
        <div>${user.gender}</div>
        <div>
          <span class="status ${
            user.status === "active" ? "active" : "not-active"
          }">${user.status}</span>
        </div>
        <div>
          <a href="./updateUser.html?id=${user.id}" class="action_btn edit">
          <ion-icon name="create"></ion-icon
            >
          </a>
          <button class="action_btn close"data-id=${user.id}>
          <ion-icon name="close"></ion-icon>
          </button>
        </div>
      </div>`;
  });
  userBoard.insertAdjacentHTML("beforeend", html);
};

const getALLUsers = async function () {
  try {
    const resp = await fetch("/api/v1/users", {
      method: "GET",
    });
    const data = await resp.json();
    if (!data.status) {
      console.log("Throwing error...");
      throw new Error(data.message);
    }
    const {
      data: { users },
    } = data;
    addUserHtml(users);
  } catch (err) {
    console.log(`🛑ERROR: ${err}`);
  }
};

const deleteHandler = async function (e) {
  const btn = e.currentTarget;
  const id = btn.dataset.id;
  await fetch(`/api/v1/users/${id}`, {
    method: "delete",
  });
  const userDiv = e.target.closest(".user");
  userDiv.classList.add("remove");
  setTimeout(() => {
    userDiv.remove();
  }, 1000);
};

const init = async function () {
  await getALLUsers();
  const deleteBtn = document.querySelectorAll(".action_btn.close");
  deleteBtn.forEach((btn) => btn.addEventListener("click", deleteHandler));
};

init();
