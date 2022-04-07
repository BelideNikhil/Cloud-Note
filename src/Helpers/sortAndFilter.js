import { filterByTagFunction } from "./filterByTags";
import { sortByDate, sortByPriority, filterByPriority, filterBySearchFunction } from "./index";

export function sortAndFilterFunction(list, filters) {
    const filteredBySearch = filterBySearchFunction(list, filters.filterBySearchText);
    const sortedByDate = sortByDate(filteredBySearch, filters.sortByDate);
    const sortedByPriority = sortByPriority(sortedByDate, filters.sortByPriority);
    const filteredByPriority = filterByPriority(sortedByPriority, filters.filterPriority);
    const finalList = filterByTagFunction(filteredByPriority, filters.filterTags);
    return finalList;
}
