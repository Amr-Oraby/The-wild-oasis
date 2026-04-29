import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";
import useLogout from "./useLogout";

function Logout() {
  const { logout, isLogingOut } = useLogout();
  return (
    <ButtonIcon onClick={logout} disabled={isLogingOut}>
      {!isLogingOut ? <HiArrowLeftOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
