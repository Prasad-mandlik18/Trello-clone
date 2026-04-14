import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
// ❗ If build fails, comment next line
import bgImage from "../assets/bg.jpg";

export default function Dashboard() {
  const navigate = useNavigate();

  const [boards, setBoards] = useState([]);
  const [newBoard, setNewBoard] = useState("");

  // ✅ TOKEN
  const token = localStorage.getItem("token");

  // ✅ LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // ✅ FETCH BOARDS
  const fetchBoards = async () => {
    try {
      const res = await API.get("/api/boards", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBoards(res.data || []);
    } catch (err) {
      console.error("Fetch boards error:", err);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  // ✅ ADD BOARD
  const addBoard = async () => {
    if (!newBoard.trim()) return;

    try {
      await API.post(
        "/api/boards",
        { title: newBoard },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNewBoard("");
      fetchBoards();
    } catch (err) {
      console.error("Add board error:", err);
    }
  };

  // ✅ DELETE BOARD
  const deleteBoard = async (id) => {
    try {
      await API.delete(`/api/boards/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchBoards();
    } catch (err) {
      console.error("Delete board error:", err);
    }
  };

  return (
    <div
      className="min-h-screen p-8 bg-cover bg-center"
      style={{
        // ✅ Safe fallback if image fails
        backgroundImage: bgImage ? `url(${bgImage})` : "none",
      }}
    >
      {/* HEADER */}
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

      {/* ADD BOARD */}
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

      {/* BOARD LIST */}
      <div className="grid grid-cols-3 gap-6">
        {boards.length > 0 ? (
          boards.map((board) => (
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
          ))
        ) : (
          <p className="text-white">No boards found</p>
        )}
      </div>
    </div>
  );
}