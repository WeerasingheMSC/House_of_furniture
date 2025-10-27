import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Plus, Search, Phone, Mail, MapPin } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";

const mockCustomers = [
  { id: 'CUST001', name: 'John Anderson', email: 'john.a@email.com', phone: '+1 (555) 123-4567', address: '123 Oak Street, New York', totalPurchases: 15420, status: 'Active' },
  { id: 'CUST002', name: 'Sarah Williams', email: 'sarah.w@email.com', phone: '+1 (555) 234-5678', address: '456 Pine Avenue, Boston', totalPurchases: 8750, status: 'Active' },
  { id: 'CUST003', name: 'Michael Chen', email: 'michael.c@email.com', phone: '+1 (555) 345-6789', address: '789 Maple Drive, Chicago', totalPurchases: 22340, status: 'VIP' },
  { id: 'CUST004', name: 'Emily Davis', email: 'emily.d@email.com', phone: '+1 (555) 456-7890', address: '321 Elm Street, Seattle', totalPurchases: 5230, status: 'Active' },
  { id: 'CUST005', name: 'David Wilson', email: 'david.w@email.com', phone: '+1 (555) 567-8901', address: '654 Birch Lane, Miami', totalPurchases: 31200, status: 'VIP' },
  { id: 'CUST006', name: 'Lisa Martinez', email: 'lisa.m@email.com', phone: '+1 (555) 678-9012', address: '987 Cedar Road, Austin', totalPurchases: 12890, status: 'Active' },
];

export function Customers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusBadge = (status: string) => {
    if (status === 'VIP') {
      return <Badge style={{ backgroundColor: '#F5954A', color: 'white' }}>VIP</Badge>;
    }
    return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Customer Management</h2>
          <p className="text-muted-foreground">Manage your customer database</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button style={{ backgroundColor: '#F5954A', color: 'white' }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="customer-name">Full Name</Label>
                <Input id="customer-name" placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer-email">Email</Label>
                <Input id="customer-email" type="email" placeholder="email@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer-phone">Phone</Label>
                <Input id="customer-phone" type="tel" placeholder="+1 (555) 000-0000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer-address">Address</Label>
                <Input id="customer-address" placeholder="Street address" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsDialogOpen(false)} style={{ backgroundColor: '#F5954A', color: 'white' }}>
                  Add Customer
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{mockCustomers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">VIP Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              {mockCustomers.filter(c => c.status === 'VIP').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              ${mockCustomers.reduce((acc, c) => acc + c.totalPurchases, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Avg. Purchase</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              ${Math.round(mockCustomers.reduce((acc, c) => acc + c.totalPurchases, 0) / mockCustomers.length).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
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
                <TableHead>Customer</TableHead>
                <TableHead>Customer ID</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Total Purchases</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback style={{ backgroundColor: '#FFF3E6', color: '#F5954A' }}>
                          {getInitials(customer.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{customer.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs">{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs">{customer.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-3 w-3 text-muted-foreground mt-1" />
                      <span className="text-xs">{customer.address}</span>
                    </div>
                  </TableCell>
                  <TableCell>${customer.totalPurchases.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(customer.status)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">View Details</Button>
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
