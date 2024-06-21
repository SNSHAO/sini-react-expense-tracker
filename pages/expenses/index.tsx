import React from "react";
import { useState } from "react";
import AddData from "../../components/add-data";

export default function Expense() {
  const [activeButtom, setActiveButtom] = useState("Expense");

  return (
    <div className="flex flex-col justify-center w-full h-screen relative">
      <div className="h-full bg-gradient-to-b from-[#fd3c4a] via-[#fd3c4a] to-white p-6 pt-14 box-border">
        <div className="flex rounded-[40px] bg-white h-16 mb-12">
          <button
            onClick={() => setActiveButtom("Expense")}
            className={`flex-1 py-2 px-4 m-1 rounded-full text-xl ${
              activeButtom === "Expense"
                ? "bg-[#7e3eff] text-white"
                : "bg-white text-black"
            }`}
          >
            Expense
          </button>
          <button
            onClick={() => setActiveButtom("Income")}
            className={`flex-1 py-2 px-4 m-1 rounded-full text-xl ${
              activeButtom === "Income"
                ? "bg-[#7e3eff] text-white"
                : "bg-white text-black"
            }`}
          >
            Income
          </button>
        </div>
        <div className="flex flex-col justify-between h-[40px]">
          <span className="text-[#febabf] text-2xl pb-2">How much?</span>
          <span className="text-white text-7xl font-bold">0</span>
        </div>
      </div>
      <div className="absolute left-0 bottom-0 h-[53%] w-full bg-white rounded-t-[40px] p-6 box-border">
        <AddData />
      </div>
    </div>
  );
}
