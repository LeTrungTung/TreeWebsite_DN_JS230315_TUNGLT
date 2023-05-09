const userDB = JSON.parse(localStorage.getItem("users")) ?? [];

const formElement = document.querySelector("#form-register");
formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailError = document.querySelector("#er-email");
  const emailUser = document.querySelector("#er-user");
  const passwordError = document.querySelector("#er-password");
  const confirmPasswordError = document.querySelector(
    "#er-confirm-password"
  );

  // Lấy input
  const info = getValueInput();
  const checkInput = validator(info);
  if (checkInput.isError) {
    emailError.innerHTML = checkInput.errorEmail;
    emailUser.innerHTML = checkInput.errorUser;
    passwordError.innerHTML = checkInput.errorPassword;
    confirmPasswordError.innerHTML = checkInput.errorConfirmPassword;
  } else {
    emailError.innerHTML = "";
    emailUser.innerHTML = "";
    passwordError.innerHTML = "";
    confirmPasswordError.innerHTML = "";
    //   Cập nhật lại dữ liệu từ local storage
    const userDB = JSON.parse(localStorage.getItem("users")) ?? [];
    // Gán không trùng dữ liệu
    let isDulicate = false;
    // B3.2 Lọc qua từng phần tử để tìm email trùng nếu có
    userDB.forEach((user) => {
      if (user.email === info.email) {
        isDulicate = true;
      }
    });
    // B3.3 Kiểm tra trùng dữ liệu
    if (!isDulicate) {
      userDB.push(info);
      localStorage.setItem("users", JSON.stringify(userDB));
      // Redirect();
      window.location = "login.html";
    } else {
      return alert("Trùng email! Nhập email khác");
    }
  }
});

function getValueInput() {
  const inputElement = document.querySelectorAll(".form-card input");
  const info = {};
  inputElement.forEach((element) => {
    info[element.name] = element.value;
  });
  info.status = "active";
  if (info.email == "trungtung5484@gmail.com") {
    info.isadmin = "Yes";
  } else {
    info.isadmin = "No";
  }
  info.cart = [];
  info.cartHistory = [];
  info.order = [];
  info.totalAmount = [];
  return info;
}

function validator(user) {
  let error = {
    isError: false,
    errorEmail: "",
    errorUser: "",
    errorPassword: "",
    errorConfirmPassword: "",
  };

  const regxEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (!user.email) {
    error.isError = true;
    error.errorEmail = "Email không được để trống";
  }
  if (!user.username) {
    error.isError = true;
    error.errorUser = "User không được để trống";
  }
  if (!user.email?.match(regxEmail)) {
    error.isError = true;
    error.errorEmail =
      "Email không đúng định dạng, vui lòng nhập lại";
  }

  if (
    !user.password ||
    user.password.length < 8 ||
    user.password.length > 20
  ) {
    error.isError = true;
    error.errorPassword =
      "Password phải lớn hơn 8 ký tự và bé hơn 20 ký tự";
  }
  if (user.password !== user.confirmpassword) {
    error.isError = true;
    error.errorConfirmPassword =
      "Password không trùng khớp, nhập lại";
  }

  return error;
}
