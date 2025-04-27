import React from "react";
import "../../styles/PerformanceStats.css";

interface PerformanceStatsProps {
  questionsCount: number;
}

const badges = [
  { title: "🏆 Legendary!", min: 1, max: 2 },
  { title: "🎯 Brilliant!", min: 3, max: 4 },
  { title: "🌟 Very Good!", min: 5, max: 7 },
  { title: "👍 Nice!", min: 8, max: 10 },
  { title: "✅ Completed!", min: 11, max: Infinity },
];

const PerformanceStats: React.FC<PerformanceStatsProps> = ({ questionsCount }) => {
  return (
    <div className="performance-stats">
      {badges.map((badge, index) => {
        const isUserBadge = questionsCount >= badge.min && questionsCount <= badge.max;

        return (
          <div key={index} className={`badge-row ${isUserBadge ? "highlight" : ""}`}>
            <span className="badge-title">{badge.title}</span>
            <span className="badge-range">
              {badge.max === Infinity
                ? `${badge.min}+`
                : `${badge.min}-${badge.max}`}
            </span>
            {isUserBadge && <span className="badge-you">← You</span>}
          </div>
        );
      })}
    </div>
  );
};

export default PerformanceStats;
