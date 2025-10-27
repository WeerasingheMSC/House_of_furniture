import { LayoutDashboard, Package, Users, Briefcase, Factory, ShoppingCart, DollarSign, Settings } from "lucide-react";
import logoImage from "figma:asset/fb06ce7f8f36f24aee1980d2968cd46d70b0e5ce.png";

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

export function Sidebar({ activeModule, onModuleChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inventory', label: 'Items', icon: Package },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'hr', label: 'HR', icon: Briefcase },
    { id: 'production', label: 'Production', icon: Factory },
    { id: 'pos', label: 'POS', icon: ShoppingCart },
    { id: 'finance', label: 'Finance', icon: DollarSign },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 h-screen flex flex-col" style={{ backgroundColor: '#0A2540' }}>
      <div className="p-6 border-b" style={{ borderColor: '#163a5f' }}>
        <img src={logoImage} alt="House of Furniture" className="w-full h-auto" />
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onModuleChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeModule === item.id
                      ? 'text-white'
                      : 'text-gray-300 hover:bg-opacity-10 hover:bg-white'
                  }`}
                  style={activeModule === item.id ? { backgroundColor: '#F5954A' } : {}}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
