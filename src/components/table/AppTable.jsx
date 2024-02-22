import { useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import header from "./HeaderBtn";
import { v4 as uuidv4 } from "uuid";
import { useStore } from "../../zustand/Store";

function AppTable({ sortField, minWidth, onSearchFiltersChange }) {
  const { zu_Data, zu_SelectedList, zu_Columns, zu_Title } = useStore();
  const { zuSelectedList } = useStore();
  //const [selectedList, setSelectedList] = useState([]);
  const dt = useRef(null);

  const funheader = () => {
    return header(dt, onSearchFiltersChange);
  };

  /*   const lastYearTotal = () => {
    let total = 0;

    for (let sale of sales) {
      total += sale.lastYearProfit;
    }

    return total;
  }; */
  /*   console.log(sortField);
  console.log(zu_Data.length);

  const xxx = (sortField = "TransactionKey" ? true : false);
  console.log(xxx);
  const footerGroup = (
    <ColumnGroup>
      <Row>
        <Column
          footer="จำนวน"
          //colSpan={1}
          footerStyle={{ textAlign: "right" }}
        />
        <Column
          footer={zu_Data.length + " รายการ"}
          footerStyle={{ textAlign: "" }}
        />

        <Column
          colSpan={13}
          footer={zu_Data
            .reduce((total, unit) => total + unit.InboundWeight, 0)
            .toLocaleString()}
          footerStyle={{ textAlign: "right" }}
        />
        <Column
          footer={zu_Data
            .reduce((total, unit) => total + unit.OutboundWeight, 0)
            .toLocaleString()}
          footerStyle={{ textAlign: "right" }}
        />
      </Row>
    </ColumnGroup>
  ); */
  return (
    <>
      <div className="max-w-[95%] mx-auto">
        <div className="text-3xl font-bold flex justify-center my-2">
          {zu_Title}
        </div>
        <div className="card">
          <DataTable
            sortField={sortField}
            sortOrder={1}
            value={zu_Data}
            header={funheader}
            ref={dt}
            size="Small"
            showGridlines
            stripedRows
            paginator
            rows={10}
            rowsPerPageOptions={[10, 25, 50]}
            removableSort
            scrollable
            scrollHeight={window.innerHeight - 250}
            tableStyle={{ minWidth: "50rem" }}
            //selection
            selectionMode="single"
            selection={zu_SelectedList}
            //footer={"e.footer"}
            //footerColumnGroup={footerGroup}
            onSelectionChange={(e) => {
              zuSelectedList(e.value);
            }}
            //dataKey={uuidv4()}
            metaKeySelection={true}
          >
            {zu_Columns.map((e, i) => (
              <Column
                key={i}
                field={e.field}
                header={e.header}
                body={e.body}
                footer={e.footer}
                align={e.align}
                sortable
                style={{ minWidth: e.minWidth }}
                pt={{
                  headerCell: { className: "bg-sky-400" },
                  headerTitle: { className: " text-black" },
                  sort: { className: "color-red" },
                  footerCell: { className: "bg-sky-400" },
                }}
              ></Column>
            ))}
          </DataTable>
        </div>
      </div>
    </>
  );
}

export default AppTable;
