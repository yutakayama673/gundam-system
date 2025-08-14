import "../../styles/component/SearchForm.css";

export default function SearchForm({ mobileSuitNumber, mobileSuitName, pilot, setMobileSuitNumber, setMobileSuitName, setPilot, onSearch, onReset, onEdit }) {
  return (
    <form id="searchForm">
      <div className="form-group">
        <label htmlFor="mobileSuitNumber">MOBILE SUIT NUMBER</label>
        <input type="text" value={mobileSuitNumber} onChange={(e) => setMobileSuitNumber(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="mobileSuitName">MOBILE SUIT NAME</label>
        <input type="text" value={mobileSuitName} onChange={(e) => setMobileSuitName(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="pilot">PILOT</label>
        <input type="text" value={pilot} onChange={(e) => setPilot(e.target.value)} />
      </div>
      
      <div className="button-group">
      	<div className="button-reset">
        	<button type="button" onClick={onSearch}>SEARCH</button>
        	<button type="button" onClick={onReset}>RESET</button>
        </div>
        <button type="button" onClick={onEdit}>CREATE NEW</button>
      </div>
    </form>
  );
}
