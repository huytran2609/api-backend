function removeUndefinedProps(obj) {
    for (const prop in obj) {
        if (obj.hasOwnProperty(prop) && obj[prop] === undefined) {
            delete obj[prop];
        }
    }
    return obj;
}

export { removeUndefinedProps };
