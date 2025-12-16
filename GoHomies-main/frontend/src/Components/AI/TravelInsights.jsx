import React, { useState, useEffect } from "react";
import { GetTravelInsights } from "../../../ApiCall";
import { TrendingUp, RefreshCw, Loader, AlertCircle } from "lucide-react";

const TravelInsights = () => {
  const [insights, setInsights] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await GetTravelInsights();

      if (response?.status === 200 && response?.data?.data?.response) {
        setInsights(response.data.data.response);
        setStats(response.data.data.stats);
      } else {
        const errorMsg = response?.data?.message || response?.data?.error || "Failed to fetch travel insights";
        console.error("Response structure:", response?.data);
        setError(errorMsg);
      }
    } catch (err) {
      const errorMsg = err?.response?.data?.message || err?.response?.data?.error || err?.message || "Error loading insights";
      console.error("Travel Insights Error:", err);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-white rounded-2xl border border-[#d7d7d8] p-8 flex items-center justify-center h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader size={32} className="animate-spin text-[#6B8E23]" />
          <p className="text-gray-600">Loading travel insights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl border border-[#d7d7d8] p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#6B8E23]/10 rounded-lg">
            <TrendingUp size={24} className="text-[#6B8E23]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Travel Insights</h2>
            <p className="text-sm text-gray-600">
              AI-powered analysis of community travel data
            </p>
          </div>
        </div>
        <button
          onClick={fetchInsights}
          disabled={loading}
          className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
          title="Refresh insights"
        >
          <RefreshCw
            size={20}
            className={`text-[#6B8E23] ${loading ? "animate-spin" : ""}`}
          />
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3 mb-6">
          <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {stats && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <p className="text-gray-600 text-sm mb-1">Total Trips</p>
            <p className="text-2xl font-bold text-blue-900">{stats.totalPosts}</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
            <p className="text-gray-600 text-sm mb-1">Vlogs Shared</p>
            <p className="text-2xl font-bold text-purple-900">
              {stats.totalVlogs}
            </p>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
            <p className="text-gray-600 text-sm mb-1">Avg Budget</p>
            <p className="text-2xl font-bold text-green-900">
              ${stats.avgBudget}
            </p>
          </div>
        </div>
      )}

      {insights && (
        <div className="space-y-4">
          <div className="p-4 bg-[#6B8E23]/5 border border-[#6B8E23]/20 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3 text-lg">
              AI-Powered Insights
            </h3>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">
                {insights}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-600 mb-1">Last Updated</p>
              <p className="font-medium text-gray-900">
                {new Date().toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-600 mb-1">Data Source</p>
              <p className="font-medium text-gray-900">Live Community Data</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelInsights;
