import { useSelector } from "react-redux";
import headerLogo from "../images/header-logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutAction } from "../store/userSlice";
import { deleteCardsFromMemoryAction } from "../store/cardSlice";
import { useDispatch } from "react-redux";
import { logoutToken } from "../store/checkTokenSlice";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginUser, userEmail } = useSelector((state) => state.checkToken);
  const handleLogOutAccount = () => {
    dispatch(logoutAction());
    dispatch(deleteCardsFromMemoryAction());
    dispatch(logoutToken());
    navigate("/sign-in", { replace: true });
  };

  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="лого" />
      {location.pathname === "/sign-up" && (
        <Link to="/sign-in" className="header__button">
          Войти
        </Link>
      )}
      {location.pathname === "/sign-in" && (
        <Link to="/sign-up" className="header__button">
          Регистрация
        </Link>
      )}
      {loginUser && (
        <div className="header__user-section">
          <h3 className="header__email">{userEmail}</h3>
          <button onClick={handleLogOutAccount} className="header__button">
            Выйти
          </button>
        </div>
      )}
    </header>
  );
}
