const convert = require('xml-js');

const xmlGetter = (obj, arr = null) => {
    const result = {};
    const isObject = o => typeof o === 'object' && !Array.isArray(o) && o !== null;
    function obLabel(o) { var label = ''; for( let l in o ) { label = l; } return label; }
    const fixCase = s => s.replace('a:', '')[0].toLowerCase() + s.replace('a:', '').slice(1);

    if (!arr || isObject(arr)) {
        for ( let item in obj) {
            if (obj[item]['_text']) {
                result[fixCase(item)] = obj[item]['_text'];
            }
        }

        if (isObject(arr)) {
            for (let i in arr) {
                result[fixCase(i)] = arr[i];
            }
        }
        return result;
    }
    
    arr.forEach(k => {
        if (isObject(k)) {
            const label = obLabel(k);
            result[fixCase(label)] = xmlGetter(obj[label], k[label]);
        } else {
            result[fixCase(k)] = obj[k] ? obj[k]['_text'] : null;
        }
    });
    return result;
};

const listHandler = (el, fn) => {
    if (!el) return [];
    const list = [];
    if (Array.isArray(el)) {
        el.forEach(e => list.push(fn(e)));
        return list;
    }
    list.push(fn(el));
    return list;
};

module.exports = {
    listHandler,
    xmlGetter,
    convert
}