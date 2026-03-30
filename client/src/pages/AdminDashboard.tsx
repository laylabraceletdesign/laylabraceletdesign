import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { BarChart3, Package, ShoppingCart, MessageSquare, AlertCircle } from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const { data: allOrders } = trpc.orders.getUserOrders.useQuery();
  const { data: bulkInquiries } = trpc.bulkInquiries.list.useQuery();
  const { data: customRequests } = trpc.customRequests.list.useQuery();
  const { data: contactSubmissions } = trpc.contact.list.useQuery();

  // Check if user is admin
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Access Denied</h1>
          <p className="text-slate-600">
            You do not have permission to access the admin dashboard.
          </p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Total Orders",
      value: allOrders?.length || 0,
      icon: ShoppingCart,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Bulk Inquiries",
      value: bulkInquiries?.length || 0,
      icon: Package,
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "Custom Requests",
      value: customRequests?.length || 0,
      icon: BarChart3,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Contact Messages",
      value: contactSubmissions?.length || 0,
      icon: MessageSquare,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-lg p-6 shadow">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                <p className="text-slate-600 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start border-b border-slate-200 rounded-none bg-transparent p-0">
              <TabsTrigger
                value="overview"
                className="rounded-none border-b-2 border-transparent px-6 py-4 data-[state=active]:border-slate-900 data-[state=active]:bg-transparent"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="orders"
                className="rounded-none border-b-2 border-transparent px-6 py-4 data-[state=active]:border-slate-900 data-[state=active]:bg-transparent"
              >
                Orders
              </TabsTrigger>
              <TabsTrigger
                value="bulk"
                className="rounded-none border-b-2 border-transparent px-6 py-4 data-[state=active]:border-slate-900 data-[state=active]:bg-transparent"
              >
                Bulk Inquiries
              </TabsTrigger>
              <TabsTrigger
                value="custom"
                className="rounded-none border-b-2 border-transparent px-6 py-4 data-[state=active]:border-slate-900 data-[state=active]:bg-transparent"
              >
                Custom Requests
              </TabsTrigger>
              <TabsTrigger
                value="contact"
                className="rounded-none border-b-2 border-transparent px-6 py-4 data-[state=active]:border-slate-900 data-[state=active]:bg-transparent"
              >
                Contact Messages
              </TabsTrigger>
            </TabsList>

            <div className="p-6">
              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    {allOrders && allOrders.length > 0 ? (
                      allOrders.slice(0, 5).map((order) => (
                        <div key={order.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                          <div>
                            <p className="font-semibold text-slate-900">{order.orderNumber}</p>
                            <p className="text-sm text-slate-600">{order.customerName}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-slate-900">${Number(order.totalAmount).toFixed(2)}</p>
                            <p className="text-sm text-slate-600 capitalize">{order.status}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-600">No orders yet</p>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders" className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Order #</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Customer</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Amount</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {allOrders && allOrders.length > 0 ? (
                        allOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3 text-sm font-mono text-slate-900">{order.orderNumber}</td>
                            <td className="px-4 py-3 text-sm text-slate-600">{order.customerName}</td>
                            <td className="px-4 py-3 text-sm font-semibold text-slate-900">
                              ${Number(order.totalAmount).toFixed(2)}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 capitalize">
                                {order.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-slate-600">
                            No orders yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              {/* Bulk Inquiries Tab */}
              <TabsContent value="bulk" className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Inquiry #</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Contact</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Quantity</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {bulkInquiries && bulkInquiries.length > 0 ? (
                        bulkInquiries.map((inquiry) => (
                          <tr key={inquiry.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3 text-sm font-mono text-slate-900">{inquiry.inquiryNumber}</td>
                            <td className="px-4 py-3 text-sm text-slate-600">
                              <p className="font-semibold">{inquiry.name}</p>
                              <p className="text-xs">{inquiry.email}</p>
                            </td>
                            <td className="px-4 py-3 text-sm font-semibold text-slate-900">
                              {inquiry.quantity.toLocaleString()} pcs
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 capitalize">
                                {inquiry.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600">
                              {new Date(inquiry.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-slate-600">
                            No bulk inquiries yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              {/* Custom Requests Tab */}
              <TabsContent value="custom" className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Request #</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Contact</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Budget</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {customRequests && customRequests.length > 0 ? (
                        customRequests.map((request) => (
                          <tr key={request.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3 text-sm font-mono text-slate-900">{request.requestNumber}</td>
                            <td className="px-4 py-3 text-sm text-slate-600">
                              <p className="font-semibold">{request.name}</p>
                              <p className="text-xs">{request.email}</p>
                            </td>
                            <td className="px-4 py-3 text-sm font-semibold text-slate-900">
                              {request.budget || "Not specified"}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 capitalize">
                                {(request.status || "new").replace(/_/g, " ")}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600">
                              {new Date(request.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-slate-600">
                            No custom requests yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              {/* Contact Messages Tab */}
              <TabsContent value="contact" className="space-y-4">
                <div className="space-y-4">
                  {contactSubmissions && contactSubmissions.length > 0 ? (
                    contactSubmissions.map((submission) => (
                      <div key={submission.id} className="border border-slate-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-semibold text-slate-900">{submission.name}</p>
                            <p className="text-sm text-slate-600">{submission.email}</p>
                          </div>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 capitalize">
                            {submission.status}
                          </span>
                        </div>
                        <p className="font-semibold text-slate-900 mb-2">{submission.subject}</p>
                        <p className="text-slate-600 text-sm mb-3">{submission.message}</p>
                        <p className="text-xs text-slate-500">
                          {new Date(submission.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-600 text-center py-8">No contact messages yet</p>
                  )}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
