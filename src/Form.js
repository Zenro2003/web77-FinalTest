import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment"; // Import thư viện moment

const Form = ({ addTask }) => {
  const { t } = useTranslation();

  const [taskInput, setTaskInput] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleChange = (event) => {
    setTaskInput(event.target.value);
  };

  const handleDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (taskInput.trim() !== "") {
      // Sử dụng moment để chuyển đổi ngày thành định dạng mong muốn
      const formattedDueDate = moment(dueDate).format("YYYY-MM-DD");
      addTask(taskInput, formattedDueDate);
      setTaskInput("");
      setDueDate("");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        placeholder={t("Enter task ...")}
        value={taskInput}
        onChange={handleChange}
      />
    
      <button type="submit">{t("Submit")}</button>
    </form>
  );
};

export default Form;
