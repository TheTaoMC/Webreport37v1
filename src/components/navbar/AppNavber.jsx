import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import Cookies from "js-cookie";
import { useStore } from "../../zustand/Store";
import { Menubar } from "primereact/menubar";
function AppNavber({ title }) {
  const { zuCheckUser, zuSetTitleFromAddEdit, zu_permission } = useStore();
  const navigate = useNavigate();
  const menuData = useRef(null);

  const datamenuItems = [
    {
      label: "ประเภทชั่ง",
      command: () => {
        navigate("/TranType");
      },
    },
    {
      label: "โกดัง",
      //icon: "pi pi-fw pi-pencil",
      command: () => {
        navigate("/Company");
      },
    },
    {
      label: "คู่ค้า",
      //icon: "pi pi-fw pi-pencil",
      command: () => {
        navigate("/Customer");
      },
    },
    {
      label: "สินค้า",
      //icon: "pi pi-times",
      command: () => {
        navigate("/Product");
      },
    },
    {
      label: "บรรจุภัณฑ์",
      command: () => {
        navigate("/Packing");
      },
    },
    {
      label: "หน่วย",
      command: () => {
        navigate("/TrdUnt");
      },
    },
    {
      label: "ความชื้น",
      command: () => {
        navigate("/MoistTH");
      },
      //icon: "pi pi-times",
    },
    {
      label: "ผู้ใช้งาน",
      command: () => {
        navigate("/User");
      },
      //icon: "pi pi-times",
      visible: zu_permission ? true : false,
    },
    {
      label: "ข้อมูลชั่งน้ำหนัก",
      command: () => {
        navigate("/Transctn");
      },
    },
  ];

  return (
    <>
      <Menu model={datamenuItems} popup ref={menuData} id="popup_menu_left" />

      {title !== "login" && (
        //<div className="flex flex-wrap gap-2 justify-center p-2 bg-blue-100 text-gray-200 text-lg">
        <div className="flex gap-2 justify-between p-2 bg-blue-100 text-gray-500 text-lg">
          <div>
            <div className="flex  md:flex-row">
              <a href="https://webv3.theo.co.th/">
                <img
                  src="https://webv3.theo.co.th/wp-content/uploads/2022/05/Logo_New-1.jpg"
                  alt=""
                  //width={45}
                  className="p-1 h-20 xs:h-10"
                />
              </a>
              <div className="hidden xs:block xs:self-end">
                <a href="https://webv3.theo.co.th/">
                  <div className="text-xs">บริษัท ธีโอเอ็นจิเนียริ่งจำกัด </div>
                </a>
                <a href="https://webv3.theo.co.th/">
                  <div className="text-xs">THEO Engineering Co, Ltd.</div>
                </a>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
            <Button
              label="Dashboard"
              icon="pi pi-home"
              className="p-2 w-26 h-10"
              onClick={() => {
                navigate("/main");
              }}
              aria-controls="popup_menu_left"
              aria-haspopup
            />
            <Button
              label="ข้อมูล"
              icon="pi pi-server"
              className="p-2 w-26 h-10 "
              onClick={(event) => menuData.current.toggle(event)}
              aria-controls="popup_menu_left"
              aria-haspopup
            />
            <Button
              label="ออกจากระบบ"
              icon="pi pi-home"
              className="p-2 w-26 h-10 col-start-2 md:col-start-3 "
              onClick={() => {
                sessionStorage.removeItem("user");
                navigate("/");
              }}
              aria-controls="popup_menu_left"
              aria-haspopup
            />
          </div>
        </div>
      )}
    </>
  );
}

export default AppNavber;
