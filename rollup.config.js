// rollup.config.js
export default {
    input: 'src/main.js',
    output: {
      file: 'dist/bundle.js',
      format: 'esm', // รูปแบบของไฟล์ Output (ในที่นี้เลือก ESM)
    },
    // เพิ่ม manualChunks เพื่อกำหนด chunk เอง
    manualChunks: {
      // กำหนดชื่อ chunk และระบุ module ที่ควรถูกรวมใน chunk นี้
      chunk1: ['module1', 'module2'],
      chunk2: ['module3', 'module4'],
    },
  };
  