import React from 'react';

const StatCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center space-x-3">
      <div className={`p-2 rounded-lg ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;