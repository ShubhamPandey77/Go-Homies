import React, { useState } from "react";
import { OptimizeBudget } from "../../../ApiCall";
import { DollarSign, Loader, AlertCircle } from "lucide-react";

const BudgetOptimizer = () => {
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleOptimize = async () => {
    if (!budget || budget <= 0) {
      setError("Please enter a valid budget amount");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await OptimizeBudget(parseInt(budget));

      if (response?.status === 200 && response?.data?.data?.response) {
        setResult(response.data.data.response);
      } else {
        const errorMsg = response?.data?.message || response?.data?.error || "Failed to optimize budget";
        console.error("Response structure:", response?.data);
        setError(errorMsg);
      }
    } catch (err) {
      const errorMsg = err?.response?.data?.message || err?.response?.data?.error || err?.message || "Error processing your request";
      console.error("Budget Optimizer Error:", err);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-[#d7d7d8] p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-[#6B8E23]/10 rounded-lg">
          <DollarSign size={24} className="text-[#6B8E23]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Budget Optimizer</h2>
          <p className="text-sm text-gray-600">
            Get AI-powered budget optimization for your trips
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Your Budget (USD)
          </label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Enter your total budget..."
            className="w-full px-4 py-3 border border-[#d7d7d8] rounded-lg focus:outline-none focus:border-[#6B8E23] focus:ring-2 focus:ring-[#6B8E23]/20"
            min="0"
          />
        </div>

        <button
          onClick={handleOptimize}
          disabled={loading || !budget}
          className="w-full py-3 bg-[#6B8E23] text-white rounded-lg hover:bg-[#5a7a1c] transition disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
        >
          {loading && <Loader size={20} className="animate-spin" />}
          {loading ? "Optimizing..." : "Optimize Budget"}
        </button>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {result && (
          <div className="p-4 bg-[#6B8E23]/10 border border-[#6B8E23]/30 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">
              Budget Optimization Results
            </h3>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">
                {result}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetOptimizer;
