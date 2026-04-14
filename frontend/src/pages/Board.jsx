import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import API from "../api/api";
import bgImage from "../assets/wallpaper2.jpg";

export default function Board() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const columns = ["todo", "doing", "done"];

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    fetchTasks();
  }, [id]);

  const fetchTasks = async () => {
    const res = await API.get(`/tasks/${id}`);
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!newTask.trim()) return;

    await API.post("/tasks", {
      title: newTask,
      status: "todo",
      boardId: id,
    });

    setNewTask("");
    fetchTasks();
  };

  const deleteTask = async (taskId) => {
    await API.delete(`/tasks/${taskId}`);
    fetchTasks();
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    await API.put(`/tasks/${result.draggableId}`, {
      status: result.destination.droppableId,
    });

    fetchTasks();
  };

  const getTasks = (status) =>
    tasks.filter((t) => t.status === status);

  return (
    <div
      className="min-h-screen p-6 bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >

      {/* ✅ HEADER WITH LOGOUT */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl text-white">Board</h2>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* ADD TASK */}
      <div className="mb-6 flex gap-3">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter task..."
          className="p-2 rounded w-80"
        />

        <button
          onClick={addTask}
          className="bg-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </div>

      {/* DRAG & DROP */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-6">

          {columns.map((col) => (
            <Droppable droppableId={col} key={col}>
              {(provided) => (
                <div
                  className="bg-white/10 p-4 rounded-xl min-h-[400px]"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h3 className="text-white mb-4 capitalize">
                    {col}
                  </h3>

                  {getTasks(col).map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="bg-white/20 text-white p-3 rounded mb-2"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="flex justify-between items-center">
                            {task.title}

                            <button
                              onClick={() => deleteTask(task._id)}
                              className="text-red-300"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}

        </div>
      </DragDropContext>
    </div>
  );
}