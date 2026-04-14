import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import bgImage from "../assets/bg.jpg";

export default function Dashboard() {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [newBoard, setNewBoard] = useState("");

  // ✅ LOGOUT FUNCTION (ADD THIS)
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    const res = await API.get("/boards");
    setBoards(res.data);
  };

  const addBoard = async () => {
    if (!newBoard.trim()) return;

    await API.post("/boards", { title: newBoard });
    setNewBoard("");
    fetchBoards();
  };

  const deleteBoard = async (id) => {
    await API.delete(`/boards/${id}`);
    fetchBoards();
  };

  return (
    <div
      className="min-h-screen p-8 bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* ✅ HEADER WITH LOGOUT */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-white font-bold">
          Your Boards
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="mb-6 flex gap-3">
        <input
          value={newBoard}
          onChange={(e) => setNewBoard(e.target.value)}
          placeholder="New board name"
          className="p-2 rounded w-80"
        />

        <button
          onClick={addBoard}
          className="bg-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {boards.map((board) => (
          <div
            key={board._id}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl relative cursor-pointer hover:scale-105 transition"
          >
            <h2
              onClick={() => navigate(`/board/${board._id}`)}
              className="text-white"
            >
              {board.title}
            </h2>

            <button
              onClick={() => deleteBoard(board._id)}
              className="absolute top-2 right-2 text-red-400"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}