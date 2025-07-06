import React, { useState, useEffect } from "react";

export default function BaseLayout({ Navbar, Sidebar, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const sidebarWidth = 250;

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => isMobile && setSidebarOpen(false);

  return (
    <div>
      {/* Top Navbar */}
      <Navbar onToggleSidebar={toggleSidebar} />

      {/* Overlay on mobile */}
      {isMobile && sidebarOpen && (
        <div
          onClick={closeSidebar}
          style={{
            position: "fixed",
            top: 56,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 1040,
          }}
        />
      )}

      {/* Sidebar + Main Content */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          marginTop: 56,
          minHeight: "calc(100vh - 56px)",
         
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            width: sidebarWidth,
            position: "fixed",
            top: 56,
            left: sidebarOpen ? 0 : -sidebarWidth,
            height: "calc(100vh - 56px)",
            background: "linear-gradient(45deg, #1b2a4e,rgb(138, 17, 130))",
            boxShadow: "2px 0 12px rgba(0,0,0,0.2)",
            borderRight: "1px solid rgba(255, 255, 255, 0.1)",
            zIndex: 1050,
            overflowY: "auto",
            color: "#ffff",
            transition: "left 0.3s ease",
          }}
        >
          <Sidebar />
        </div>

        {/* Main Content */}
        <main
          style={{
            flexGrow: 1,
            marginLeft: !isMobile && sidebarOpen ? sidebarWidth : 0,
            padding: "1rem",
            transition: "margin-left 0.3s ease",
            background: "transparent",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
