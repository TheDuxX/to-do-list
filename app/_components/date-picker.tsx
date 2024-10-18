import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

const SelectDate = () => {
  return (
    <>
      <div className="w-[95%] my-2 border border-border rounded-xl h-fit py-3 px-4 flex flex-col items-center justify-center gap-4">
        <div className="flex flex-row items-center justify-between w-[80%]">
          <ChevronLeft />
          <h2>Outubro</h2>
          <ChevronRight />
        </div>
        <div className="flex flex-row gap-3 justify-between w-full">
          <div className="flex flex-col items-center justify-center w-full min-w-12 min-h-16 bg-input/20 border border-border rounded-lg">
            <small>Sex</small>
            <h3 className="text-lg font-semibold">11</h3>
          </div>
          <div className="flex flex-col items-center justify-center w-full min-w-12 min-h-16 bg-input/20 border border-border rounded-lg">
            <small>Sab</small>
            <h3 className="text-lg font-semibold">12</h3>
          </div>
          <div className="flex flex-col items-center justify-center w-full min-w-12 min-h-16 bg-primary border border-border rounded-lg">
            <small>Dom</small>
            <h3 className="text-lg font-semibold">13</h3>
          </div>
          <div className="flex flex-col items-center justify-center w-full min-w-12 min-h-16 bg-input/20 border border-border rounded-lg">
            <small>Seg</small>
            <h3 className="text-lg font-semibold">14</h3>
          </div>
          <div className="flex flex-col items-center justify-center w-full min-w-12 min-h-16 bg-input/20 border border-border rounded-lg">
            <small>Ter</small>
            <h3 className="text-lg font-semibold">15</h3>
          </div>
        </div>
        <Button className="flex items-center gap-2">
          <Calendar />
          <p>Agendar</p>
        </Button>
      </div>
    </>
  );
};

export default SelectDate;
