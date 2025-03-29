"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Home() {
  const [aiTips, setAiTips] = useState([
    'Reduce dining out expenses by ₹1,500',
    'Switch to a cheaper mobile plan (potential savings: ₹300)',
    'Use public transport twice a week (savings: ₹200)',
  ]);

  const [showTips, setShowTips] = useState(false);

  const toggleTips = () => setShowTips(!showTips);

  return (
    <div className="p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">FinCoach AI</h1>
        <div>
          <Button className="mr-2 bg-green-600 text-white">New Investment</Button>
          <Button className="bg-blue-600 text-white">Financial Health</Button>
        </div>
      </div>

      {/* AI Financial Coach Section */}
      <Card className="mt-6 p-4">
        <CardHeader>
          <h2 className="text-xl font-bold">Your AI Financial Coach</h2>
        </CardHeader>
        <CardContent className="flex flex-col items-start">
          <p className="mt-2 text-gray-600">Based on your recent activity, you could save ₹2,000 monthly by optimizing your expenses. Would you like to explore how?</p>
          <Button className="mt-4 bg-blue-500 text-white" onClick={toggleTips}>
            {showTips ? 'Hide Tips' : 'Yes, please show me how I can save more.'}
          </Button>
          {showTips && (
            <ul className="mt-4 list-disc list-inside text-gray-800">
              {aiTips.map((tip, index) => (
                <li key={index} className="mt-1">{tip}</li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Financial Health Score */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="font-semibold text-lg">Financial Health Score</h2>
          <div className="w-24 mt-4">
            <CircularProgressbar value={85} text={85} />
          </div>
          <ul className="mt-4 space-y-1 text-sm text-gray-600">
            <li>Income Growth: +10%</li>
            <li>Spending Control: +8%</li>
            <li>Savings Growth: +15%</li>
          </ul>
        </div>

        {/* Quick Actions Section */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="font-semibold text-lg">Quick Actions</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Button className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300">View Investments</Button>
            </li>
            <li>
              <Button className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300">Optimize Budget Review</Button>
            </li>
            <li>
              <Button className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300">Financial Learning Modules</Button>
            </li>
          </ul>
        </div>
      </div>

      {/* Financial Goals */}
      <div className="mt-8">
        <h2 className="text-xl font-bold">Your Financial Goals</h2>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold">Vacation Fund</h3>
            <div className="mt-2 bg-gray-100 rounded-full h-3 relative">
              <div className="bg-blue-500 h-3 rounded-full w-[60%]" />
            </div>
            <p className="mt-2 text-sm">₹30,000 saved / ₹50,000 target</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold">Emergency Fund</h3>
            <div className="mt-2 bg-gray-100 rounded-full h-3 relative">
              <div className="bg-yellow-500 h-3 rounded-full w-[20%]" />
            </div>
            <p className="mt-2 text-sm">₹20,000 saved / ₹100,000 target</p>
          </div>
        </div>
      </div>

      {/* Financial Insights */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="font-semibold text-lg">Financial Health Overview</h2>
          <p className="text-sm mt-2 text-gray-600">Compare your income, expenses, and savings.</p>
          <img src="/graph-placeholder.png" alt="Graph Placeholder" className="mt-4" />
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="font-semibold text-lg">AI Insights</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>💡 Savings Opportunity: Increase monthly savings by ₹2,100 to achieve your vacation goal faster.</li>
            <li>💡 Investment Tip: Consider investing ₹5,000 in a recurring deposit for a 6% annual return.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}