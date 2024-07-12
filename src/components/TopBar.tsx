import Logo from "./Logo";
import LinkButton from "./LinkButton";
import ToggleThemeButton from "./ToggleThemeButton";
import ToggleDrawerButton from "./ToggleDrawerButton";
import DynamicIcon from "./DynamicIcon";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import EditorModeTools from "./EditorModeTools";

const TopBar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header className="flex items-center justify-between w-full gap-3 px-2 pt-6 sm:px-6 md:px-12 xl:px-32">
      <Logo />
      <nav className="flex items-center justify-end w-full gap-6 navbar">
        <div className="lg:hidden">
          <ToggleDrawerButton />
        </div>
        {session ? (
          <div className="hidden lg:block">
            <EditorModeTools admin={session.user.admin} />
          </div>
        ) : (
          <ul className="items-center hidden gap-12 lg:flex justify-center">
            <li>
              <LinkButton
                text="Abrir SICAF"
                color="ghost"
                icon={<DynamicIcon name="external-link" />}
                size="xs"
                to="https://sicaf.sefaz.ac.gov.br/sicaf/app.sicaf"
                openInNewTab
              />
            </li>
            <li>
              <LinkButton
                text="Falar com Suporte"
                color="ghost"
                icon={<DynamicIcon name="phone" />}
                size="xs"
                to="https://wa.me/5568992315316"
                openInNewTab
              />
            </li>
          </ul>
        )}
        <ToggleThemeButton />
      </nav>
    </header>
  );
};

export default TopBar;
