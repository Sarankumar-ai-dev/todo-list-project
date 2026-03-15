import { useState, useEffect } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
  }, [navigate]);

  const firstLetter = userName.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="header">
        <div className="text">
          <h2 className="name">{userName}</h2>
          <p className="title">your to do list</p>
        </div>

        <div
          className="profile-container"
          onMouseEnter={() => setShowMenu(true)}
          onMouseLeave={() => setShowMenu(false)}
        >
          <div className="logo">{firstLetter}</div>
          {showMenu && (
            <div className="dropdown">
              <p onClick={handleLogout}>Logout</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
