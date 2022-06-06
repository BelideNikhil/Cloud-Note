import { sortByDate, filterByPriority, filterBySearchFunction, filterByTagFunction } from "./index";

export function sortAndFilterFunction(list, filters) {
    const filteredBySearch = filterBySearchFunction(list, filters.filterBySearchText);
    const sortedByDate = sortByDate(filteredBySearch, filters.sortByDate);
    const filteredByPriority = filterByPriority(sortedByDate, filters.filterPriority);
    const finalList = filterByTagFunction(filteredByPriority, filters.filterTags);
    return finalList;
}
