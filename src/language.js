import React from 'react';
import { useLanguage } from './Footer'; // Import hook sử dụng ngôn ngữ

const LanguageSwitcher = () => {
  const { toggleLanguage } = useLanguage(); // Lấy hàm toggleLanguage từ hook sử dụng ngôn ngữ

  // Hàm xử lý sự kiện khi click vào nút "en"
  const handleEnClick = () => {
    toggleLanguage('en'); // Chuyển đổi sang tiếng Anh
  };

  // Hàm xử lý sự kiện khi click vào nút "vn"
  const handleVnClick = () => {
    toggleLanguage('vi'); // Chuyển đổi sang tiếng Việt
  };

  return (
    <div>
      <button onClick={handleEnClick}>English</button>
      <button onClick={handleVnClick}>Tiếng Việt</button>
    </div>
  );
};

export default LanguageSwitcher;
