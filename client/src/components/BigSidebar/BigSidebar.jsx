import { useAppContext } from "../../context/appContext";
import NavLinks from "../NavLinks";
import Logo from "../Logo/Logo";
import Wrapper from "./BigSidebar.styles";

const BigSidebar = () => {
  const { showSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container " : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            {/*<Logo />*/}
            <h4>E-PASSPORT</h4>
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
