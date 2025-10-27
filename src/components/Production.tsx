import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Plus, Search, Factory } from "lucide-react";
import { Progress } from "./ui/progress";

const mockProduction = [
  { id: 'PROD001', item: 'Luxury Sofa Set', quantity: 10, materialCost: 8500, laborCost: 3200, overheadCost: 1500, totalCost: 13200, status: 'In Progress', progress: 65 },
  { id: 'PROD002', item: 'King Size Bed', quantity: 15, materialCost: 12000, laborCost: 4800, overheadCost: 2200, totalCost: 19000, status: 'Completed', progress: 100 },
  { id: 'PROD003', item: 'Dining Table 6-Seater', quantity: 8, materialCost: 5600, laborCost: 2400, overheadCost: 1200, totalCost: 9200, status: 'In Progress', progress: 45 },
  { id: 'PROD004', item: 'Office Desk', quantity: 20, materialCost: 7200, laborCost: 3000, overheadCost: 1400, totalCost: 11600, status: 'Pending', progress: 0 },
  { id: 'PROD005', item: 'Wardrobe', quantity: 12, materialCost: 10800, laborCost: 4200, overheadCost: 1900, totalCost: 16900, status: 'In Progress', progress: 80 },
];

export function Production() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredProduction = mockProduction.filter(prod =>
    prod.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prod.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>;
      case 'In Progress':
        return <Badge style={{ backgroundColor: '#F5954A', color: 'white' }}>In Progress</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const totalMaterialCost = mockProduction.reduce((sum, item) => sum + item.materialCost, 0);
  const totalLaborCost = mockProduction.reduce((sum, item) => sum + item.laborCost, 0);
  const totalOverheadCost = mockProduction.reduce((sum, item) => sum + item.overheadCost, 0);
  const totalProductionCost = mockProduction.reduce((sum, item) => sum + item.totalCost, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Production Management</h2>
          <p className="text-muted-foreground">Track production costs and progress</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button style={{ backgroundColor: '#F5954A', color: 'white' }}>
              <Plus className="w-4 h-4 mr-2" />
              New Production
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Production Order</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="prod-item">Furniture Item</Label>
                <Select>
                  <SelectTrigger id="prod-item">
                    <SelectValue placeholder="Select item" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sofa">Luxury Sofa Set</SelectItem>
                    <SelectItem value="bed">King Size Bed</SelectItem>
                    <SelectItem value="table">Dining Table</SelectItem>
                    <SelectItem value="desk">Office Desk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="prod-quantity">Quantity</Label>
                <Input id="prod-quantity" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="material-cost">Material Cost ($)</Label>
                <Input id="material-cost" type="number" placeholder="0.00" step="0.01" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="labor-cost">Labor Cost ($)</Label>
                <Input id="labor-cost" type="number" placeholder="0.00" step="0.01" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="overhead-cost">Overhead Cost ($)</Label>
                <Input id="overhead-cost" type="number" placeholder="0.00" step="0.01" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsDialogOpen(false)} style={{ backgroundColor: '#F5954A', color: 'white' }}>
                  Create Order
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Production Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">${totalProductionCost.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Material Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">${totalMaterialCost.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((totalMaterialCost / totalProductionCost) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Labor Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">${totalLaborCost.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((totalLaborCost / totalProductionCost) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Overhead Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">${totalOverheadCost.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((totalOverheadCost / totalProductionCost) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search production orders..."
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
                <TableHead>Order ID</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Material Cost</TableHead>
                <TableHead>Labor Cost</TableHead>
                <TableHead>Overhead</TableHead>
                <TableHead>Total Cost</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProduction.map((prod) => (
                <TableRow key={prod.id}>
                  <TableCell>{prod.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Factory className="h-4 w-4" style={{ color: '#F5954A' }} />
                      <span>{prod.item}</span>
                    </div>
                  </TableCell>
                  <TableCell>{prod.quantity} units</TableCell>
                  <TableCell>${prod.materialCost.toLocaleString()}</TableCell>
                  <TableCell>${prod.laborCost.toLocaleString()}</TableCell>
                  <TableCell>${prod.overheadCost.toLocaleString()}</TableCell>
                  <TableCell>
                    <span style={{ color: '#F5954A' }}>${prod.totalCost.toLocaleString()}</span>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Progress value={prod.progress} className="h-2" />
                      <span className="text-xs text-muted-foreground">{prod.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(prod.status)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cost Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Material Costs</span>
                <span className="text-sm">${totalMaterialCost.toLocaleString()} ({((totalMaterialCost / totalProductionCost) * 100).toFixed(1)}%)</span>
              </div>
              <Progress value={(totalMaterialCost / totalProductionCost) * 100} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Labor Costs</span>
                <span className="text-sm">${totalLaborCost.toLocaleString()} ({((totalLaborCost / totalProductionCost) * 100).toFixed(1)}%)</span>
              </div>
              <Progress value={(totalLaborCost / totalProductionCost) * 100} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Overhead Costs</span>
                <span className="text-sm">${totalOverheadCost.toLocaleString()} ({((totalOverheadCost / totalProductionCost) * 100).toFixed(1)}%)</span>
              </div>
              <Progress value={(totalOverheadCost / totalProductionCost) * 100} className="h-3" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
