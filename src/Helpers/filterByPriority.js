export function filterByPriority(list, value) {
    if (value.length) {
        return [...list].filter((each) => {
            return value.includes(Object.keys(each.selectedPriority)[0]);
        });
    }
    return [...list];
}
