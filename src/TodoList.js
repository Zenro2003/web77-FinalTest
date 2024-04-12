import React, { useState } from "react";
import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TodoList = ({ tasks, toggleTaskStatus, onDragEnd }) => {
  const [dueDates, setDueDates] = useState(tasks.map(task => task.dueDate || ""));

  const handleDueDateChange = (index, newDueDate) => {
    const newDueDates = [...dueDates];
    newDueDates[index] = newDueDate;
    setDueDates(newDueDates);
  };

  const calculateDaysLeft = (dueDate) => {
    if (!dueDate) return null;
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div
            className="todo-list-container"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`todo-item-container ${task.done ? "done" : ""}`}
                  >
                    {task.done ? (
                      <FaRegCheckCircle
                        className="item-done-button"
                        color="#9a9a9a"
                        onClick={() => toggleTaskStatus(task.id)}
                      />
                    ) : (
                      <FaRegCircle
                        className="item-done-button"
                        color="#9a9a9a"
                        onClick={() => toggleTaskStatus(task.id)}
                      />
                    )}
                    <div className="item-content">
                      <div className="item-title">{task.title}</div>
                      <input
                        type="date"
                        value={dueDates[index]}
                        onChange={(e) => handleDueDateChange(index, e.target.value)}
                      />
                      {dueDates[index] && (
                        <div className="item-due-date">
                          {calculateDaysLeft(dueDates[index]) !== null ? 
                            `Due in ${calculateDaysLeft(dueDates[index])} days` :
                            "No due date"
                          }
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
