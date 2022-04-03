import { tagsActionTypes } from "../Context/actionTypes";

const { SET_TAG_INPUT, CREATE_TAG, REMOVE_TAG, UPDATE_TAG_STATE, RESET_GLOBAL_TAG_STATES, SET_GLOBAL_TAGS_LIST } =
    tagsActionTypes;

export function tagsReducerFunction(tagsState, { type, payload }) {
    switch (type) {
        case SET_TAG_INPUT:
            return { ...tagsState, newTagText: payload.newTagText };
        case CREATE_TAG:
            return {
                ...tagsState,
                globalTagsList: [...tagsState.globalTagsList, { tagName: payload.tagName, tagState: false }],
            };
        case REMOVE_TAG:
            return {
                ...tagsState,
                globalTagsList: tagsState.globalTagsList.filter((eachTag) => eachTag.tagName !== payload.tagName),
            };
        case UPDATE_TAG_STATE:
            return {
                ...tagsState,
                globalTagsList: tagsState.globalTagsList.map((eachTag) =>
                    eachTag.tagName === payload.tagName ? { ...eachTag, tagState: payload.tagState } : eachTag
                ),
            };
        case RESET_GLOBAL_TAG_STATES:
            return {
                ...tagsState,
                newTagText: "",
                globalTagsList: tagsState.globalTagsList.map((eachTag) => ({ ...eachTag, tagState: false })),
            };
        case SET_GLOBAL_TAGS_LIST:
            return {
                ...tagsState,
                globalTagsList: payload.globalTagsList,
            };
        default:
            return tagsState;
    }
}
