export function sortByDate(list, value) {
    if (value === "oldestFirst") {
        return [...list].sort((a, b) => {
            return new Date(a.createdAt) - new Date(b.createdAt);
        });
    }
    if (value === "newestFirst") {
        return [...list].sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
    }
    return list;
}
