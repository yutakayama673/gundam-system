import "../../styles/Home.css";
import { SearchForm, MobileSuitTable } from "./component/index.js";
import { useHome } from "../../hooks/home/useHome";
import HomeRegister from "./modal/HomeRegister";

export default function Home() {
	const {
		mobileSuitNumber, setMobileSuitNumber,
		mobileSuitName, setMobileSuitName,
		pilot, setPilot,
		gundamData,
		showRegister, openRegisterModal, closeRegisterModal,
		loadGundamData, handleLogout, resetFormAndReload, editDesign
	} = useHome();

	return (
		<div className="container">
			{/* Header */}
			<div className="form-group">
				<h1 className="title">Mobile Suit Management System</h1>
				<div style={{ display: "flex", justifyContent: "flex-end" }}>
					<button type="button" className="search-button" onClick={handleLogout}>
						Logout
					</button>
				</div>
			</div>

			{/* Logo */}
			<div className="logo-section">
				<img
					src="/gundam-system/png/anaheimLogo.png"
					alt="アナハイムロゴ"
					className="logo-image"
				/>
			</div>

			{/* Search Form */}
			<div className="form-section small-form">
				<h2>SEARCH MOBILE SUIT</h2>
				<SearchForm
					mobileSuitNumber={mobileSuitNumber}
					setMobileSuitNumber={setMobileSuitNumber}
					mobileSuitName={mobileSuitName}
					setMobileSuitName={setMobileSuitName}
					pilot={pilot}
					setPilot={setPilot}
					onSearch={() => loadGundamData()}
					onReset={resetFormAndReload} 
					onEdit={openRegisterModal}
				/>
			</div>

			{/* Result Table */}
			<div className="result-section">
				<h2>RESULTS</h2>
				<div className="scrollable-table">
					<MobileSuitTable gundamData={gundamData} onEdit={editDesign} />
				</div>
			</div>

			{/* Register Modal */}
			{showRegister && (
				<div className="modal-overlay">
					<div className="modal-content">
						<button onClick={closeRegisterModal}>× 閉じる</button>
						<HomeRegister
							onComplete={() => {
								closeRegisterModal();
								loadGundamData();
							}}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export { HomeRegister };
