import React from 'react';
import dashStyles from './css/dropdashboard.module.css';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react';


const Dashboard = () => {

  const [chartType, setChartType] = useState('line');

  // Sample data - replace with your actual data
  const data = [
    { month: 'Jan', subscriptions: 4000, revenue: 24000, churn: 400 },
    { month: 'Feb', subscriptions: 5000, revenue: 28000, churn: 380 },
    { month: 'Mar', subscriptions: 6000, revenue: 32000, churn: 420 },
    { month: 'Apr', subscriptions: 7200, revenue: 38000, churn: 390 },
    { month: 'May', subscriptions: 8400, revenue: 42000, churn: 450 },
    { month: 'Jun', subscriptions: 9100, revenue: 46000, churn: 470 },
    { month: 'Jul', subscriptions: 10200, revenue: 50000, churn: 480 }
  ];
  // Sample data
  const stats = [
    { title: "Total Products", value: "124", change: "+12.5%" },
    { title: "Total Revenue", value: "$45,231", change: "+8.2%" },
    { title: "Total Sales", value: "1,205", change: "+15.3%" },
    { title: "Growth Rate", value: "24.5%", change: "+4.1%" }
  ];

  const products = [
    { id: 1, name: 'Wireless Headphones', stock: 45, price: 199.99, sales: 28 },
    { id: 2, name: 'Smart Watch', stock: 32, price: 299.99, sales: 15 },
    { id: 3, name: 'Bluetooth Speaker', stock: 18, price: 149.99, sales: 42 },
    { id: 4, name: 'Gaming Mouse', stock: 56, price: 79.99, sales: 33 },
  ];

  const renderChart = () => {
    switch (chartType) {
      case 'area':
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="subscriptions"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
              name="Subscriptions"
            />
            <Area
              type="monotone"
              dataKey="churn"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
              name="Churn"
            />
          </AreaChart>
        );
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="subscriptions" fill="#8884d8" name="Subscriptions" />
            <Bar dataKey="revenue" fill="#82ca9d" name="Revenue ($)" />
          </BarChart>
        );
      default:
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="subscriptions"
              stroke="#8884d8"
              strokeWidth={2}
              name="Subscriptions"
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#82ca9d"
              strokeWidth={2}
              name="Revenue ($)"
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        );
    }
  };

  // const DropCheck = ({ userId }) => {
  //   const navigate = useNavigate();
  //   try{
  //     return
  //     const response = await.axios.get('http://localhost:8800/api/drops')
  //   }/
  // }

  return (
    <div className={dashStyles.dashboardContainer}>
      {/* Header */}
      <header className={dashStyles.headerClass}>
        <div className={dashStyles.header}>
          <h1 className={dashStyles.headerTitle}>Product Dashboard</h1>
          
          <div className={dashStyles.searchContainer}>
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search..."
              className={dashStyles.searchBar}
            />
            
            {/* Profile
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              JD
            </div> */}
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className={dashStyles.statsGridContainer}>
        {stats.map((stat, index) => (
          <div key={index} className={dashStyles.Grids}>
            <h3 className={dashStyles.gridTitle}>{stat.title}</h3>
            <p className={dashStyles.gridValue}>{stat.value}</p>
            <span className={dashStyles.gridChange}>{stat.change} vs last month</span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className={dashStyles.mainContent}>
        {/* Chart Section */}
        <div className={dashStyles.chartContainer}>
          <div className={dashStyles.chartPrepare}>
            <h2 className={dashStyles.chartTitle}>Subscription Analytics</h2>
            <div className={dashStyles.spaceX2}>
              {['line', 'area', 'bar'].map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={`${dashStyles.chartTypes} ${
                  chartType === type
                    ? `${dashStyles.chartTyp1}`
                    : `${dashStyles.chartTyp2}`
                }`}
              >
              {type}
              </button>
              ))}
            </div>
          </div>
        </div>

        <div className={dashStyles.h96}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
        </div>

        {/* Products List */}
        <div className={dashStyles.dropList}>
          <h2 className={dashStyles.dropOverview}>Products Overview</h2>
          <div className={dashStyles.spaces}>
            {products.map((product) => (
              <div 
                key={product.id} 
                className={dashStyles.dropId}
              >
                <div>
                  <h3 className={dashStyles.dropName}>{product.name}</h3>
                  <p className={dashStyles.Stock}>Stock: {product.stock}</p>
                </div>
                <div className={dashStyles.dropValues}>
                  <p className={dashStyles.dropPrice}>${product.price}</p>
                  <p className={dashStyles.dropSales}>{product.sales} sold</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;