import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import HomeRegister from "./HomeRegister";
import SearchForm from "../components/SearchForm";
import MobileSuitTable from "../components/MobileSuitTable";
import { getGundamInfos, logoutUser } from "../api/Controller";

export default function Home() {
  const [mobileSuitNumber, setMobileSuitNumber] = useState("");
  const [mobileSuitName, setMobileSuitName] = useState("");
  const [pilot, setPilot] = useState("");
  const [gundamData, setGundamData] = useState([]);
  const [showRegister, setShowRegister] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadGundamData();
  }, []);

  const openRegisterModal = () => setShowRegister(true);
  const closeRegisterModal = () => setShowRegister(false);

  const loadGundamData = async () => {
    try {
      const params = { mobileSuitNumber, mobileSuitName, pilot };
      const data = await getGundamInfos(params);
      setGundamData(data);
    } catch (error) {
      console.error(error);
      alert("検索に失敗しました");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } catch (error) {
      console.error("ログアウトエラー:", error);
      alert("ログアウトに失敗しました");
    }
  };

  const resetForm = () => {
    setMobileSuitNumber("");
    setMobileSuitName("");
    setPilot("");
    loadGundamData();
  };

  const editDesign = (ms) => {
    const query = encodeURIComponent(JSON.stringify(ms));
    navigate(`/mobileSuits?ms=${query}`);
  };

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
          onSearch={loadGundamData}
          onReset={resetForm}
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
