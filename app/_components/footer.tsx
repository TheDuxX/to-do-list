import { Calendar, CheckSquare, HomeIcon, User2Icon } from "lucide-react";

const FooterMenu = () => {
  return (
    <>
      <div className="bg-primary w-full fixed bottom-0 flex flex-row justify-around items-center text-white py-3 font-extralight text-sm">
        <div className="flex flex-col items-center justify-center ">
          <HomeIcon size={20}/>
          <p>Início</p>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <Calendar size={20}/>
          <p>Agenda</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <CheckSquare size={20}/>
          <p>Listas</p>
        </div><div className="flex flex-col items-center justify-center">
          <User2Icon size={20}/>
          <p>Perfil</p>
        </div>
      </div>
    </>
  );
};

export default FooterMenu;
