const filterUndefined = (obj) => {
    Object.keys(obj)
        .forEach(key => obj[key] === undefined ? delete obj[key] : {});
    return obj;
}

export default filterUndefined;