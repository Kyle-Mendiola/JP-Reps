// Checks if item has length of zero
// item : object/array/string
export function isEmpty(item) {
    if (isObject(item)) {
        return Object.keys(item).length <= 0
    }

    else if(typeof(item) === "string"){
        return item.trim().length <= 0
    }

    throw new Error("Invalid argument type")
}

export function isObject(obj) {
    return obj === Object(obj);
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