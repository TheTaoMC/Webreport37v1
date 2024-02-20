import React from "react";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";

import { Button } from "primereact/button";

import source from "./Kanit-Regular.ttf";
// Register font
Font.register({ family: "Kanit", src: source });

// Reference font
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    fontFamily: "Kanit",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});
function ExportPDF({ datas }) {
  console.log(datas);
  const MyDocument = () => (
    <Document>
      <Page size="auto" orientation="landscape" style={styles.page}>
        <View style={styles.section}>
          <Text>123</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <>
      <PDFDownloadLink document={<MyDocument />} fileName="weightDatas.pdf">
        <Button
          className=" p-2 w-24 h-10 rounded-md"
          type="button"
          label="PDF"
          icon="pi pi-file-pdf"
          //severity="warning"
          rounded
          //onClick={exportPdf}
          data-pr-tooltip="PDF"
        />
      </PDFDownloadLink>
    </>
  );
}

export default ExportPDF;
