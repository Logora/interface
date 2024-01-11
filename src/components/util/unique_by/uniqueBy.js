export const uniqueBy = (objArray, objKey) => {
    let newElements = [];
    objArray.filter((object) => {
        let objectIndex = newElements.findIndex(element => (element[objKey] == object[objKey]));
        if (objectIndex <= -1) { newElements.push(object); }
        return null;
    });
    return newElements;
};