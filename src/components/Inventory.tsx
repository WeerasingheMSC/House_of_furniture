import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Plus, Search, AlertTriangle } from "lucide-react";

const mockInventory = [
  { id: 'FUR001', name: 'Luxury Sofa Set', category: 'Living Room', quantity: 15, reorderLevel: 5, price: 2499.99, location: 'Main Showroom', status: 'In Stock' },
  { id: 'FUR002', name: 'King Size Bed', category: 'Bedroom', quantity: 8, reorderLevel: 10, price: 1899.99, location: 'Warehouse A', status: 'Low Stock' },
  { id: 'FUR003', name: 'Dining Table 6-Seater', category: 'Dining', quantity: 12, reorderLevel: 8, price: 1299.99, location: 'Main Showroom', status: 'In Stock' },
  { id: 'FUR004', name: 'Office Desk', category: 'Office', quantity: 20, reorderLevel: 12, price: 699.99, location: 'Warehouse B', status: 'In Stock' },
  { id: 'FUR005', name: 'Bookshelf', category: 'Storage', quantity: 3, reorderLevel: 10, price: 399.99, location: 'Main Showroom', status: 'Critical' },
  { id: 'FUR006', name: 'Coffee Table', category: 'Living Room', quantity: 18, reorderLevel: 8, price: 299.99, location: 'Warehouse A', status: 'In Stock' },
  { id: 'FUR007', name: 'Wardrobe', category: 'Bedroom', quantity: 10, reorderLevel: 6, price: 1599.99, location: 'Main Showroom', status: 'In Stock' },
  { id: 'FUR008', name: 'Recliner Chair', category: 'Living Room', quantity: 4, reorderLevel: 8, price: 899.99, location: 'Warehouse B', status: 'Low Stock' },
];

export function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredInventory = mockInventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In Stock':
        return <Badge className="bg-green-500 hover:bg-green-600">In Stock</Badge>;
      case 'Low Stock':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Low Stock</Badge>;
      case 'Critical':
        return <Badge className="bg-red-500 hover:bg-red-600">Critical</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Furniture Inventory</h2>
          <p className="text-muted-foreground">Manage your furniture stock</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button style={{ backgroundColor: '#F5954A', color: 'white' }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Furniture Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="item-name">Item Name</Label>
                <Input id="item-name" placeholder="Enter item name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="living">Living Room</SelectItem>
                    <SelectItem value="bedroom">Bedroom</SelectItem>
                    <SelectItem value="dining">Dining</SelectItem>
                    <SelectItem value="office">Office</SelectItem>
                    <SelectItem value="storage">Storage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reorder">Reorder Level</Label>
                  <Input id="reorder" type="number" placeholder="0" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input id="price" type="number" placeholder="0.00" step="0.01" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main Showroom</SelectItem>
                    <SelectItem value="warehouse-a">Warehouse A</SelectItem>
                    <SelectItem value="warehouse-b">Warehouse B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsDialogOpen(false)} style={{ backgroundColor: '#F5954A', color: 'white' }}>
                  Add Item
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{mockInventory.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Unique furniture types</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Low Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl flex items-center gap-2">
              {mockInventory.filter(i => i.status === 'Low Stock' || i.status === 'Critical').length}
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Requires attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Inventory Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              ${mockInventory.reduce((acc, item) => acc + (item.quantity * item.price), 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Current valuation</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search furniture..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Reorder Level</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.reorderLevel}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
