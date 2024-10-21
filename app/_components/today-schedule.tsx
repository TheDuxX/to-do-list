import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const TodaySchedule = () => {
  const date = new Date();
  const formatedDayWeek = format(date, `eeee`, { locale: ptBR });
  const formaterDay = format(date, `', ' dd ' de ' MMMM`, { locale: ptBR });

  return (
    <div className="w-full px-3">
      <div className="flex flex-row py-2 font-semibold text-lg">
        <h2 className="capitalize">{formatedDayWeek}</h2><h3>{formaterDay}</h3>
      </div>
      <div className="w-full grid grid-rows-5 grid-cols-6 grid-flow-auto gap-2 items-center text-right">
        <p className=" items-end text-sm font-light text-white/50">08h00</p>
        <div className="w-full min-h-[25px] h-full bg-white/5 col-span-5 rounded-md"></div>
        <p className=" items-end text-sm font-light text-white/50">09h00</p>
        <div className="w-full h-full bg-white/10 col-span-5 rounded-md"></div>
        <p className="  items-end text-sm font-light text-white/50">10h00</p>
        <div className="w-full h-full bg-white/5 col-span-5 rounded-md"></div>
        <p className="text-sm  items-end font-light text-white/50">11h00</p>
        <div className="w-full h-full bg-white/10 col-span-5 rounded-md"></div>
        <p className="text-sm font-light  items-end text-white/50">12h00</p>
        <div className="w-full h-full bg-white/5 col-span-5 rounded-md"></div>
      </div>
    </div>
  );
};

export default TodaySchedule;
