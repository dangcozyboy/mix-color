import React from "react";
import * as XLSX from "xlsx/xlsx.mjs";

const handleELXS = () => {
  // Đọc file Excel hiện có
  const fileReader = new FileReader();
  fileReader.onload = (event) => {
    const data = event.target.result;
    const workbook = XLSX.read(data, { type: "binary" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    // Chuyển dữ liệu đã đọc từ file Excel thành mảng
    const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Thêm dữ liệu mới vào mảng
    const newData = [
      ["New Name", "New Age", "New Country"],
      ["Alice", 28, "Germany"],
      ["Tom", 35, "UK"],
      ["Lisa", 22, "France"],
    ];

    const extendedData = [...excelData, ...newData];

    // Tạo worksheet mới từ dữ liệu mở rộng
    const newWorksheet = XLSX.utils.aoa_to_sheet(extendedData);

    // Tạo workbook mới và thêm worksheet mới vào workbook
    const newWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, "Sheet1");

    // Ghi dữ liệu mới vào file Excel ban đầu
    const excelBuffer = XLSX.write(newWorkbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const fileUrl = URL.createObjectURL(dataBlob);

    const downloadLink = document.createElement("a");
    downloadLink.href = fileUrl;
    downloadLink.download = "updated_example.xlsx";
    downloadLink.click();
  };

  // Replace 'your_existing_file.xlsx' with your actual file
  const fileInput = document.getElementById("your_file_input");
  const file = fileInput.files[0];
  fileReader.readAsBinaryString(file);
};

const CreateMix = () => {
  return (
    <div>
      <input type="file" id="your_file_input" />
      <button onClick={handleELXS}>Export to Excel</button>
    </div>
  );
};

export default CreateMix;
