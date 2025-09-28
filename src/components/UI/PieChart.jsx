import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./PieChart.scss";
import useLoadPie from "../../api/useLoadPie";
import { useState } from "react";

const labelsA = ["Leading", "Lecturing", "Workshops", "Assessing"];
const coloursA = ["rgb(54, 162, 235)", "rgb(255, 99, 132)", "rgb(255, 205, 86)", "rgb(75, 192, 192)"];

export default function PieChart({ userId }) {
  const { items, error, isLoading } = useLoadPie(userId);
  const [activeTab, setActiveTab] = useState(0);

  if (error) {
    return (
      <div className="chartsContainer">
        <p className="status status--error">Couldn’t load teaching data: {error}</p>
      </div>
    );
  }
  if (isLoading || !items) {
    return (
      <div className="chartsContainer">
        <p className="status">Loading charts…</p>
      </div>
    );
  }
  if (items.length === 0) {
    return (
      <div className="chartsContainer">
        <p className="status">No teaching entries found for user {userId}.</p>
      </div>
    );
  }

  const charts = items.map((it) => ({
    id: it.TeachingID,
    title: it.TeachingModuleName,
    data: {
      labels: labelsA,
      datasets: [
        {
          label: "Hours / weighting",
          data: [
            it.TeachingLeading ?? 0,
            it.TeachingLecturing ?? 0,
            it.TeachingWorkshops ?? 0,
            it.TeachingAssessing ?? 0,
          ],
          backgroundColor: coloursA,
          borderWidth: 1,
        },
      ],
    },
  }));

  return (
    <div className="chartsContainer">
      <div className="tabs">
        <div className="tab-headers">
          {charts.map((chart, index) => (
            <button
              key={chart.id}
              className={`tab-header ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {chart.title}
            </button>
          ))}
        </div>
        <div className="tab-content">
          {charts[activeTab] && (
            <div className="chartCard">
              <Pie
                data={charts[activeTab].data}
                options={{
                  plugins: {
                    title: { display: true, text: charts[activeTab].title },
                    legend: { position: "bottom" },
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          const label = context.label || "";
                          const value = Number(context.parsed) || 0;
                          const total = (context.dataset.data || []).reduce((a, b) => a + (Number(b) || 0), 0);
                          const pct = total ? ((value / total) * 100).toFixed(1) : "0.0";
                          return `${label}: ${value} (${pct}%)`;
                        },
                      },
                    },
                  },
                  animation: { duration: 1000 },
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
