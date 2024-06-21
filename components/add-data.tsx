import React, { useState } from "react";
import TimePick from "./time-pick";
import DatePicke from "./date-pick";
import { useRouter } from "next/router";

type inpValType = {
  id: number;
  title: string;
};

type selType = {
  id: number;
  title: string;
};

const inpVal: inpValType[] = [
  { id: 1, title: "Title" },
  { id: 2, title: "Description" },
  { id: 3, title: "Amount" },
];

const selOtion: selType[] = [
  { id: 0, title: "Category" },
  { id: 1, title: "Food" },
  { id: 2, title: "Transportation" },
  { id: 3, title: "Entertainment" },
  { id: 4, title: "Shopping" },
  { id: 5, title: "Health" },
  { id: 6, title: "Income" },
];

export default function AddData() {
  // Define form initial values
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    amount: "",
    date: "",
    time: "",
  });

  const router = useRouter();

  const [reset, setReset] = useState(false);
  // Show form submission success message
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  // Show form submission error message
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  // Show form submission error message
  const [amountErrorMessage, setAmountErrorMessage] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date: string) => {
    setFormData((prevData) => ({
      ...prevData,
      date,
    }));
  };

  const handleTimeChange = (time: string) => {
    setFormData((prevData) => ({
      ...prevData,
      time,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 校驗表單數據不為空
    const isEmptyField = Object.values(formData).some(
      (value) => value === "" || value === null
    );
    if (isEmptyField) {
      // Show error message
      console.log("Please fill in all fields.", formData);

      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 1000);
      return;
    }

    // 对 form 的 amount字段进行校验 只能输入数字类型
    if (isNaN(Number(formData.amount))) {
      setAmountErrorMessage(true);
      setTimeout(() => {
        setAmountErrorMessage(false);
      }, 1000);
      return;
    }

    // try {
    //   const response = await fetch("/api/data", {
    //     // 發送請求 添加數據
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   if (response.ok) {
    //     const newData = await response.json(); // 解析回來的數據
    //     console.log("Form submitted:", newData);
    //     setShowSuccessMessage(true);

    //     // Reset form
    //     setFormData({
    //       title: "",
    //       category: "",
    //       description: "",
    //       amount: "",
    //       date: "",
    //       time: "",
    //     });
    //     setReset(true);

    //     setTimeout(() => {
    //       setShowSuccessMessage(false);
    //     }, 1000);
    //   } else {
    //     console.error("Failed to submit form.");
    //   }
    // } catch (error) {
    //   console.error("Error submitting form:", error);
    // }

    try {
      // Retrieve existing data from localStorage
      const existingData = JSON.parse(localStorage.getItem("formData") || "[]");
      // Add id
      const formDataId = { ...formData, id: Date.now().toString().slice(-5) };
      const updateData = [...existingData, formDataId];
      localStorage.setItem("formData", JSON.stringify(updateData));

      console.log("Form submitted:", updateData);
      setShowSuccessMessage(true);

      // Reset form
      setFormData({
        title: "",
        category: "",
        description: "",
        amount: "",
        date: "",
        time: "",
      });
      setReset(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 1000);
    } catch (error) {
      console.error("Error submiting form:", error);
    }

    setTimeout(() => {
      router.back();
    }, 1000);
  };

  return (
    <>
      <form
        className="flex flex-col justify-center"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        {/* Select */}
        <div>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`
              mt-1 mb-3 block w-full py-4 px-4 border border-gray-200 bg-white rounded-[30px] text-xl focus:outline-none font-medium
              ${formData.category === "" ? "text-gray-400" : "text-black"}
            `}
          >
            {selOtion.map((item) => (
              <option
                key={item.id}
                value={item.id === 0 ? "" : item.title}
                hidden={item.id === 0 ? true : false}
                disabled={item.id === 0 ? true : false}
              >
                {item.title}
              </option>
            ))}
          </select>
        </div>
        {/* Input */}
        {inpVal.map((item) => (
          <input
            key={item.id}
            type="text"
            name={item.title.toLowerCase()}
            placeholder={item.title}
            value={
              formData[item.title.toLowerCase() as keyof typeof formData] || ""
            }
            onChange={handleChange}
            className="mt-1 mb-4 block w-full py-4 px-4 border-2 border-gray-300 bg-white rounded-[30px] text-xl font-medium focus:outline-none"
          />
        ))}

        {/* DateTime */}
        <div className="flex flex-col w-full mt-2">
          <div className="flex justify-between items-center mb-4 w-full">
            <DatePicke onDateChange={handleDateChange} reset={reset} />
          </div>
          <div className="flex justify-between items-center mb-4 w-full">
            <TimePick onTimeChange={handleTimeChange} reset={reset} />
          </div>
        </div>

        {/* Footer */}
        <span className="w-full h-1 mt-2 mb-6 bg-gray-200"></span>
        <button
          type="submit"
          className="w-full py-4 px-4 mb-10 bg-[#fd3c4a] rounded-[30px] text-gray-200 text-xl font-bold"
        >
          Add
        </button>
      </form>

      {/* success message */}
      {showSuccessMessage && (
        <div className="px-4 py-3 text-green-500 text-center text-[20px] font-bold absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-3/4">
          訊息提交成功~
        </div>
      )}
      {/* error message */}
      {showErrorMessage && (
        <div className="px-4 py-3 text-red-500 text-center text-[20px] font-bold absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-3/4">
          表單還未完成！
        </div>
      )}
      {amountErrorMessage && (
        <div className="px-4 py-3 text-red-500 text-center text-[20px] font-bold absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-3/4">
          Amount 只能输入数字类型
        </div>
      )}
    </>
  );
}
