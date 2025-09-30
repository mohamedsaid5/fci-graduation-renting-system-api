

function isArray(response) {
    let r = undefined;

    if (Array.isArray(response)) {
        r = true
    } else if (typeof response === 'object' && response !== null) {
        r = false
    }

    return r;
}

export function handleError(error, defaultErr) {

    let isArr = isArray(error);

    if (isArr === undefined) return defaultErr;

    let err = isArr ? error[0] : error;

    let keys = Object?.keys(err);
    let key = keys?.[0];
    return key ? `${key}, ${err?.[key]} ${keys.length > 1 ? `And More ${keys.length - 1} Errors` : ''}` : defaultErr;
}