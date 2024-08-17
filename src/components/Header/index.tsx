import Image from "next/image";
import React from "react";

type Props = {
  title: string;
};

function Header({ title }: Props) {
  return (
    <div className="py-4 flex items-center justify-between w-full">
      <h1 className="text-lg font-bold">{title}</h1>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/7/73/Andrzej_Person_Kancelaria_Senatu_2005.jpg"
        alt="avatar"
        width={50}
        height={50}
        className="rounded-full overflow-hidden w-10 h-10 border-2 border-white shadow-lg"
      />
    </div>
  );
}

export default Header;
