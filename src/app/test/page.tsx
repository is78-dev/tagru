"use client";

import { useState } from "react";
import Combobox from "./combobox";

export default function Page() {
  const items = [
    "a",
    "b",
    "aa",
    "abc",
    "f",
    "g",
    "hafa",
    "fjafejaf",
    "sfaaaaaaaaaaaaaaaa",
  ];
  const [disabled, setDisabled] = useState<boolean>(false);

  return (
    <div>
      <button onClick={() => setDisabled((p) => !p)}>change disabled</button>
      <div className="mx-auto max-w-xl">
        <Combobox
          items={items}
          onItemCreate={(item: string) => {
            console.log(item, "を作成");
          }}
          onItemSelect={(item: string) => {
            console.log(item);
          }}
          className="bg-card"
          placeholder="追加または作成するタグ名を入力"
          disabled={disabled}
        />
      </div>
    </div>
  );
}
