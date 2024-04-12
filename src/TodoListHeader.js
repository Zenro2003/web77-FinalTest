import React from "react";

const TodoListHeader = ({ count }) => {
  return <div className="header">You have {count} tasks left!</div>;
};

export default TodoListHeader;