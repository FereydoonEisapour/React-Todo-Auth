import Cookie from 'js-cookie'

const setCookie = (cookieName, user) => {
    Cookie.set(cookieName, user, {
        expires: 10, // 10 day
        secure: true,
        sameSite: 'strict',
        path: '/'
    })
}
const getCookie = (cookieName) => {
    return Cookie.get(cookieName)
}
const removeCookie = (cookieName) => {
    Cookie.remove(cookieName)
}

export { setCookie, getCookie, removeCookie }