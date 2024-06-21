import React, { useEffect } from "react";
import { FinancialReportList } from "../pages/transaction/index";
import { useRouter } from "next/router";
import Image from "next/image";

type AppProps = {
  props: FinancialReportList[];
};

export type Category =
  | "Shopping"
  | "Entertainment"
  | "Food"
  | "Transportation"
  | "Income"
  | "Health";

export type imgList = Record<Category, string>;

export default function FinancialReport({ props }: AppProps) {
  // console.log("props --->", props);

  const router = useRouter();

  const categoryImages: imgList = {
    Shopping: "images/shopping.png",
    Entertainment: "images/entertainment.png",
    Food: "images/food.png",
    Transportation: "images/transportation.png",
    Income: "images/income.png",
    Health: "images/health.png",
  };

  const getImageUrlByCategory = (category: Category) => {
    return categoryImages[category];
  };

  const handleItemClick = (index: number) => {
    router.push({
      pathname: `/transaction/transactionsItem${index}`,
      query: { data: JSON.stringify(props[index]) },
    });
  };

  return (
    <>
      {props.map((item, index) => (
        <div
          className="flex justify-between items-center bg-zinc-50 p-2 mx-1 rounded-2xl cursor-pointer"
          key={item.title}
          onClick={() => handleItemClick(index)}
        >
          <div className="w-14 h-14 bg-red-100 rounded-2xl mr-2">
            <Image
              src={"/" + getImageUrlByCategory(item.category as Category)}
              width={100}
              height={100}
              alt=""
              className="w-full h-full scale-110"
            />
          </div>
          <div className="flex-1 flex justify-between box-border">
            <div className="flex flex-col justify-between w-3/4">
              <h5 className="text-sm">{item.category}</h5>
              <span className="text-xs font-semibold text-gray-400 line-clamp-2">
                {item.description}
              </span>
            </div>
            <div className="flex flex-col justify-between w-1/4 pl-2">
              <span className="text-sm font-bold text-rose-500">
                -${item.amount}
              </span>
              <span className="text-xs font-semibold text-gray-400 line-clamp-2">
                {item.date + " " + item.time}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
