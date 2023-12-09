import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import Cantshow from "./components/CantShow";
import NeedAuth from "./components/NeedAuth";
import MessageList from "./pages/home/message/MessageList";
// import Todo from "./pages/home/todo/Todo";
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <NeedAuth>
            <Home />
          </NeedAuth>
        }
      >
        <Route path="message" index element={<MessageList />}></Route>
        {/* <Route path="todo" element={<Todo />}></Route> */}
      </Route>
      <Route
        path="/login"
        element={
          <Cantshow>
            <Login />
          </Cantshow>
        }
      ></Route>
    </Routes>
  );
}

export default App;
