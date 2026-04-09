export const uniqueBy = (objArray, objKey) => {
	const newElements = [];
	objArray.filter((object) => {
		const objectIndex = newElements.findIndex(
			(element) => element[objKey] == object[objKey],
		);
		if (objectIndex <= -1) {
			newElements.push(object);
		}
		return null;
	});
	return newElements;
};
