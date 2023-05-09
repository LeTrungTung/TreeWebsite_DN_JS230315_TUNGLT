const formElement = document.querySelector("#form-login");
formElement.addEventListener("submit", (e) => {
  e.preventDefault();

  const emailValue = document
    .querySelector("#email-input")
    .value.trim()
    .toLowerCase();
  const passwordValue =
    document.querySelector("#password-input").value;
  // B2 Lấy local về so sánh
  const usersDB = JSON.parse(localStorage.getItem("users")) || [];
  let userLogin;
  // b3 so sánh với từng phần tử
  usersDB.forEach((user) => {
    if (
      emailValue === user.email &&
      passwordValue === user.password
    ) {
      // b3.1 gán userLogin - user
      userLogin = user;
      // b3.2Xoá key password để bảo vệ người dùng
      delete userLogin.password;
      delete userLogin.confirmpassword;
    }
  });
  // B4. Đẩy user lên localstorage
  if (userLogin) {
    localStorage.setItem("userLogin", JSON.stringify(userLogin));
    window.location = "/";
  } else {
    const errorElement = document.querySelector(".error");
    errorElement.innerHTML =
      "Email hoặc mật khẩu không chính xác, vui lòng đăng nhập lại";
  }
});

function getValueInput() {
  const inputElement = document.querySelectorAll(".form-card input");
  const info = {};
  inputElement.forEach((element) => {
    info[element.name] = element.value;
  });

  return info;
}

function validator(user) {
  let error = {
    isError: false,
    errorEmail: "",
    errorPassword: "",
  };

  if (!user.email) {
    error.isError = true;
    error.errorEmail = "Email không được để trống";
  }

  if (!user.password) {
    error.isError = true;
    error.errorPassword = "Password không được để trống";
  }

  return error;
}
