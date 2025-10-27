import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { FileText, Download, TrendingUp, DollarSign, Package, Users } from "lucide-react";

export function Reports() {
  const reports = [
    {
      title: 'Sales Report',
      description: 'Comprehensive sales analysis for the current quarter',
      icon: TrendingUp,
      lastGenerated: '2025-10-26',
      category: 'Sales'
    },
    {
      title: 'Financial Statement',
      description: 'Profit & Loss, Balance Sheet, and Cash Flow statements',
      icon: DollarSign,
      lastGenerated: '2025-10-25',
      category: 'Finance'
    },
    {
      title: 'Inventory Report',
      description: 'Stock levels, reorder points, and inventory valuation',
      icon: Package,
      lastGenerated: '2025-10-27',
      category: 'Inventory'
    },
    {
      title: 'HR Analytics',
      description: 'Employee performance, attendance, and payroll summary',
      icon: Users,
      lastGenerated: '2025-10-24',
      category: 'HR'
    },
    {
      title: 'Purchase Analysis',
      description: 'Supplier performance and purchase order tracking',
      icon: FileText,
      lastGenerated: '2025-10-26',
      category: 'Purchases'
    },
    {
      title: 'Monthly Summary',
      description: 'Complete business overview for the month',
      icon: FileText,
      lastGenerated: '2025-10-01',
      category: 'General'
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2>Reports & Analytics</h2>
        <p className="text-muted-foreground">Generate and download business reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report, index) => {
          const Icon = report.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{report.title}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">{report.category}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {report.description}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    Last: {report.lastGenerated}
                  </p>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Custom Report Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Create custom reports by selecting date ranges, modules, and metrics that matter to your business.
            </p>
            <div className="flex gap-4">
              <Button>
                <FileText className="w-4 h-4 mr-2" />
                Create Custom Report
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Schedule Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
