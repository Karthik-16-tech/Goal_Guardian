import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router';

export function Layout() {
  return (
    <div className="flex h-screen w-full bg-black text-foreground">
      <div className="flex-none">
        <Sidebar />
      </div>
      <div className="flex-1 h-screen overflow-y-auto bg-black">
        <div className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
