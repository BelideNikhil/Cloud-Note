import { useState, createContext, useContext } from "react";
const NavAsideContext = createContext();
export function NavAsideProvider({ children }) {
    const [navAsideToggle, setNavAsideToggle] = useState(false);
    function asideToggleSetterFunction(value) {
        setNavAsideToggle(value);
    }
    return (
        <NavAsideContext.Provider value={{ navAsideToggle, asideToggleSetterFunction }}>
            {children}
        </NavAsideContext.Provider>
    );
}
export function useNavAside() {
    return useContext(NavAsideContext);
}
