import React, { useState, useEffect } from "react";
import type { DatePickerProps } from "antd";
// import { DatePicker } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
// 確保導入英文語言包
import "dayjs/locale/en";

import Image from "next/image";
import dynamic from "next/dynamic";
const DatePicker = dynamic(() => import("antd/lib/date-picker"), {
  ssr: false,
});

// 設置 Dayjs 使用英文語言
dayjs.locale("en");

interface DatePickProps {
  onDateChange: (date: string) => void;
  reset: boolean;
}

const DatePicke: React.FC<DatePickProps> = ({ onDateChange, reset }) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  useEffect(() => {
    if (reset) {
      setSelectedDate(null);
    }
  }, [reset]);
  const onChange: any = (date: Dayjs, dateString: string | string[]) => {
    console.log(date, dateString);
    setSelectedDate(date);
    onDateChange(dateString.toString());
  };

  return (
    <>
      <button
        type="button"
        className="flex items-center bg-[#7e3eff] pl-5 pr-7 py-[7px] rounded-[30px] text-gray-200 text-lg relative"
      >
        <div className="opacity-0 absolute top-0 left-1">
          <DatePicker
            className="py-3 px-8"
            value={selectedDate}
            onChange={onChange}
            needConfirm
          />
        </div>

        <Image width={28} height={28} src="/dateIcon.png" alt="Select Date" />
        <span className="pl-2 text-base">Select Date</span>
      </button>
      <b className="text-gray-400 text-base font-medium">
        {selectedDate
          ? selectedDate.format("MMMM dddd YY")
          : "No Date Selected"}
      </b>
    </>
  );
};

export default DatePicke;
