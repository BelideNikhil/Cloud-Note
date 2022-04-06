import { filterByTagFunction } from "./filterByTags";
import { sortByDate, sortByPriority, filterByPriority } from "./index";

export function sortAndFilterFunction(list, filters) {
    const sortedByDate = sortByDate(list, filters.sortByDate);
    const sortedByPriority = sortByPriority(sortedByDate, filters.sortByPriority);
    const filteredByPriority = filterByPriority(sortedByPriority, filters.filterPriority);
    const finalList = filterByTagFunction(filteredByPriority, filters.filterTags);
    return finalList;
}
