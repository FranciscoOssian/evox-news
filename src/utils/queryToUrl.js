const queryToUrl = (query) => {
    let keys = Object.keys(query).map( key => key );
    let values = Object.keys(query).map( key => query[key] );

    let result = []

    for (let i = 0; i < keys.length; ++i){
        result.push(`${keys[i]}=${values[i]}`);
    }

    return result.join('&');
}

export default queryToUrl;