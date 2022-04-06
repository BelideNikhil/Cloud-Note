export function sortByPriority(list, value) {
    if (value === "lowToHigh") {
        return [...list].sort((a, b) => {
            return Object.values(a.selectedPriority)[0] - Object.values(b.selectedPriority)[0];
        });
    }
    if (value === "highToLow") {
        return [...list].sort((a, b) => {
            return Object.values(b.selectedPriority)[0] - Object.values(a.selectedPriority)[0];
        });
    }
    return list;
}
