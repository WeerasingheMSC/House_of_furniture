import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, DollarSign, Package, Users, ShoppingCart, AlertCircle } from "lucide-react";
import { Badge } from "./ui/badge";

const salesData = [
  { month: 'Jan', sales: 45000, orders: 32 },
  { month: 'Feb', sales: 52000, orders: 41 },
  { month: 'Mar', sales: 48000, orders: 38 },
  { month: 'Apr', sales: 61000, orders: 52 },
  { month: 'May', sales: 55000, orders: 45 },
  { month: 'Jun', sales: 67000, orders: 58 },
];

const furnitureCategories = [
  { name: 'Bedroom Furniture', image: '🛏️', store: 'Main Showroom', amount: 15, status: 'In Stock' },
  { name: 'Living Room Sets', image: '🛋️', store: 'Main Showroom', amount: 12, status: 'In Stock' },
  { name: 'Dining Tables', image: '🪑', store: 'Warehouse A', amount: 8, status: 'In Stock' },
  { name: 'Office Furniture', image: '🗄️', store: 'Warehouse B', amount: 3, status: 'Low Stock' },
  { name: 'Outdoor Furniture', image: '🌳', store: 'Main Showroom', amount: 6, status: 'In Stock' },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Dashboard</h2>
          <p className="text-muted-foreground">Welcome to House of Furniture</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Revenue</CardTitle>
            <DollarSign className="h-5 w-5" style={{ color: '#F5954A' }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">$328,000</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Orders</CardTitle>
            <ShoppingCart className="h-5 w-5" style={{ color: '#F5954A' }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">266</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">8.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Furniture Items</CardTitle>
            <Package className="h-5 w-5" style={{ color: '#F5954A' }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">868</div>
            <p className="text-xs text-muted-foreground mt-1">Quantity in hand</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Customers</CardTitle>
            <Users className="h-5 w-5" style={{ color: '#F5954A' }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">342</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">15 new</span> this month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Furniture Categories</CardTitle>
              <button className="text-sm" style={{ color: '#F5954A' }}>View All</button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {furnitureCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="text-3xl">{category.image}</div>
                    <div className="flex-1">
                      <p className="font-medium">{category.name}</p>
                      <p className="text-xs text-muted-foreground">{category.store}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm">{category.amount} pcs</p>
                    </div>
                    <Badge 
                      className={category.status === 'Low Stock' ? 'bg-yellow-500' : 'bg-green-500'}
                    >
                      {category.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#F5954A" name="Revenue ($)" />
                <Bar dataKey="orders" fill="#0A2540" name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Item Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-accent rounded-lg text-center">
                <Package className="h-8 w-8 mx-auto mb-2" style={{ color: '#F5954A' }} />
                <div className="text-2xl">868</div>
                <p className="text-xs text-muted-foreground">Quantity in Hand</p>
              </div>
              <div className="p-4 bg-accent rounded-lg text-center">
                <AlertCircle className="h-8 w-8 mx-auto mb-2" style={{ color: '#F5954A' }} />
                <div className="text-2xl">5</div>
                <p className="text-xs text-muted-foreground">To be received</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Production Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-accent rounded-lg text-center">
                <Package className="h-8 w-8 mx-auto mb-2" style={{ color: '#F5954A' }} />
                <div className="text-2xl">45</div>
                <p className="text-xs text-muted-foreground">In Production</p>
              </div>
              <div className="p-4 bg-accent rounded-lg text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2" style={{ color: '#F5954A' }} />
                <div className="text-2xl">23</div>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
