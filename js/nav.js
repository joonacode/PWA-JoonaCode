document.addEventListener("DOMContentLoaded", () => {

  const elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems, {
    edge: "right",
  });

  loadNav();

  function loadNav() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status != 200) return;
        // muat daftar tatutan menu
        document.querySelectorAll(".topnav, .sidenav").forEach((elm) => {
          elm.innerHTML = xhr.responseText;
        });

        document.querySelectorAll(".sidenav a, .topnav a").forEach((elm) => {
          elm.addEventListener("click", (event) => {
            const sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close();
            page = event.target.getAttribute("href").substr(1);
            loadPage(page);
          });
        });
      }
    };
    xhr.open("GET", "nav.html", true);
    xhr.send();
  }
  
  let page = window.location.hash.substr(1);
  if (page == "") page = "home";
    
  loadPage(page);
  function loadPage(page) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        let content = document.querySelector("#body-content");
        if (this.status == 200) {
          if (page != "home") {
            document.querySelector(".header-utama").classList.add("d-none");
            document.querySelector(".panel").classList.add("d-none");
          } else {
            document.querySelector(".header-utama").classList.remove("d-none");
            document.querySelector(".panel").classList.remove("d-none");
          }
          content.innerHTML = xhr.responseText;
          document.querySelectorAll(".link-action").forEach((elm) => {            
            elm.addEventListener("click", (event) => {
              page = event.target.getAttribute("href").substr(1);
              loadPage(page);
            });
          });
        } else if (this.state == 404) {
          content.innerHTML = '<p style="margin: 150px 0 250px 20px;text-align: center;font-size: 40px;font-weight: bold;color: red;">Halaman tidak ditemukan</p>';
          document.querySelector(".header-utama").classList.add("d-none");
            document.querySelector(".panel").classList.add("d-none");
        } else {
          content.innerHTML = '<p style="margin: 150px 0 250px 20px;text-align: center;font-size: 40px;font-weight: bold;color: red;">Ups... halaman tidak dapat diakses.</p>';
          document.querySelector(".header-utama").classList.add("d-none");
          document.querySelector(".panel").classList.add("d-none");
        }
      }
    };
    xhr.open("GET", `pages/${page}.html`, true);
    xhr.send();
  }

});
