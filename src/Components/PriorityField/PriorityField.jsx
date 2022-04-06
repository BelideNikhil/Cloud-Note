import "./PriorityField.css";

export function PriorityField({ selectedPriority, changeSelectedPriorityHandler }) {
    return (
        <ul className="priority-field-wrapper" onClick={(e) => e.stopPropagation()}>
            <li>
                <label className="pointer flex-row-start-center">
                    <input
                        type="radio"
                        value="1"
                        name="priority"
                        checked={selectedPriority.Low === "1"}
                        onChange={(e) => changeSelectedPriorityHandler({ Low: e.target.value })}
                    />
                    Low
                </label>
            </li>
            <li>
                <label className="pointer">
                    <input
                        type="radio"
                        name="priority"
                        checked={selectedPriority.Medium === "2"}
                        value="2"
                        onChange={(e) => changeSelectedPriorityHandler({ Medium: e.target.value })}
                    />
                    Medium
                </label>
            </li>
            <li>
                <label className="pointer">
                    <input
                        type="radio"
                        name="priority"
                        checked={selectedPriority.High === "3"}
                        value="3"
                        onChange={(e) => changeSelectedPriorityHandler({ High: e.target.value })}
                    />
                    High
                </label>
            </li>
        </ul>
    );
}
