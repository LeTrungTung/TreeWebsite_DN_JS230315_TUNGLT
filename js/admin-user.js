//Kiểm soát chuyển hướng trang
const checkAdmin =
  JSON.parse(localStorage.getItem("userLogin")) ?? [];
if (checkAdmin.email != "trungtung5484@gmail.com") {
  window.location = "/";
}
// render người dùng
const dataUser = JSON.parse(localStorage.getItem("users")) ?? [];

renderUser();
function renderUser() {
  let contentUser = "";
  const elementUser = document.querySelector("#id-tbody");
  dataUser.forEach((user, index) => {
    contentUser += `<tr>
        <td class="cl-center">${index + 1}</td>
        <td>${user.username}</td>
        <td class="italic">${user.email}</td>
        <td><button onclick="handleActiveUser('${user.email}')">${
      user.status
    }</button></td>
        <td class="cl-center bold">${user.isadmin}</td>
      </tr>`;
  });
  elementUser.innerHTML = contentUser;
}
function handleActiveUser(email) {
  const dataUser = JSON.parse(localStorage.getItem("users"));
  dataUser.forEach((user) => {
    if (user.email == email) {
      if (user.status == "active") {
        user.status = "inactive";
      } else {
        user.status = "active";
      }
      return;
    }
  });
  localStorage.setItem("users", JSON.stringify(dataUser));
  renderUser();
}

function handleSearch() {
  const valueSearch = document.querySelector("#id-ipnut").value;
  const dataUser = JSON.parse(localStorage.getItem("users"));
  console.log(55, dataUser);
  //   const dataSearch = dataUser.filter((user) => {
  //     user.username.toLowerCase().includes(valueSearch.toLowerCase()) ||
  //       user.email.toLowerCase().includes(valueSearch.toLowerCase());
  //   });
  //   console.log(66, dataSearch);
  let result = [];
  dataUser.forEach((user) => {
    let arrName = user.username.toLowerCase();
    let arrEmail = user.email.toLowerCase();
    console.log("ktr", arrName, valueSearch);
    if (
      arrName.includes(valueSearch.toLowerCase().trim()) ||
      arrEmail.includes(valueSearch.toLowerCase().trim())
    ) {
      result.push(user);
    }
  });

  //   render kết quả tìm kiếm
  renderResult();
  function renderResult() {
    let contentUser = "";
    const elementUser = document.querySelector("#id-tbody");
    result.forEach((user, index) => {
      contentUser += `<tr>
        <td class="cl-center">${index + 1}</td>
        <td>${user.username}</td>
        <td class="italic">${user.email}</td>
        <td><button onclick="handleActiveUser('${user.email}')">${
        user.status
      }</button></td>
        <td class="cl-center bold">${user.isadmin}</td>
      </tr>`;
    });
    elementUser.innerHTML = contentUser;
  }
}
// Dẫn đến trang quản lý
function manageOrders() {
  window.location = "../pages/manage-order.html";
}
function manageProducts() {
  window.location = "../pages/productlist-user.html";
}
