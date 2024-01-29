import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import Cookies from "js-cookie";
import { useStore } from "../../zustand/Store";

function AppNavber({ title }) {
  const { zuCheckUser,zuSetTitleFromAddEdit } = useStore();
  const navigate = useNavigate();
  const menuData = useRef(null);
  const menuReport = useRef(null);
  const datamenuItems = [
    {
      label: "Weighttype",
      //icon: "pi pi-plus",
      command: () => {
        navigate("/Weighttype");
      },
    },
    {
      label: "Customer",
      //icon: "pi pi-fw pi-pencil",
      command: () => {
        navigate("/Customer");
      },
    },
    {
      label: "Product",
      //icon: "pi pi-times",
      command: () => {
        navigate("/Product");
      },
    },
    {
      label: "Driver",
      //icon: "pi pi-times",
      command: () => {
        navigate("/Driver");
      },
    },
    {
      label: "Transporter",
      command: () => {
        navigate("/Transporter");
      },
      //icon: "pi pi-times",
    },
    {
      label: "User",
      command: () => {
        navigate("/User");
      },
      //icon: "pi pi-times",
    },
    {
      label: "Weight",
      command: () => {
        zuSetTitleFromAddEdit("weight");
        navigate("/Weight");
      },
      //icon: "pi pi-times",
    },
  ];
  const reportmenuItems = [
    {
      label: "Weighttype",
      //icon: "pi pi-plus",
      command: () => {
        navigate("/Weighttype");
      },
    },
    {
      label: "Customer",
      //icon: "pi pi-fw pi-pencil",
      command: () => {
        navigate("/Customer");
      },
    },
    {
      label: "Product",
      //icon: "pi pi-times",
      command: () => {
        navigate("/Product");
      },
    },
    {
      label: "Driver",
      //icon: "pi pi-times",
      command: () => {
        navigate("/Driver");
      },
    },
    {
      label: "Transporter",
      command: () => {
        navigate("/Transporter");
      },
      //icon: "pi pi-times",
    },
    {
      label: "WeightReport",
      command: () => {
        navigate("/WeightReport");
      },
      //icon: "pi pi-times",
    },
  ];
  return (
    <>
      {title !== "login" && (
        //<div className="flex flex-wrap gap-2 justify-center p-2 bg-blue-100 text-gray-200 text-lg">
        <div className="flex gap-2 justify-between p-2 bg-blue-100 text-gray-500 text-lg">
          <div>
            <div className="flex  md:flex-row">
              <img
                src="https://webv3.theo.co.th/wp-content/uploads/2022/05/Logo_New-1.jpg"
                alt=""
                //width={45}
                className="p-1 h-20 xs:h-10"
              />
              <div className="hidden xs:block xs:self-end">
                <div className="text-xs">บริษัท ธีโอเอ็นจิเนียริ่งจำกัด </div>
                <div className="text-xs">THEO Engineering Co, Ltd.</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <Button
              label="Main"
              icon="pi pi-home"
              className="p-2 w-24 h-10"
              onClick={() => {
                zuCheckUser(() => navigate("/"));
                navigate("/main");
              }}
              aria-controls="popup_menu_left"
              aria-haspopup
            />
            <Menu
              model={datamenuItems}
              popup
              ref={menuData}
              id="popup_menu_left"
            />

            <Button
              label="Data"
              icon="pi pi-server"
              className="p-2 w-24 h-10 "
              onClick={(event) => menuData.current.toggle(event)}
              aria-controls="popup_menu_left"
              aria-haspopup
            />

            <Menu
              model={reportmenuItems}
              popup
              ref={menuReport}
              id="popup_menu_left"
            />
            {/*             <Button
              label="Report"
              icon="pi pi-tablet"
              className="p-2 w-24 h-10"
              //onClick={(event) => menuReport.current.toggle(event)}
              onClick={() => navigate("/WeightReport")}
              aria-controls="popup_menu_left"
              aria-haspopup
            /> */}
            <Button
              label="Logout"
              icon="pi pi-home"
              className="p-2 w-24 h-10 col-start-2 md:col-start-3 "
              onClick={() => {
                Cookies.remove("user");
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
