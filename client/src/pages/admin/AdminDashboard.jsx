import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import { useState, useEffect } from "react";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const { data: sales, isLoading: loadingSales } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loadingCustomers } = useGetUsersQuery();
  const { data: orders, isLoading: loadingOrders } = useGetTotalOrdersQuery();
  const { data: salesDetail, isLoading: loadingChart } = useGetTotalSalesByDateQuery();

  const [chartData, setChartData] = useState({
    options: {
      chart: {
        type: "line",
        toolbar: {
          show: false,
        },
        background: 'transparent',
      },
      tooltip: {
        theme: "light",
        style: {
          fontSize: '14px',
          fontFamily: 'Inter, sans-serif',
        },
        x: {
          show: true,
        },
        y: {
          formatter: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      },
      colors: ["#DC2626"],
      dataLabels: {
        enabled: true,
        background: {
          enabled: true,
          foreColor: '#FFFFFF',
          borderRadius: 4,
          borderWidth: 1,
          borderColor: '#DC2626',
          opacity: 0.9,
        },
        style: {
          fontSize: '12px',
          fontWeight: '600',
          colors: ['#DC2626']
        }
      },
      stroke: {
        curve: "smooth",
        width: 4,
      },
      title: {
        text: "Sales Performance",
        align: "left",
        style: {
          fontSize: '24px',
          fontWeight: '700',
          color: '#1F2937',
          fontFamily: 'Inter, sans-serif',
        },
      },
      grid: {
        borderColor: "#FEE2E2",
        strokeDashArray: 3,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      markers: {
        size: 8,
        colors: ["#DC2626"],
        strokeColors: "#FFFFFF",
        strokeWidth: 3,
        hover: {
          size: 10,
        },
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
          style: {
            fontSize: '16px',
            fontWeight: '600',
            color: '#374151',
            fontFamily: 'Inter, sans-serif',
          },
        },
        axisBorder: {
          show: true,
          color: '#FCA5A5',
        },
        axisTicks: {
          show: true,
          color: '#FCA5A5',
        },
        labels: {
          style: {
            colors: '#6B7280',
            fontSize: '13px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '500',
          },
        },
      },
      yaxis: {
        title: {
          text: "Sales ($)",
          style: {
            fontSize: '16px',
            fontWeight: '600',
            color: '#374151',
            fontFamily: 'Inter, sans-serif',
          },
        },
        min: 0,
        labels: {
          style: {
            colors: '#6B7280',
            fontSize: '13px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '500',
          },
          formatter: function (value) {
            return '$' + value.toLocaleString();
          },
        },
      },
      legend: {
        show: false,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail && salesDetail.length > 0) {
      const categories = salesDetail.map((item) => item._id);
      const salesData = salesDetail.map((item) => item.totalSales);

      setChartData((prev) => ({
        ...prev,
        options: {
          ...prev.options,
          xaxis: {
            ...prev.options.xaxis,
            categories,
          },
        },
        series: [{ name: "Sales", data: salesData }],
      }));
    }
  }, [salesDetail]);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="xl:ml-[4rem] md:ml-[0rem] p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-3">
            <div className="w-1 h-6 bg-red-600 rounded-full mr-3"></div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          </div>
          <p className="text-gray-600 ml-4">Monitor your business performance and key metrics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* SALES */}
          <div className="bg-white rounded-xl shadow-sm border border-red-100 p-6 hover:shadow-md hover:border-red-200 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-red-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-red-700 uppercase tracking-wide">Total Sales</p>
                <div className="mt-1">
                  {loadingSales ? (
                    <div className="flex justify-end">
                      <Loader />
                    </div>
                  ) : (
                    <p className="text-2xl font-bold text-gray-900">
                      ${sales?.totalSales?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-red-600 font-medium flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Revenue Growth
              </span>
            </div>
          </div>

          {/* CUSTOMERS */}
          <div className="bg-white rounded-xl shadow-sm border border-red-100 p-6 hover:shadow-md hover:border-red-200 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-red-500 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-red-700 uppercase tracking-wide">Total Customers</p>
                <div className="mt-1">
                  {loadingCustomers ? (
                    <div className="flex justify-end">
                      <Loader />
                    </div>
                  ) : (
                    <p className="text-2xl font-bold text-gray-900">
                      {customers?.length?.toLocaleString() || 0}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-red-600 font-medium flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Active Users
              </span>
            </div>
          </div>

          {/* ORDERS */}
          <div className="bg-white rounded-xl shadow-sm border border-red-100 p-6 hover:shadow-md hover:border-red-200 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-red-700 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-red-700 uppercase tracking-wide">Total Orders</p>
                <div className="mt-1">
                  {loadingOrders ? (
                    <div className="flex justify-end">
                      <Loader />
                    </div>
                  ) : (
                    <p className="text-2xl font-bold text-gray-900">
                      {orders?.totalOrders?.toLocaleString() || 0}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-red-600 font-medium flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Order Processing
              </span>
            </div>
          </div>
        </div>

        {/* SALES CHART */}
        <div className="bg-white rounded-xl shadow-sm border border-red-100 p-6 mb-8">
          {loadingChart ? (
            <div className="flex justify-center items-center h-96">
              <Loader />
            </div>
          ) : (
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="line"
              width="100%"
              height="400"
            />
          )}
        </div>

        {/* ORDER LIST */}
        <div className="bg-white rounded-xl shadow-sm border border-red-100 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Recent Orders</h2>
            <p className="text-gray-600">Manage and track your latest orders</p>
          </div>
          <OrderList />
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;