// Chuyển qua trang Đăng ký
function handleRegister() {
  window.location = "/pages/register.html";
}

// Chuyển qua trang Đăng nhập
function handleLogin() {
  window.location = "/pages/login.html";
}
// Logout
function handleLogout() {
  localStorage.removeItem("userLogin");
  window.location = "/pages/login.html";
}

// Hiển thị tình trạng đăng nhập
const userLogin = JSON.parse(localStorage.getItem("userLogin"));

const viewElement = document.querySelector("#view-user");

renderUser(userLogin);
function renderUser(user) {
  if (user) {
    const contentElement = `
            <div>              
              <div><b style="color:#60da3b">Tên người dùng</b></div>
              <div class="user-info">${user.username}</div>
            </div>
            <div>              
              <button id="btn-logout" onclick="handleLogout()" style="margin-left:50px">
              Đăng xuất
               </button>
            </div>            
            `;
    viewElement.innerHTML = contentElement;
  }
  // else {
  //   const contentElement = `
  //           <div>
  //             <button id="btn-login" onclick="handleLogin()">
  //             Đăng nhập
  //           </button>
  //           </div>
  //           <div>
  //             <button id="btn-register" onclick="handleRegister()">
  //               Đăng ký
  //             </button>;
  //           </div>
  //           `;
  //   viewElement.innerHTML = contentElement;
  // }
}

// render sản phẩm

const productsTree =
  JSON.parse(localStorage.getItem("products")) ?? [];
renderTree(productsTree);
// render sản phẩm Cây công trình

function renderTree(data) {
  // const productsTree =
  //   JSON.parse(localStorage.getItem("products")) ?? []; //nếu như chưa có spham thì cho = rỗng
  // console.log(22, productsTree);
  // B2 lấy element sẽ render sản phẩm
  const constructTree = document.querySelector("#construct-tree");
  const urbanTree = document.querySelector("#urban-tree");
  const flowerTree = document.querySelector("#flower-tree");
  const bonsaiTree = document.querySelector("#bonsai-tree");

  // Lọc sản phẩm trong data theo phân loại cây
  const constructTreeDB = data.filter(
    (product) => product.specy == "Cây công trình"
  );
  const urbanTreeDB = data.filter(
    (product) => product.specy == "Cây xanh đô thị"
  );
  const flowerTreeDB = data.filter(
    (product) => product.specy == "Cây hoa các loại"
  );
  const bonsaiTreeDB = data.filter(
    (product) => product.specy == "Cây nghệ thuật Bonsai"
  );
  // console.log("Ktra filter", data);

  //  render sản phẩm cây công trình
  let contentConstruct = "";
  constructTreeDB.forEach((product) => {
    contentConstruct += `<div class="img-content col-lg-3 col-md-6">
          <div class="content-overlay"></div>
          <img
            src="${product.imageUrl}"
            alt=""
            id="tree-img"
          />
          <button
            class="content-details fadeIn-bottom"
            id="view-detail" onclick="handleViewDetail('${product.id}')"
          >
            Xem chi tiết
          </button>
          <p id="tree-name">${product.name}</p>
          <p id="price">${product.price}</p>
        </div>`;
  });
  constructTree.innerHTML = contentConstruct;

  //  render sản phẩm cây đô thị
  let contentUrban = "";
  urbanTreeDB.forEach((product) => {
    // console.log(44, product);
    contentUrban += `<div class="img-content col-lg-3 col-md-6">
          <div class="content-overlay"></div>
          <img
            src="${product.imageUrl}"
            alt=""
            id="tree-img"
          />
          <button
            class="content-details fadeIn-bottom"
            id="view-detail" onclick="handleViewDetail('${product.id}')"
          >
            Xem chi tiết
          </button>
          <p id="tree-name">${product.name}</p>
          <p id="price">${product.price}</p>
        </div>`;
  });
  urbanTree.innerHTML = contentUrban;

  //  render sản phẩm cây hoa các loại
  let contentFlower = "";
  flowerTreeDB.forEach((product) => {
    contentFlower += `<div class="img-content col-lg-3 col-md-6">
          <div class="content-overlay"></div>
          <img
            src="${product.imageUrl}"
            alt=""
            id="tree-img"
          />
          <button
            class="content-details fadeIn-bottom"
            id="view-detail" onclick="handleViewDetail('${product.id}')"
          >
            Xem chi tiết
          </button>
          <p id="tree-name">${product.name}</p>
          <p id="price">${product.price}</p>
        </div>`;
  });
  flowerTree.innerHTML = contentFlower;

  //  render sản phẩm cây Bonsai
  let contentBonsai = "";
  bonsaiTreeDB.forEach((product) => {
    contentBonsai += `<div class="img-content col-lg-3 col-md-6">
          <div class="content-overlay"></div>
          <img
            src="${product.imageUrl}"
            alt=""
            id="tree-img"
          />
          <button
            class="content-details fadeIn-bottom"
            id="view-detail" onclick="handleViewDetail('${product.id}')"
          >
            Xem chi tiết
          </button>
          <p id="tree-name">${product.name}</p>
          <p id="price">${product.price}</p>
        </div>`;
  });
  bonsaiTree.innerHTML = contentBonsai;
}

//Tìm kiếm sản phẩm
function handleSearch() {
  const productsTree = JSON.parse(localStorage.getItem("products"));

  let valueSearchByName =
    document.querySelector("#input-search").value;

  const dataSearch = productsTree.filter((product) =>
    product.name
      .toLowerCase()
      .includes(valueSearchByName.toLowerCase())
  );
  renderTree(dataSearch);
}

// Click để xem sản phẩm chi tiết
function handleViewDetail(id) {
  window.location = `pages/detail-product.html?idProduct=${id}`;
}

// Câp nhật số lượng sản phẩm trong Giỏ hàng
const userDB = JSON.parse(localStorage.getItem("users")) ?? [];

const showCart = document.querySelector("#count-product");
let cartArray = [];
if (userLogin != "") {
  userDB.forEach((user) => {
    if (user.email == userLogin.email) {
      cartArray = user.cart;
      return;
    }
  });

  console.log("show", cartArray.length);
  showCart.innerHTML = `<span">${cartArray.length}</span>`;
}

// Khi Click vào xem Giỏ hàng
function showCartDetail() {
  window.location = "../pages/cart.html";
}
