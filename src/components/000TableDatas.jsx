import { useState, useEffect } from "react";

const TableData = () => {
  const [weightDatas, setWeightDatas] = useState([]);
  console.log(weightDatas);

  const Heading = [
    "WeightTimeIn",
    "WeightTimeOut",
    "CarRegister",
    "CustomerID",
    "CustomerName",
    "ProductID",
    "ProductName",
    "Remark1",
    "Remark2",
    "Remark3",
    "Remark4",
    "WeightIn",
    "WeightOut",
    "Weight",
    "WeightNet",
  ];

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://theotesteng.000webhostapp.com/API/api/weightreport/read.php",
        {
          method: "POST",
          body: JSON.stringify({
            WeightDateOutFilter: true,
            WeightDateOutFrom: "2023-10-10",
            WeightDateOutTo: "2023-10-30",
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (response.ok) {
        const data = await response.json(); // แปลง response เป็น JSON
        await setWeightDatas(data);
        //console.log("Data from the server:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="max-w-[95%] mx-auto">
        <div className="text-3xl font-bold flex justify-center my-4">
          รายงาน
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200 ">
              <tr>
                {Heading.map((e, i) => (
                  <th key={i} className="p-3 tracking-wide text-left ">
                    {e}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weightDatas.map((e, i) => (
                <tr key={i}>
                  <td className="p-3 tracking-wide text-left">
                    {e.WeightTimeIn}
                  </td>
                  <td className="p-3 tracking-wide text-left">
                    {e.WeightTimeOut}
                  </td>
                  <td className="p-3 tracking-wide text-left">
                    {e.CarRegister}
                  </td>
                  <td className="p-3 tracking-wide text-left">
                    {e.CustomerID}
                  </td>
                  <td className="p-3 tracking-wide text-left">
                    {e.CustomerName}
                  </td>
                  <td className="p-3 tracking-wide text-left">{e.ProductID}</td>
                  <td className="p-3 tracking-wide text-left">
                    {e.ProductName}
                  </td>
                  <td className="p-3 tracking-wide text-left">{e.Remark1}</td>
                  <td className="p-3 tracking-wide text-left">{e.Remark2}</td>
                  <td className="p-3 tracking-wide text-left">{e.Remark3}</td>
                  <td className="p-3 tracking-wide text-left">{e.Remark4}</td>
                  <td className="p-3 tracking-wide text-left">{e.WeightIn}</td>
                  <td className="p-3 tracking-wide text-left">{e.WeightOut}</td>
                  <td className="p-3 tracking-wide text-left">{e.Weight}</td>
                  <td className="p-3 tracking-wide text-left">{e.WeightNet}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TableData;
