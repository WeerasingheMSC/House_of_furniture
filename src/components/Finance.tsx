import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const cashFlowData = [
  { month: 'Jan', inflow: 55000, outflow: 42000 },
  { month: 'Feb', inflow: 62000, outflow: 45000 },
  { month: 'Mar', inflow: 58000, outflow: 43000 },
  { month: 'Apr', inflow: 71000, outflow: 48000 },
  { month: 'May', inflow: 65000, outflow: 46000 },
  { month: 'Jun', inflow: 77000, outflow: 50000 },
];

const mockInvoices = [
  { id: 'INV-2025-001', client: 'Acme Corp', date: '2025-10-15', amount: 5499.95, status: 'Paid' },
  { id: 'INV-2025-002', client: 'TechStart Inc', date: '2025-10-20', amount: 899.88, status: 'Paid' },
  { id: 'INV-2025-003', client: 'Global Solutions', date: '2025-10-22', amount: 1549.97, status: 'Pending' },
  { id: 'INV-2025-004', client: 'Innovation Labs', date: '2025-10-25', amount: 2399.92, status: 'Overdue' },
];

const mockExpenses = [
  { id: 'EXP-001', category: 'Office Rent', date: '2025-10-01', amount: 5000.00, status: 'Paid' },
  { id: 'EXP-002', category: 'Salaries', date: '2025-10-05', amount: 35000.00, status: 'Paid' },
  { id: 'EXP-003', category: 'Utilities', date: '2025-10-10', amount: 1200.00, status: 'Paid' },
  { id: 'EXP-004', category: 'Office Supplies', date: '2025-10-15', amount: 850.00, status: 'Paid' },
  { id: 'EXP-005', category: 'Marketing', date: '2025-10-20', amount: 3500.00, status: 'Pending' },
];

export function Finance() {
  const getInvoiceStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return <Badge className="bg-green-500 hover:bg-green-600">Paid</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>;
      case 'Overdue':
        return <Badge className="bg-red-500 hover:bg-red-600">Overdue</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>Finance & Accounting</h2>
        <p className="text-muted-foreground">Monitor your financial performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">$328,000</div>
            <p className="text-xs text-muted-foreground mt-1">This year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">$214,000</div>
            <p className="text-xs text-muted-foreground mt-1">This year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Net Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">$114,000</div>
            <p className="text-xs text-muted-foreground mt-1">34.8% margin</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Outstanding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">$3,949.89</div>
            <p className="text-xs text-muted-foreground mt-1">Pending invoices</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cash Flow Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="inflow" fill="#10b981" name="Income" />
              <Bar dataKey="outflow" fill="#ef4444" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Tabs defaultValue="invoices" className="w-full">
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
        </TabsList>
        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <CardTitle>Recent Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.id}</TableCell>
                      <TableCell>{invoice.client}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                      <TableCell>{getInvoiceStatusBadge(invoice.status)}</TableCell>
                      <TableCell>
                        <button className="text-blue-500 hover:underline">View</button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="expenses">
          <Card>
            <CardHeader>
              <CardTitle>Recent Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Expense ID</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>{expense.id}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell>${expense.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className={expense.status === 'Paid' ? 'bg-green-500' : 'bg-yellow-500'}>
                          {expense.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <button className="text-blue-500 hover:underline">View</button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
