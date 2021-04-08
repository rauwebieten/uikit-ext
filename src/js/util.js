export function configFromString(string) {
    //return JSON.parse('{' + string + '}');
    let obj = {};
    string.split(',').forEach(function(property) {
        let tup = property.split(':');
        obj[tup[0].trim()] = tup[1].trim();
    });
    return obj;
}