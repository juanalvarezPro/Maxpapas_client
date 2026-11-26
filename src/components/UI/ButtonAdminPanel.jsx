import React from "react";
import { MdAdminPanelSettings } from "react-icons/md";

const ButtonAdminPanel = () => {
  const enterPanelAdmin = (e) => {
    e.preventDefault();
    window.open("/#/admin/", "_blank");
  };

  return (
    <div
      onClick={enterPanelAdmin}
      className="topbar-btn px-4 bg-ink text-white hover:bg-ink/85 font-bold"
    >
      <MdAdminPanelSettings size={24} />
      <p>Panel admin</p>
    </div>
  );
};

export default ButtonAdminPanel;
