import React, { useEffect, useRef, useState } from "react";
import AppNavber from "../navbar/AppNavber";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import Cookies from "js-cookie";
import { useStore } from "../../zustand/Store";

function AppLogin() {
  const { zuLogin, zuCheckUser } = useStore();

  const navigate = useNavigate();
  const toast = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    LogInName: "",
    LogInPassword: "",
  });
  console.log("formData ", formData);
  useEffect(() => {
    //ถ้ามีuser เก็บใน cookie ให้ไปหน้า main
    if (Cookies.get("user")) {
      return navigate("/main");
    }
    //zuCheckUser(() => navigate("/main"));
  }, []);
  const handleLogin = async () => {
    const res = await zuLogin(username, password, formData);

    if (res === "success") {
      /*       const authenticatedUser = { username, password };
      Cookies.set("user", JSON.stringify(authenticatedUser), {
        expires: 1 / 1000,
      }); */
      return navigate("/main");
    } else {
      //alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
        life: 3000,
      });
    }
  };

  const handleKeyPress = (event) => {
    //Enter
    if (event.key === "Enter") {
      handleLogin();
      console.log("Enter key pressed");
    }
  };

  const updateFormData = (field, value) => {
    //console.log("field, value ", field, value);
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <div>
      <Toast ref={toast} />
      <AppNavber title={"login"} />
      <div className="flex justify-center items-center h-[90vh]">
        <div className="sm:w-[30%] rounded-lg border-4 border-sky-500/50">
          <div className="p-2 text-xl antialiased font-semibold">
            เข้าสู่ระบบ
          </div>
          <div className="p-2 flex flex-col">
            <label htmlFor="username">ชื่อผู้ใช้</label>
            <InputText
              id="username"
              aria-describedby="username-help"
              autoFocus
              value={formData.LogInName}
              onChange={(e) => {
                //setUsername(e.target.value);
                updateFormData("LogInName", e.target.value);
              }}
            />
          </div>
          <div className="p-2 flex flex-col">
            <label htmlFor="username">password</label>
            <Password
              id="password"
              aria-describedby="password-help"
              value={formData.LogInPassword}
              onChange={(e) => {
                //setPassword(e.target.value);
                updateFormData("LogInPassword", e.target.value);
              }}
              onKeyDown={handleKeyPress}
              feedback={false}
              //tabIndex={1}
              toggleMask
              pt={{
                input: { className: "w-full" },
                showIcon: { className: "flex" },
                hideIcon: { className: "flex" },
              }}
            />
          </div>
          <div className="p-2">
            <Button
              className="w-full"
              label="เข้าสู่ระบบ"
              onClick={handleLogin}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppLogin;
