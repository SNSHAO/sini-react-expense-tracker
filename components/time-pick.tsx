import React, { useState, useEffect } from "react";
// import { TimePicker } from "antd";
import type { TimePickerProps } from "antd";
import type { Dayjs } from "dayjs";

import Image from "next/image";

import dynamic from "next/dynamic";
const TimePicker = dynamic(() => import("antd/lib/time-picker"), {
  ssr: false,
});

interface TimePickProps {
  onTimeChange: (time: string) => void;
  reset: boolean;
}
const TimePick: React.FC<TimePickProps> = ({ onTimeChange, reset }) => {
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (reset) {
      setSelectedTime(null);
    }
  }, [reset]);

  const OnChangeTime: TimePickerProps["onChange"] = (
    time: Dayjs | null,
    timeString: string | string[]
  ) => {
    console.log(time, timeString);
    setSelectedTime(time);
    onTimeChange(timeString.toString());
  };

  return (
    <>
      <button
        type="button"
        className="flex items-center bg-[#fcac15] pl-5 pr-7 py-[7px] rounded-[30px] text-gray-200 text-lg relative"
      >
        <div className="opacity-0 absolute top-0 left-1">
          <TimePicker
            className="py-3 px-8"
            value={selectedTime}
            onChange={OnChangeTime}
          />
        </div>

        <Image width={28} height={28} src="/timeIcon.png" alt="Select Time" />
        <span className="pl-2 text-base">Select Time</span>
      </button>
      <b className="text-gray-400 text-base font-medium">
        {selectedTime ? selectedTime.format("H:mm A") : "No Time Selected"}
      </b>
    </>
  );
};

export default TimePick;
