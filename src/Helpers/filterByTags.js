export function filterByTagFunction(notes, filterTags) {
    if (filterTags.length) {
        return [...notes].filter((eachNote) => {
            return eachNote.tags.filter((tag) => filterTags.includes(tag)).length > 0;
        });
    }
    return [...notes];
}
