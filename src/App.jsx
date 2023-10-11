import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import WindowView from "./views/WindowView";
import FormLogin from "./views/FormLogin";
import FormSignUp from "./views/FormSignUp";
import Error404 from "./views/Error404";
import FileExplorer from "./views/FileExplorer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index path="/" element={<WindowView />} />
          <Route path="/login" element={<FormLogin />} />
          <Route path="/register" element={<FormSignUp />} />
          <Route path="/explorer" element={<FileExplorer />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
