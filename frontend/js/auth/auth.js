BASEURL = "http://localhost:3000/api";

const createUser = async (firstname, lastname, email, password) => {
  const response = await fetch(`${BASEURL}/user`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      firstname,
      lastname,
      email,
      password,
    }),
    mode: "cors",
  }).catch(handleError);

  return response;
};

const loginUser = async (email, password) => {
  const response = await fetch(`${BASEURL}/user/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    mode: "cors",
  }).catch(handleError);

  return response;
};

const getLoggedInUser = async (jwt_token) => {
  const response = await fetch(`${BASEURL}/user`, {
    headers: {
      Authorization: `Bearer ${jwt_token}`,
    },
    mode: "cors",
  }).catch(handleError);

  if (response.status == 401) {
    localStorage.clear();
    window.location.href = "login.html";
  }

  return await response.json();
};
