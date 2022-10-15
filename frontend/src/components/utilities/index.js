export function isEmpty(string) {
    return string.trim().length <= 0
}

// Checks if str contains substr (Case insensitive)
export function hasString(str, substr) {
    return str.toLowerCase().includes(substr.toLowerCase())
}