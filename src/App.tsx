import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { Inventory } from "./components/Inventory";
import { Customers } from "./components/Customers";
import { HR } from "./components/HR";
import { Production } from "./components/Production";
import { POS } from "./components/POS";
import { Finance } from "./components/Finance";
import { Settings } from "./components/Settings";

export default function App() {
  const [activeModule, setActiveModule] = useState('dashboard');

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'inventory':
        return <Inventory />;
      case 'customers':
        return <Customers />;
      case 'hr':
        return <HR />;
      case 'production':
        return <Production />;
      case 'pos':
        return <POS />;
      case 'finance':
        return <Finance />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {renderModule()}
        </div>
      </main>
    </div>
    
  );
}
