import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../components/Admin/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex flex-col-reverse md:flex-row h-screen h-[100dvh] bg-cream">
      <AdminSidebar />
      <main className="flex-1 min-h-0 overflow-y-auto scrollbar">
        <div className="mx-auto w-full max-w-6xl min-h-full p-4 sm:p-6 lg:p-8 pb-0 sm:pb-0 lg:pb-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
