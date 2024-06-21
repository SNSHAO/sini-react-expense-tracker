"use client";
import React, { useState, useEffect, useMemo } from "react";
// import { Link, useLocation } from "react-router-dom";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const BottomBar = () => {
  // 定义底部标签
  // Pass an empty array as the second argument to useMemo to memoize the labels array
  const labels = useMemo(
    () => [
      // { id: 1, title: "Home", url: "icons/Home.png", path: "/" },
      { id: 2, title: "Transaction", url: "icons/Transaction.png", path: "/" },
      { id: 3, title: "", url: "icons/add.png", path: "/expenses" },
      // { id: 4, title: "Budget", url: "icons/Budget.png", path: "/budget" },
      // { id: 5, title: "Profile", url: "icons/Profile.png", path: "/profile" },
    ],
    []
  );

  // 定义 state 来管理当前选中的项目
  // const location = useLocation();
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(1);

  useEffect(() => {
    const currentLabel = labels.find((label) => label.path === router.pathname);
    if (currentLabel) {
      setSelectedId(currentLabel.id);
    }
  }, [router.pathname, labels]);

  // 点击事件处理函数
  const handleClick = (id: number) => {
    setSelectedId(id);
  };

  return (
    <div className="bottom-bar">
      {labels.map((label, index) => (
        <Link href={label.path} key={index}>
          <div
            key={index}
            className={`bottom-bar-item ${
              index === 2 ? "different-style" : "same-style"
            }`}
            onClick={() => handleClick(label.id)}
          >
            <Image
              src={"/" + label.url}
              alt=""
              width={`${label.id === 3 ? 56 : 26}`}
              height={`${label.id === 3 ? 56 : 26}`}
            />
            <span className={label.id === selectedId ? "selected" : ""}>
              {label.title}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BottomBar;
