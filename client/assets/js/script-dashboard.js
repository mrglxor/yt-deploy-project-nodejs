const fullName = document.getElementById('as_full_name');
const nameUser = document.getElementById('as_name');
const usernameUser = document.getElementById('as_username');

document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    } else {
      const isSweetAlertShown = localStorage.getItem("isSweetAlertShown");

      if (!isSweetAlertShown) {
        const expirationTime = localStorage.getItem("tokenExpiration");
        const currentTime = new Date().getTime() / 1000;

        if (expirationTime && currentTime > expirationTime) {
          refreshToken()
            .then((data) => {
              const newToken = data.token;
              const newExpirationTime = calculateExpirationTime(
                data.expiresIn
              );

              localStorage.setItem("token", newToken);
              localStorage.setItem("tokenExpiration", newExpirationTime);

              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Token berhasil diperbarui",
              });
              localStorage.setItem("isSweetAlertShown", "true");
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Gagal memperbarui token, silakan login kembali",
              });
              window.location.href = "/";
            });
        } else {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Berhasil Login",
          });
          localStorage.setItem("isSweetAlertShown", "true");
          getUserCurrent();
        }
      }

      const userCurrent = JSON.parse(localStorage.getItem('a.s_data_users'));
      fullName.innerHTML = userCurrent.name;
      nameUser.innerHTML = userCurrent.name;
      usernameUser.innerHTML = userCurrent.username;
    }
});

function calculateExpirationTime(expiresIn) {
return new Date().getTime() / 1000 + expiresIn;
}

function refreshToken() {
return Promise.resolve({
    token: "newRefreshedToken",
    expiresIn: 3600,
});
}

function logout() {
localStorage.removeItem("token");
localStorage.removeItem("tokenExpiration");
localStorage.removeItem("isSweetAlertShown");
localStorage.removeItem("a.s_data_users");

window.location.href = "/";
}

function getUserCurrent() {
    const token = localStorage.getItem('token');

fetch('http://localhost:5000/api/users/current',{
    method: 'GET',
    headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}).then(response => response.json())
  .then(data => {
      localStorage.setItem('a.s_data_users', JSON.stringify({
          '_id': data.data._id,
          'name': data.data.name,
          'username': `@${data.data.username}`
        }));
        fullName.innerText = data.data.name;
        nameUser.innerText = data.data.name;
        usernameUser.innerText = `@${data.data.username}`;
  })
  .catch(error => {console.error('Error :',error)});
}