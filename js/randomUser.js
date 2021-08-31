const useGen = document.getElementById("user-gen");

const spinner = document.getElementById("spinner");

/* ----------------------- function for data fetching 1st step ----------------------- */
fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

function clickListener() {
  useGen.addEventListener("click", () =>
    fetchData("https://randomuser.me/api").then((data) => {
      spinner.classList.remove("d-none");
      getUser(data);
    })
  );
}

clickListener();

userProfile = async (url) => {
  const res = await fetchData(url);
  // console.log("userProfile", url, res);
  const { country, state, city } = res.results[0].location;
  const street = `${res.results[0].location.street.number}, ${res.results[0].location.street.name}`;
  const { username, password } = res.results[0].login;

  const nameString = res.results[0].name.first + " " + res.results[0].name.last;
  const userInfo = document.getElementById("user-info");
  userInfo.textContent = "";
  const div = document.createElement("div");
  div.classList.add("container");
  div.innerHTML = `<div class="modal-content">
              <div id="user-info" class="modal-body">
              <div class="modal-header">
                <h4 class="modal-title" id="exampleModalLabel">My Profile</h4>
                <button
                onclick = "window.location.reload();"
                  id = "btn-close"                 
                  type="button"
                  class="btn-close"
                  data-mdb-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body" style="text-align: center">
                <div class="row-fluid">
                  <div id="modalTab">
                    <div class="tab-content">
                      <div class="tab-pane active" id="about">
                        <a href="">
                          <img
                            src="${res.results[0].picture.large}"
                            name="aboutme"
                            width="140"
                            height="140"
                            class="img-circle"
                        /></a>
                        <h3 class="p-2">${nameString}<span class="ms-2 badge bg-dark"> ${country}</span></h3>

                         <div class="box-title fs-4">
                        <span><strong>Street: </strong></span>
                        <span class="badge bg-primary"
                          >${street}</span
                        ></div>
                         <div class="box-title fs-4">
                        <span><strong>City/State: </strong></span>
                        <span class="badge bg-info">${city} / ${state}</span>
                        </div>
                        <div class="box-title fs-4">
                          <strong>Email: </strong
                          ><span class="badge bg-danger"
                            >${res.results[0].email}</span
                          >
                        </div>
                        
                        <hr />
                        <section>
                          <div class="text-start">
                            <strong>Secret-Info: </strong><br />
                            <div class="text-center">
                              <div class="box">
                                <i class="bi bi-person-square"></i>
                                <span>Username: </span>
                                <div class="box-title">
                                  <h3>${username}</h3>
                                </div>
                                <i class="bi bi-key-fill"></i>
                                <span>Password: </span>
                                <div class="box-title">
                                  <h3>${password}</h3>
                                </div>
                                <div class="box-text">
                                  <span>
                                    <strong>Bio: </strong>A preview of my life.
                                    This is not the whole movie. P.S.: if you
                                    wanna get behind the scenes just head to my
                                    stories..</span
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                          <br />
                        </section>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
              onclick = "window.location.reload();"
                type="button"
                class="btn btn-secondary"
                data-mdb-dismiss="modal"
              >
                Reset All
              </button>
              <button id="selectUser" type="button" class="btn btn-primary" data-mdb-dismiss="modal">
                Select This User
              </button>
            </div>
          </div>`;
  userInfo.appendChild(div);

  loggedUser = () => {
    const profileImage = document.getElementById("profile-image");
    profileImage.innerHTML = ` <a                 
                    class="nav-link dropdown-toggle d-flex align-items-center"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="${res.results[0].picture.medium}"
                      class="rounded-circle"
                      height="50"
                      alt=""
                      loading="lazy"
                    />
                  </a>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <a class="dropdown-item" href="#">My profile</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">Settings</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" onclick="window.location.reload()">Logout</a>
                    </li>
                  </ul>`;
    document.getElementById("input-field").style.display = "none";
    document.getElementById("header").style.display = "none";
    document.getElementById("login-btn").style.backgroundColor = "red";

    document.getElementById(
      "login-btn"
    ).innerHTML = `<p>Hi ${res.results[0].login.username}</p>`;
  };

  const selectProfile = document.getElementById("selectUser");

  selectProfile.addEventListener("click", function (e) {
    useGen.style.display = "none";
    document.getElementById(
      "header"
    ).innerText = `Enter password: ${res.results[0].login.password}`;
  });

  return;
};

// const request = async () => {
//     		const response = await	fetch('md/'+files[i])
//          		const text = await response.text()
//              			var mdcontent = marked(text.toString())
//                    			console.log(mdcontent) }

passFetched = async (url) => {
  /* ---------------------------- password matcher ---------------------------- */
  const res = await fetch(url);
  const response = await res.json();
  const arr = response.results;

  const val = await arr.map((p) => p.login);
  Promise.all(val)
    .then((data) => data[0].password)
    .then((pass) => sendPass(pass));

  /* ------------------------------ recieve pass ------------------------------ */
  sendPass = async (password) => {
    // console.log("insendPass", password);

    document.getElementById("login-btn").addEventListener("click", (event) => {
      // event.preventDefault();
      event.stopImmediatePropagation();

      const passwordRetype = document.getElementById("password").value;

      if (password == "") {
        alert("Password required.");
        return;
      } else if (passwordRetype == "") {
        alert("Password required.");
        return;
      }
      if (passwordRetype != password) {
        alert("Password doesnt match");
      } else loggedUser();
    });

    passwordRetype = "";

    const passwordArray = [];

    if (passwordArray.indexOf(password) == -1) {
      if (passwordArray.length > 0) {
        passwordArray.pop();
      }
      passwordArray.push(password);
    }
  };
};

getUser = (data) => {
  const seed = data.info.seed;
  const url = "https://randomuser.me/api/?seed=" + seed;
  // console.log(url);
  const result = data.results;

  const nameString = result[0].name.first + " " + result[0].name.last;

  const imgContainer = document.getElementById("img-container");
  imgContainer.textContent = "";
  const div = document.createElement("div");
  div.innerHTML = `<img              
                data-mdb-toggle="modal"
              data-mdb-target="#exampleModal"
              style= "cursor: pointer"
              src="${result[0].picture.large}"
              class="img-fluid zoom img-thumbnail"
              alt="Sample"
              onclick = "userProfile('${url}'); passFetched('${url}')"
            />
            <div class="rounded" style="background-image: linear-gradient(45deg, #f3ec78, #af4261);">
              <div
                class="d-flex  flex-wrap align-content-center justify-content-center align-items-center my-5"
              >
                <p class="text-black text-bold fs-3 mb-0">${nameString}</p>
              </div>
            </div>  
  `;

  imgContainer.appendChild(div);
  setTimeout(() => {
    spinner.classList.add("d-none");
  }, 300);
};
