import JointSignature from "./JointSignature";
import DynamicIcon from "./DynamicIcon";
import SignInLink from "./SignInLink";

const Footer = () => {
  return (
    <footer className="relative w-full bg-neutral text-neutral-content">
      <div className="flex flex-col items-center justify-center gap-6 px-2 py-12 sm:px-6 md:px-12 xl:px-32 2xl:px-48 lg:flex-row">
        <div className="hidden p-3 ml-auto lg:block w-72">
          <JointSignature dark vertical />
        </div>
        <div className="hidden lg:block w-0.5 h-[200px] bg-base-100 mx-6"></div>
        <div className="flex flex-col gap-2 px-2 text-center lg:text-start lg:mr-auto">
          <p className="text-sm font-bold">
            Diretoria da Contabilidade Geral do Estado
          </p>
          <p className="text-lg font-bold">Secretaria de Estado da Fazenda</p>
          <p className="text-sm font-light">
            Rua Benjamin Constant, 946 – Centro
            <br />
            Rio Branco – AC, 69900-062
            <br />
            CNPJ: 04.034.484/0001-40
            <br />
            UASG: 926063
          </p>
          <div className="flex items-center justify-center w-full gap-8 py-3 lg:justify-start">
            <a target="_blank" href="https://www.facebook.com/sefazacre">
              <DynamicIcon name="facebook" />
            </a>
            <a target="_blank" href="https://www.instagram.com/sefazacre/">
              <DynamicIcon name="instagram" />
            </a>
          </div>
        </div>
        <div className="lg:hidden w-full max-w-[300px] mx-auto">
          <JointSignature dark />
        </div>
      </div>
      <p className="w-full px-2 mt-3 mb-20 text-xs font-light text-center md:mb-3 lg:text-sm">
        © {new Date().getFullYear()} - DICONGE - SEFAZ-AC | Todos os direitos
        reservados
      </p>
      <SignInLink />
    </footer>
  );
};

export default Footer;
