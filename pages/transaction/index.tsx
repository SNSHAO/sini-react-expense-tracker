import { useEffect, useState } from "react";
// import { TransactionList } from "../../dataLists/transaction-list";
import BottomBar from "../../components/bottom-bar";
import FinancialReport from "../../components/financial-report";

export type FinancialReportList = {
  id: number;
  category: string;
  title: string;
  description: string;
  amount: number;
  date: string;
  time: string;
};

export default function Transaction() {
  const [transactions, setTransactions] = useState<FinancialReportList[]>([]);

  // const getTransactionsFromServer = async () => {
  // try {
  //   // 發送請求 獲取數據
  //   const response = await fetch("/api/data");
  //   console.log("response", response);
  //   if (response.ok) {
  //     // 解析回來的數據
  //     const data: FinancialReportList[] = await response.json();
  //     console.log("data----->", data);

  //     // 設置數據
  //     setTransactions(data);
  //     // 本地儲存數據
  //     localStorage.setItem("transactions", JSON.stringify(data));
  //   } else {
  //     console.error("Failed to fetch transactions from server.");
  //   }
  // } catch (error) {
  //   console.error("Error fetching transactions from server:", error);
  // }
  // };

  // const getTransactions = async () => {
  //   const localData = localStorage.getItem("transactions");
  //   console.log("++++>", localData);

  //   if (localData) {
  //     const localDataList = JSON.parse(localData);
  //     // 判斷本地是否有數據 判斷本地數據是否為空
  //     if (localDataList.length > 0 && localDataList[0]) {
  //       // 有數據
  //       setTransactions(JSON.parse(localData));
  //     } else {
  //       // 無數據
  //       getTransactionsFromServer();
  //     }
  //   } else {
  //     // 無數據
  //     getTransactionsFromServer();
  //   }
  // };

  const getTransactions = () => {
    // Get data from localStorage
    const localData = localStorage.getItem("formData");
    console.log("=====>>", localData);

    if (localData) {
      const localDataList: FinancialReportList[] = JSON.parse(localData);
      //console.log("data----->", data);
      // 判斷本地是否有數據 判斷本地數據是否為空
      if (localData.length > 0 && localData[0]) {
        // 有數據 設置數據
        setTransactions(localDataList);
      } else {
        // 無數據
        console.log("No formData found in local storage.");
      }
    } else {
      // 無數據
      console.log("No transactions found in local storage.");
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <>
      <div className="flex flex-col p-6 h-full">
        <h4 className="text-violet-600 font-bold text-lg">
          See your financial report
        </h4>
        <div className="flex-1 pb-9">
          <h5 className="text-black font-bold pt-4 pb-2">Expenses</h5>
          <FinancialReport props={transactions} />
        </div>
        <div className="w-full h-14 fixed left-0 bottom-0">
          <BottomBar />
        </div>
      </div>
    </>
  );
}
