//เรียกข้อมูล
const fetchData = async (url, option, setDatas2) => {

  try {
    const response = await fetch(url, option);
    //console.log(response);
    if (!response.ok) {
      setDatas2([]);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    if (response.ok) {
      const data = await response.json();
      //setDatas(data);
      setDatas2(data);
    }
  } catch (error) {
    setDatas2([]);
    console.error("Error fetching data:", error);
  }
};

export default fetchData;
