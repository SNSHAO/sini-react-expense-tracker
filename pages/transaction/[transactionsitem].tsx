"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Category, imgList } from "../../components/financial-report";
import { FinancialReportList } from "./index";
// 提示
import type { PopconfirmProps } from "antd";
import dynamic from "next/dynamic";
import message from "antd/lib/message";

// const Pconfirm = dynamic(() => import("antd/lib/popconfirm/index"), {
//   ssr: false,
// });
const Popconfirm = dynamic(() => import("antd/lib/popconfirm"), { ssr: false });
// const message = dynamic(() => import("antd/lib/message"), { ssr: false });

// 提示信息
// const confirm: PopconfirmProps["onConfirm"] = (e) => {
//   console.log(e);
//   message.success("Click on Yes");
// };

// const cancel: PopconfirmProps["onCancel"] = (e) => {
//   console.log(e);
//   message.error("Click on No");
// };

const TransactionsItem: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<FinancialReportList | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<Partial<FinancialReportList>>(
    {}
  );
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    if (router.query.data) {
      const parsedData = JSON.parse(router.query.data as string);
      setData(parsedData);
      setEditedData(parsedData);
    }
  }, [router.query.data]);

  const categoryImages: imgList = {
    Shopping: "images/shopping.png",
    Entertainment: "images/entertainment.png",
    Food: "images/food.png",
    Transportation: "images/transportation.png",
    Income: "images/income.png",
    Health: "images/health.png",
  };

  const getImageUrlByCategory = (category: Category) => {
    return "/" + categoryImages[category];
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "date_time") {
      const [date, time] = value.split("T");
      // console.log("date:", date, "time:", time);
      setEditedData({ ...editedData, date, time });
    } else {
      setEditedData({ ...editedData, [name]: value });
    }
  };

  // const handleEdit = async () => {
  //   if (!data) return;

  //   try {
  //     const response = await fetch("/api/data", {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ id: data.id, updatedData: editedData }),
  //     });

  //     if (response.ok) {
  //       console.log("------> 888888888888888888");

  //       setData({ ...data, ...editedData });
  //       setIsEditing(false);

  //       // update local storage
  //       const updatedTransactions = JSON.parse(
  //         localStorage.getItem("transactions") || "[]"
  //       ).map((transaction: FinancialReportList) => {
  //         return transaction.id === data.id
  //           ? { ...transaction, ...editedData }
  //           : transaction;
  //       });
  //       console.log("updatedTransactions", updatedTransactions);
  //       console.log("------>", "111111111111111");

  //       localStorage.setItem(
  //         "transactions",
  //         JSON.stringify(updatedTransactions)
  //       );
  //     } else {
  //       console.error("Failed to update transaction.");
  //     }
  //   } catch (error) {
  //     console.error("Error updating transaction:", error);
  //   }
  // };

  const handleEdit = async () => {
    if (!data) return;

    // update local storage
    const updatedTransactions = JSON.parse(
      localStorage.getItem("formData") || "[]"
    ).map((transaction: FinancialReportList) => {
      return transaction.id === data.id
        ? { ...transaction, ...editedData }
        : transaction;
    });
    console.log("updatedTransactions", updatedTransactions);
    console.log("------>", "111111111111111");

    localStorage.setItem("formData", JSON.stringify(updatedTransactions));

    setData({ ...data, ...editedData });
    setIsEditing(false);

    setSuccessMessage(true);

    setTimeout(() => {
      setSuccessMessage(false);
      router.back();
    }, 1000);
  };

  // const handleDelete = async () => {
  //   if (!data) return;
  //   try {
  //     const response = await fetch("/api/data", {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ deleteId: data.id }),
  //     });
  //     if (response.ok) {
  //       console.log("------> 555555");
  //       // Update local storage
  //       const updatedTransactions = JSON.parse(
  //         localStorage.getItem("transactions") || "[]"
  //       ).filter(
  //         (transaction: FinancialReportList) => transaction.id !== data.id
  //       );
  //       console.log("updatedTransactions", updatedTransactions);
  //       console.log("------>", "000000000000");
  //       localStorage.setItem(
  //         "transactions",
  //         JSON.stringify(updatedTransactions)
  //       );
  //       router.back();
  //     } else {
  //       console.error("Failed to delete transaction.");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting transaction:", error);
  //   }
  // };

  const handleDelete = async () => {
    if (!data) return;

    // Update local storage
    const updatedTransactions = JSON.parse(
      localStorage.getItem("formData") || "[]"
    ).filter((transaction: FinancialReportList) => transaction.id !== data.id);
    console.log("updatedTransactions", updatedTransactions);
    console.log("------>", "000000000000");
    localStorage.setItem("formData", JSON.stringify(updatedTransactions));

    setTimeout(() => {
      router.back();
    }, 1000);
  };
  const confirm: PopconfirmProps["onConfirm"] = async (e) => {
    handleDelete();
    await message.success("Click on Yes");
  };

  const cancel: PopconfirmProps["onCancel"] = async (e) => {
    await message.error("Click on No");
  };
  if (!data) return <div>No data...</div>;

  return (
    <>
      <div className="flex flex-col justify-between items-center h-screen relative">
        <h4 className="w-full h-[190px] text-white text-[24px] text-center pt-14 bg-[#7e3eff] ">
          <span className="font-semibold">Expenses Details</span>
        </h4>

        <div className="absolute w-full top-[108px] flex flex-col items-center">
          <div className="w-36 h-36 flex justify-center items-center overflow-hidden rounded-full border-4 border-white shadow-md shadow-gray-200 bg-red-300">
            <Image
              onClick={() => console.log(data)}
              src={getImageUrlByCategory(data.category as Category)}
              width={100}
              height={100}
              className="w-full h-full scale-110"
              alt="category"
            />
          </div>
          <div className="w-full p-6 pt-2 flex flex-col items-center text-center">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="category"
                  value={editedData.category}
                  onChange={handleInputChange}
                  className="w-11/12 h-16 text-sm text-gray-700 bg-gray-50 rounded-md px-2 py-2 mb-2"
                />
                <input
                  type="text"
                  name="description"
                  value={editedData.description}
                  onChange={handleInputChange}
                  className="w-11/12 h-16 text-sm text-wrap text-gray-700 bg-gray-50 rounded-md px-2 py-2 mb-2"
                />
                <input
                  type="number"
                  name="amount"
                  value={editedData.amount}
                  onChange={handleInputChange}
                  className="w-11/12 h-16 text-sm text-gray-700 bg-gray-50 rounded-md px-2 py-2 mb-2"
                />
                <input
                  type="datetime-local"
                  name="date_time"
                  value={`${editedData.date}T${editedData.time}`}
                  onChange={handleInputChange}
                  className="w-11/12 h-16 text-sm text-gray-700 bg-gray-50 rounded-md px-2 py-2 mb-2"
                />
              </>
            ) : (
              <>
                <span className="w-11/12 h-16 text-sm text-gray-700 bg-gray-50 rounded-md px-2 py-2 mb-2 flex items-center justify-center">
                  {data.category}
                </span>
                <span className="w-11/12 h-16 text-sm text-wrap text-gray-700 bg-gray-50 rounded-md px-2 py-2 mb-2 flex items-center justify-center">
                  {data.description}
                </span>
                <span className="w-11/12 h-16 text-sm text-gray-700 bg-gray-50 rounded-md px-2 py-2 mb-2 flex items-center justify-center">
                  {data.amount}
                </span>
                <span className="w-11/12 h-16 text-sm text-gray-700 bg-gray-50 rounded-md px-2 py-2 mb-2 flex items-center justify-center">
                  {new Date(data.date + " " + data.time).toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="w-full p-8 flex justify-center space-x-2">
          {isEditing ? (
            <>
              <button
                type="button"
                className="w-full py-2 px-2 mb-3 bg-[#3e71ff] rounded-[30px] text-white text-lg font-medium"
                onClick={handleEdit}
              >
                Save
              </button>
              <button
                type="button"
                className="w-full py-2 px-2 mb-3 bg-gray-500 rounded-[30px] text-white text-lg font-medium"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="w-full py-2 px-2 mb-3 bg-[#3e71ff] rounded-[30px] text-white text-lg font-medium"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <button
                  type="button"
                  className="w-full py-2 px-2 mb-3 bg-red-500 rounded-[30px] text-white text-lg font-medium"
                  // onClick={handleDelete}
                >
                  Delete
                </button>
              </Popconfirm>
            </>
          )}
          <button
            type="button"
            className="w-full py-2 px-2 mb-3 bg-[#7e3eff] rounded-[30px] text-white text-lg font-medium"
            onClick={() => router.back()}
          >
            Return
          </button>
        </div>
      </div>
      {successMessage && (
        <div className="flex items-center px-3 py-[10px] text-black text-center text-sm bg-white rounded-[10px] absolute top-[16px] left-1/2 transform -translate-x-1/2">
          <span className="flex items-center justify-center text-[10px] text-white w-2 h-2 p-2 bg-green-500 rounded-full mr-2">
            ✓
          </span>
          <span>Success!</span>
        </div>
      )}
    </>
  );
};

export default TransactionsItem;
