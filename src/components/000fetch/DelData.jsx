//delData
const delData = async (
  delDataURL,
  delDataBody,
  setSelectedlist,
  fetchdata,
  selectedlist
) => {
  //console.log(fetchdata);
  try {
    // ตรวจสอบว่า selectedlist มีค่าหรือไม่
    if (!selectedlist) {
      console.log("ไม่ได้เลือกข้อมูล กรุณาเลือกข้อมูลที่ต้องการลบ");
      // คุณอาจต้องแสดงข้อความไปยังผู้ใช้ทาง UI ด้วย
      return;
    }

    // ทำ HTTP POST request ไปยัง URL ที่กำหนด
    const response = await fetch(delDataURL, delDataBody);

    // ตรวจสอบว่าการเชื่อมต่อกับเซิร์ฟเวอร์เป็นไปตามปกติหรือไม่
    if (!response.ok) {
      // หากไม่ปกติ ให้ throw ข้อผิดพลาด
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // สมมติว่าเซิร์ฟเวอร์ตอบกลับด้วยข้อมูลหลังจากการลบ
    const data = await response.json();
    console.log(data);
    await setSelectedlist(null);
    await fetchdata();
    return data;
    // ประมวลผลข้อมูลตามที่ต้องการ เช่น อัปเดต state หรือ UI
    //await setWeightDatas(data);

    // ล็อกข้อมูลที่ได้จากเซิร์ฟเวอร์
    // console.log("ข้อมูลจากเซิร์ฟเวอร์:", data);
  } catch (error) {
    // ถ้ามีข้อผิดพลาดในขณะทำงาน ให้ล็อกไว้
    console.error("เกิดข้อผิดพลาดในการลบข้อมูล:", error);
  }
};

export default delData;
