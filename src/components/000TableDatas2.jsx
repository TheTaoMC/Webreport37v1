import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Button } from "primereact/button"
import { ConfirmDialog } from "primereact/confirmdialog"
import { confirmDialog } from "primereact/confirmdialog"
import { Toast } from "primereact/toast"
import "primeicons/primeicons.css"
import AddData from "./AddData"
import AppNavber from "./navbar/AppNavber"

const TableData2 = () => {
  const [weightDatas, setWeightDatas] = useState([])
  const [selectedlist, setSelectedlist] = useState(null)
  const [visible, setVisible] = useState(false)
  const dt = useRef(null)
  console.log(visible)

  /*   if (selectedlist) {
    console.log(selectedlist.DataID);
  } */

  //Columns
  const columns = [
    {
      field: "DataID",
      header: "DataID",
    },
    {
      field: "WeightTimeIn",
      header: "WeightTimeIn",
    },
    {
      field: "WeightTimeOut",
      header: "WeightTimeOut",
    },
    {
      field: "CarRegister",
      header: "CarRegister",
    },
    {
      field: "CustomerID",
      header: "CustomerID",
    },
    {
      field: "CustomerName",
      header: "CustomerName",
    },
    {
      field: "ProductID",
      header: "ProductID",
    },
    {
      field: "ProductName",
      header: "ProductName",
    },
    {
      field: "Remark1",
      header: "Remark1",
    },
    {
      field: "Remark2",
      header: "Remark2",
    },
    {
      field: "Remark3",
      header: "Remark3",
    },
    {
      field: "Remark4",
      header: "Remark4",
    },
    {
      field: "WeightIn",
      header: "WeightIn",
    },
    {
      field: "WeightOut",
      header: "WeightOut",
    },
    {
      field: "Weight",
      header: "Weight",
    },
    {
      field: "WeightNet",
      header: "WeightNet",
    },
  ]

  //fetchData
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://theotesteng.000webhostapp.com/API/api/weightreport/read.php",
        {
          method: "POST",
          body: JSON.stringify({
            WeightDateOutFilter: true,
            WeightDateOutFrom: "2021-01-01",
            WeightDateOutTo: "2023-12-31",
          }),
        }
      )
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      if (response.ok) {
        const data = await response.json() // แปลง response เป็น JSON
        await setWeightDatas(data)
        //console.log("Data from the server:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  //addData

  //delData
  const delData = async () => {
    try {
      // ตรวจสอบว่า selectedlist มีค่าหรือไม่
      if (!selectedlist) {
        console.log("ไม่ได้เลือกข้อมูล กรุณาเลือกข้อมูลที่ต้องการลบ")
        // คุณอาจต้องแสดงข้อความไปยังผู้ใช้ทาง UI ด้วย
        return
      }

      // ทำ HTTP POST request ไปยัง URL ที่กำหนด
      const response = await fetch(
        "https://theotesteng.000webhostapp.com/API/api/weight/delete.php",
        {
          method: "POST",
          body: JSON.stringify({
            DataID: selectedlist.DataID,
          }),
        }
      )

      // ตรวจสอบว่าการเชื่อมต่อกับเซิร์ฟเวอร์เป็นไปตามปกติหรือไม่
      if (!response.ok) {
        // หากไม่ปกติ ให้ throw ข้อผิดพลาด
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      // สมมติว่าเซิร์ฟเวอร์ตอบกลับด้วยข้อมูลหลังจากการลบ
      const data = await response.json()
      await console.log(data)
      await setSelectedlist(null)
      await fetchData()
      return data

      // ประมวลผลข้อมูลตามที่ต้องการ เช่น อัปเดต state หรือ UI
      //await setWeightDatas(data);

      // ล็อกข้อมูลที่ได้จากเซิร์ฟเวอร์
      // console.log("ข้อมูลจากเซิร์ฟเวอร์:", data);
    } catch (error) {
      // ถ้ามีข้อผิดพลาดในขณะทำงาน ให้ล็อกไว้
      console.error("เกิดข้อผิดพลาดในการลบข้อมูล:", error)
    }
  }

  const toast = useRef(null)

  const accept = () => {
    delData().then((deletedData) => {
      if (deletedData) {
        toast.current.show({
          severity: "info",
          summary: "แจ้งเตือน",
          detail: "ลบข้อมูลเรียบร้อย",
          life: 3000,
        })
      } else {
        toast.current.show({
          severity: "warn",
          summary: "แจ้งเตือน",
          detail: "กรุณาเลือกข้อมูล",
          life: 3000,
        })
      }
    })
  }

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "แจ้งเตือน",
      detail: "ยกเลิก",
      life: 3000,
    })
  }

  const confirmdel = () => {
    if (!selectedlist) {
      console.log("ไม่ได้เลือกข้อมูล กรุณาเลือกข้อมูลที่ต้องการลบ")
      // คุณอาจต้องแสดงข้อความไปยังผู้ใช้ทาง UI ด้วย
      toast.current.show({
        severity: "warn",
        summary: "แจ้งเตือน",
        detail: "ไม่ได้เลือกข้อมูล กรุณาเลือกข้อมูลที่ต้องการลบ",
        life: 3000,
      })
      return
    }
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "bg-red-700 hover:bg-red-800",
      rejectClassName: "",
      accept,
      reject,
    })
  }

  //load Data
  useEffect(() => {
    fetchData()
    //getData()
  }, [])

  //Export CSV Pdf
  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly })
  }

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0)

        doc.autoTable(exportColumns, weightDatas)
        doc.save("weightDatas.pdf")
      })
    })
  }

  const exportColumns = columns.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }))

  //visible Dialog
  const handleClick = () => {
    if (!visible) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }

  const header = (
    <div className="flex sm:flex-row flex-col  sm:align-items-center items-center justify-between gap-2">
      <Toast ref={toast} />
      <ConfirmDialog className="text-6xl border border-gray-950" />
      <div className="flex sm:flex-row flex-col gap-2">
        <Button
          className="bg-cyan-700 hover:bg-cyan-800 p-2 w-24 h-12"
          label="Add"
          onClick={handleClick}
        />
        <AddData VisibleIn={visible} VisibleOut={handleClick} />
        <Button
          className="bg-cyan-700 hover:bg-cyan-800 p-2 w-24 h-12"
          label="Edit"
        />
        <Button
          className="bg-red-700 hover:bg-red-800 p-2 w-24 h-12"
          label="Delete"
          icon="pi pi-times"
          onClick={confirmdel}
        />
      </div>
      <div className="flex sm:flex-row flex-col gap-2">
        <Button
          className="bg-cyan-700 hover:bg-cyan-800 p-2 w-24 rounded-md "
          type="button"
          icon="pi pi-file-pdf"
          severity="warning"
          rounded
          onClick={exportPdf}
          data-pr-tooltip="PDF"
        />
        <Button
          className="bg-cyan-700 hover:bg-cyan-800 p-2 w-24 rounded-md"
          type="button"
          icon="pi pi-file"
          rounded
          onClick={() => exportCSV(false)}
          data-pr-tooltip="CSV"
        />
      </div>
    </div>
  )
  return (
    <>
      <AppNavber />
      <div className="max-w-[95%] mx-auto">
        <div className="text-3xl font-bold flex justify-center my-2">
          รายงาน
        </div>
        <div className="card">
          <DataTable
            value={weightDatas}
            header={header}
            ref={dt}
            size="Small"
            showGridlines
            stripedRows
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            removableSort
            scrollable
            scrollHeight={window.innerHeight - 230}
            tableStyle={{ minWidth: "200rem" }}
            //selection
            selectionMode="single"
            selection={selectedlist}
            onSelectionChange={(e) => setSelectedlist(e.value)}
            dataKey="DataID"
            metaKeySelection={true}
          >
            {columns.map((e, i) => (
              <Column
                key={i}
                field={e.field}
                header={e.header}
                //style={{ width: "50%" }}
                sortable
              ></Column>
            ))}
          </DataTable>
        </div>
      </div>
    </>
  )
}

export default TableData2
