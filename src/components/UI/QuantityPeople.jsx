import React from "react";
import { MdOutlineEmojiPeople } from "react-icons/md";

export const QuantityPeople = ({People}) => {
  return (
    <div className="tag cursor-pointer bg-ink/85 text-white backdrop-blur text-xs xl:text-sm py-1" title="Personas">
      <p>{People}</p>
      <MdOutlineEmojiPeople className="text-sm" />
    </div>
  );
};
