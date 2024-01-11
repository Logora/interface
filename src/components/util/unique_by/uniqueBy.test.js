import { uniqueBy } from './uniqueBy';

it('should render an unique array of objects', () => {
    const notUniqObjArray = [{ id: 18, name: "non"}, { id: 21, name: "non" }, { id: 18, name: "non"}];
    const uniqObjArray = uniqueBy(notUniqObjArray, "id");

    expect(uniqObjArray.length).toEqual(2);
    expect(uniqObjArray[0].id).toEqual(18);
    expect(uniqObjArray[1].id).toEqual(21);
    expect(uniqObjArray[2]).toBeFalsy();
}); 

it('should render an unique array of objects filtered by another key than ID', () => {
    const notUniqObjArray = [{ age: 18, name: "non"}, { age: 21, name: "non" }, { age: 18, name: "non"}];
    const uniqObjArray = uniqueBy(notUniqObjArray, "age");

    expect(uniqObjArray.length).toEqual(2);
    expect(uniqObjArray[0].age).toEqual(18);
    expect(uniqObjArray[1].age).toEqual(21);
    expect(uniqObjArray[2]).toBeFalsy();
}); 

it('shouldn\'t break if array is empty', () => {
    const notUniqObjArray = [];
    const uniqObjArray = uniqueBy(notUniqObjArray, "uniqueKey");

    expect(uniqObjArray.length).toEqual(0);
    expect(uniqObjArray).toEqual([]);
}); 