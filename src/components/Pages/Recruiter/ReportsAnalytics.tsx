import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Download,
  Calendar,
  Filter,
  Eye,
  Target,
  Award,
  CheckCircle
} from 'lucide-react';

import { 
  MonthlyData,
  TopPerformingJobs,
  ClientPerformance,
  SourceAnalytics
} from '../../../types';

const percentage_job_post = 0;
const percentage_application = 0;
const percentage_successful_hires = 0;
const percentage_revenue = 0;
const avg_time_per_hire = 0;
const avg_cost_per_hire = 0;
const percentage_conversion_rate = 0;
const client_satisfaction = 0;


export default function ReportsAnalytics() {
  const [dateRange, setDateRange] = useState('last_30_days');
  const [reportType, setReportType] = useState('overview');

  // Mock analytics data
  const overviewStats = {
    totalJobs: 0,
    totalApplications: 0,
    totalHires: 0,
    totalRevenue: 0,
    avgTimeToHire: 0,
    avgCostPerHire: 0,
    conversionRate: 0,
    clientSatisfaction: 0
  };

  const monthlyData: MonthlyData[] = [ ];

  const topPerformingJobs: TopPerformingJobs[] = [ ];

  const clientPerformance: ClientPerformance[] = [ ];

  const sourceAnalytics: SourceAnalytics[] = [ ];

  const renderOverviewReport = () => (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Jobs Posted</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{overviewStats.totalJobs}</p>
              <p className="text-sm text-green-600 mt-1">+{percentage_job_post}% vs last period</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{overviewStats.totalApplications}</p>
              <p className="text-sm text-green-600 mt-1">+{percentage_application}% vs last period</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Successful Hires</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{overviewStats.totalHires}</p>
              <p className="text-sm text-green-600 mt-1">+{percentage_successful_hires}% vs last period</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">${overviewStats.totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">+{percentage_revenue}% vs last period</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Avg Time to Hire</h3>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{overviewStats.avgTimeToHire} days</p>
          <p className="text-sm text-green-600 mt-1">{avg_time_per_hire} days vs last period</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Avg Cost per Hire</h3>
            <DollarSign className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">${overviewStats.avgCostPerHire.toLocaleString()}</p>
          <p className="text-sm text-red-600 mt-1">+${avg_cost_per_hire} vs last period</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Conversion Rate</h3>
            <Target className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{overviewStats.conversionRate}%</p>
          <p className="text-sm text-green-600 mt-1">+{percentage_conversion_rate}% vs last period</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Client Satisfaction</h3>
            <Award className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{overviewStats.clientSatisfaction}/5.0</p>
          <p className="text-sm text-green-600 mt-1">+{client_satisfaction} vs last period</p>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Performance Trends</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Month</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Jobs Posted</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Applications</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Hires</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Revenue</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Conversion</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((month, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">{month.month}</td>
                  <td className="py-3 px-4 text-gray-700">{month.jobs}</td>
                  <td className="py-3 px-4 text-gray-700">{month.applications}</td>
                  <td className="py-3 px-4 text-gray-700">{month.hires}</td>
                  <td className="py-3 px-4 text-gray-700">${month.revenue.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-700">{((month.hires / month.applications) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderJobPerformanceReport = () => (
    <div className="space-y-8">
      {/* Top Performing Jobs */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Job Postings</h3>
        <div className="space-y-4">
          {topPerformingJobs.map((job, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{job.title}</h4>
                <div className="flex items-center space-x-6 mt-2 text-sm text-gray-600">
                  <span>{job.applications} applications</span>
                  <span>{job.hires} hires</span>
                  <span className="text-green-600 font-medium">{job.conversionRate}% conversion</span>
                </div>
              </div>
              <div className="w-16 h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 bg-blue-600 rounded-full" 
                  style={{ width: `${(job.conversionRate / 10) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Application Sources */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Application Sources</h3>
        <div className="space-y-4">
          {sourceAnalytics.map((source, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{source.source}</span>
                  <span className="text-sm text-gray-600">{source.applications} ({source.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${source.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderClientReport = () => (
    <div className="space-y-8">
      {/* Client Performance */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Client Performance Overview</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Client</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Active Jobs</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Successful Hires</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Revenue</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Satisfaction</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {clientPerformance.map((client, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">{client.name}</td>
                  <td className="py-3 px-4 text-gray-700">{client.jobs}</td>
                  <td className="py-3 px-4 text-gray-700">{client.hires}</td>
                  <td className="py-3 px-4 text-gray-700">${client.revenue.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className="text-gray-700 mr-2">{client.satisfaction}/5.0</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 rounded-full mr-1 ${
                              i < Math.floor(client.satisfaction) ? 'bg-yellow-400' : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Client</h3>
          <div className="space-y-3">
            {clientPerformance.map((client, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-700">{client.name}</span>
                <span className="font-medium text-gray-900">${client.revenue.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Satisfaction Trends</h3>
          <div className="space-y-3">
            {clientPerformance.map((client, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-700">{client.name}</span>
                <div className="flex items-center">
                  <span className="text-gray-900 mr-2">{client.satisfaction}/5.0</span>
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-green-500 rounded-full" 
                      style={{ width: `${(client.satisfaction / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <BarChart3 className="w-8 h-8 text-blue-600 mr-3" />
                Reports & Analytics
              </h1>
              <p className="text-gray-600 mt-2">
                Comprehensive insights into your recruitment performance
              </p>
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="last_7_days">Last 7 days</option>
                  <option value="last_30_days">Last 30 days</option>
                  <option value="last_90_days">Last 90 days</option>
                  <option value="last_year">Last year</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="overview">Overview Report</option>
                  <option value="job_performance">Job Performance</option>
                  <option value="client_analysis">Client Analysis</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Report Content */}
        {reportType === 'overview' && renderOverviewReport()}
        {reportType === 'job_performance' && renderJobPerformanceReport()}
        {reportType === 'client_analysis' && renderClientReport()}

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Need Custom Reports?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Get detailed analytics tailored to your specific needs
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors text-sm font-medium">
                Schedule Demo
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}