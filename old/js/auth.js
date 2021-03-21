var UserBaseUrl = '//localhost:8080/'

function checkToken(userId, token) {
    $.ajax({
        url: UserBaseUrl + 'auth/checkToken',
        type: 'POST',
        dataType: 'json',
        headers: {
            'Content-type': 'application/json'
        },
        data: JSON.stringify({
            user_id: userId,
            token: token,
        }),
        success: function (r) {
            console.log(r)
            if (window.location.href.indexOf("profile") === -1) {
                window.location.href = 'profile.html'
            }
        },
        error: function (e) {
            console.log('error', e);
            logout()
        }
    })
}

function setLogin(user, token) {
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("token", token)
}

function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.href= 'index.html'
}