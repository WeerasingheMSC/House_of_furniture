import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Plus, Search } from "lucide-react";

const mockPurchases = [
  { id: 'PO001', supplier: 'TechSupply Co', date: '2025-10-20', items: 10, total: 12999.90, status: 'Received' },
  { id: 'PO002', supplier: 'Office Depot', date: '2025-10-21', items: 25, total: 4999.75, status: 'Received' },
  { id: 'PO003', supplier: 'Electronics Hub', date: '2025-10-22', items: 8, total: 6799.92, status: 'Pending' },
  { id: 'PO004', supplier: 'Furniture World', date: '2025-10-23', items: 5, total: 8499.95, status: 'In Transit' },
  { id: 'PO005', supplier: 'Stationery Plus', date: '2025-10-24', items: 50, total: 1299.50, status: 'Received' },
  { id: 'PO006', supplier: 'Tech Wholesale', date: '2025-10-25', items: 15, total: 15999.85, status: 'In Transit' },
];

export function Purchases() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredPurchases = mockPurchases.filter(purchase =>
    purchase.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    purchase.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Received':
        return <Badge className="bg-green-500 hover:bg-green-600">Received</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>;
      case 'In Transit':
        return <Badge className="bg-blue-500 hover:bg-blue-600">In Transit</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Purchase Orders</h2>
          <p className="text-muted-foreground">Manage supplier orders and purchases</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Purchase
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Purchase Order</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier</Label>
                <Select>
                  <SelectTrigger id="supplier">
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="techsupply">TechSupply Co</SelectItem>
                    <SelectItem value="officedepot">Office Depot</SelectItem>
                    <SelectItem value="electronics">Electronics Hub</SelectItem>
                    <SelectItem value="furniture">Furniture World</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="po-date">Order Date</Label>
                <Input id="po-date" type="date" defaultValue="2025-10-27" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="po-items">Items</Label>
                <Input id="po-items" placeholder="Enter items to purchase" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="po-quantity">Quantity</Label>
                <Input id="po-quantity" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="po-total">Total Amount</Label>
                <Input id="po-total" type="number" placeholder="0.00" step="0.01" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsDialogOpen(false)}>Create Order</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{mockPurchases.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              ${mockPurchases.reduce((acc, purchase) => acc + purchase.total, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              {mockPurchases.filter(p => p.status === 'Pending').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">In Transit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              {mockPurchases.filter(p => p.status === 'In Transit').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search purchases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPurchases.map((purchase) => (
                <TableRow key={purchase.id}>
                  <TableCell>{purchase.id}</TableCell>
                  <TableCell>{purchase.supplier}</TableCell>
                  <TableCell>{purchase.date}</TableCell>
                  <TableCell>{purchase.items}</TableCell>
                  <TableCell>${purchase.total.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(purchase.status)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">View</Button>
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
