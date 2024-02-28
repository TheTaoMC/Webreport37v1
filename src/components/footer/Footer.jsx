import React from "react";
import { Typography } from "@material-tailwind/react";

function Footer({ children }) {
  const datas = [
    {
      title: "เกี่ยวกับเรา",
      url: "https://webv3.theo.co.th/th/about-us-th/",
    },
    {
      title: "สินค้าและบริการ",
      url: "https://webv3.theo.co.th/th/products-and-services-th/",
    },
    {
      title: "โปรแกรมทดลองใช้",
      url: "https://webv3.theo.co.th/th/demo/",
    },
    {
      title: "แหล่งเรียนรู้",
      url: "https://webv3.theo.co.th/th/%e0%b9%81%e0%b8%ab%e0%b8%a5%e0%b9%88%e0%b8%87%e0%b9%80%e0%b8%a3%e0%b8%b5%e0%b8%a2%e0%b8%99%e0%b8%a3%e0%b8%b9%e0%b9%89/",
    },
    {
      title: "ข่าวสาร & กิจกรรม",
      url: "https://webv3.theo.co.th/th/%e0%b8%82%e0%b9%88%e0%b8%b2%e0%b8%a7%e0%b8%aa%e0%b8%b2%e0%b8%a3-%e0%b8%81%e0%b8%b4%e0%b8%88%e0%b8%81%e0%b8%a3%e0%b8%a3%e0%b8%a1/",
    },
    {
      title: "ติดต่อเรา",
      url: "https://webv3.theo.co.th/th/contact-us-th/",
    },
  ];
  return (
    <>
      {children}

      <div className="m-auto w-[95%]">
        <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between ">
          <Typography color="blue-gray" className="font-normal">
            &copy; บริษัท ธีโอเอ็นจิเนียริ่ง จำกัด © 2024. All Rights Reserved.
          </Typography>
          <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
            {datas.map((data, index) => (
              <li key={index}>
                <Typography
                  as="a"
                  href={data.url}
                  color="blue-gray"
                  className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                >
                  {data.title}
                </Typography>
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </>
  );
}

export default Footer;
