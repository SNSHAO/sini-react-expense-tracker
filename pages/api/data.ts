import { NextApiRequest, NextApiResponse } from "next";

let transactions: Array<any> = []; // 內存存儲的數據

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  // let transactions = JSON.parse(localStorage.getItem("transactions") || "null");
  switch (method) {
    case "GET":
      res.status(200).json(transactions);
      break;
    case "POST":
      const newTransaction = {
        ...req.body,
        id: Date.now().toString().slice(-5),
      };
      transactions.push(newTransaction);
      res.status(201).json(newTransaction);
      break;
    case "PUT":
      const { id, updatedData } = req.body;
      transactions = transactions.map((transaction: any) =>
        transaction.id === id ? { ...transaction, ...updatedData } : transaction
      );
      res.status(200).json({ message: "Transaction updated" });
      break;
    case "DELETE":
      const { deleteId } = req.body;
      transactions = transactions.filter(
        (transaction: any) => transaction.id !== deleteId
      );
      res.status(200).json({ message: "Transaction deleted" });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
