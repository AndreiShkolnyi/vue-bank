const ERROR_CODES = {
    EMAIL_NOT_FOUND: 'Пользовател с таким email не найден',
    INVALID_PASSWORD: 'Неверный пароль',
    auth: 'Пользователь не авторизован'
}

export default function error(code) {
    return ERROR_CODES[code] ? ERROR_CODES[code] : 'Неизвестная ошибка'
}
