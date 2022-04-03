import "./Tags.css";
import { useTags } from "../../Context";
import { tagsActionTypes } from "../../Context/actionTypes";
const { CREATE_TAG, UPDATE_TAG_STATE, SET_TAG_INPUT } = tagsActionTypes;
export function Tags() {
    const {
        tagsState: { globalTagsList, newTagText },
        tagsDispatchFunction,
        deleteFormLabelhandler,
    } = useTags();

    function tagsFormhandler(e) {
        e.preventDefault();
        const foundInTagList = globalTagsList.find((tag) => tag.tagName.toUpperCase() === newTagText.toUpperCase());
        if (!foundInTagList) {
            tagsDispatchFunction({ type: CREATE_TAG, payload: { tagName: newTagText } });
        } else {
            tagsDispatchFunction({
                type: UPDATE_TAG_STATE,
                payload: { tagName: foundInTagList.tagName, tagState: true },
            });
        }
        tagsDispatchFunction({ type: SET_TAG_INPUT, payload: { newTagText: "" } });
    }

    return (
        <div className="tags-wrapper pa-12">
            <form onSubmit={tagsFormhandler} className="tags-form flex-row-start-center">
                <input
                    type="text"
                    value={newTagText}
                    placeholder="Create Tags..."
                    onChange={(e) =>
                        tagsDispatchFunction({ type: SET_TAG_INPUT, payload: { newTagText: e.target.value } })
                    }
                />
                <button type="submit" className="add-tag-btn pointer">
                    <i className="fas fa-plus-square"></i>
                </button>
            </form>
            <ul className="tags-list mt-8">
                {globalTagsList.length
                    ? globalTagsList.map((tag) => {
                          return (
                              <li key={tag.tagName}>
                                  <label className="pointer">
                                      <input
                                          type="checkbox"
                                          className="mr-6"
                                          checked={tag.tagState}
                                          onChange={(e) =>
                                              tagsDispatchFunction({
                                                  type: UPDATE_TAG_STATE,
                                                  payload: { tagName: tag.tagName, tagState: e.target.checked },
                                              })
                                          }
                                      />
                                      <span>{tag.tagName}</span>
                                      <button
                                          className="delete-label-btn pointer"
                                          onClick={(e) => deleteFormLabelhandler({ e, tag })}
                                      >
                                          <span className="material-icons-outlined">clear</span>
                                      </button>
                                  </label>
                              </li>
                          );
                      })
                    : null}
            </ul>
        </div>
    );
}
