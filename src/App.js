import Header from "./Components/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import IndexUsers from "./Pages/Users/IndexUsers";
import ShowUsers from "./Components/User/ShowUsers";
import IndexPosts from "./Components/Post/IndexPosts";
import ShowPosts from "./Components/Post/ShowPosts";
import CreatePost from "./Pages/Posts/CreatePost";
import EditPost from "./Components/Post/EditPost";
import Login from "./Pages/Login/Login";

import { AuthProvider, useAuth } from "./Pages/Login/AuthContext";

const AppContent = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />

        {!isLoggedIn && (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}

        {isLoggedIn && (
          <Route path="/login" element={<Navigate to="/" replace />} />
        )}

        {isLoggedIn && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<IndexUsers />} />
            <Route path="/users/:userId" element={<ShowUsers />} />
            <Route path="/posts" element={<IndexPosts />} />
            <Route path="/posts/:postId" element={<ShowPosts />} />
            <Route path="/posts/creat" element={<CreatePost />} />

            <Route path="/posts/edit/:postId" element={<EditPost />} />
          </>
        )}
      </Routes>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
