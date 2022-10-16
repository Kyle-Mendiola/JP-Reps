export function isEmpty(string) {
    return string.trim().length <= 0
}

// Checks if str contains substr (Case insensitive)
export function hasString(str, substr) {
    return str.toLowerCase().includes(substr.toLowerCase())
}

/**
 * Returns an object with the scroll info
 * 
 * @param  {Element} element
 * @param  {Object}  options
 * 
 */
export function scrollInfo(element, options={ offset: 0 }) {
    const info = { onStart: false, onEnd: false, position:element.scrollLeft }
    const edgeOffset = options.offset

    if (element.scrollLeft <= edgeOffset){
        info.onStart = true
    }
    if(element.scrollLeft + element.offsetWidth >= (element.scrollWidth - edgeOffset)){
        info.onEnd = true
    }

    return info
}