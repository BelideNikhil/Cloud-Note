export function filterBySearchFunction(notes, searchedText) {
    if (searchedText.trim() !== "") {
        return notes.filter((eachNote) => {
            return (
                eachNote.title.toUpperCase().includes(searchedText.trim().toUpperCase()) ||
                eachNote.note.toUpperCase().includes(searchedText.trim().toUpperCase())
            );
        });
    } else {
        return notes;
    }
}
