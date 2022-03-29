import "./NavSearch.css";
export function NavSearch() {
    return (
        <form className="header-search-form flex-row-start-center" onSubmit={(e) => e.preventDefault()}>
            <input type="search" className="search-input pa-8" placeholder="Search..." />
            <button className="btn-icon btn-icon-sm">
                <i className="fas fa-search"></i>
            </button>
        </form>
    );
}
