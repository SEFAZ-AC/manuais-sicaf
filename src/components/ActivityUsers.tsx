"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ActivityTitle from "./ActivityTitle";

const ActivityUsers = ({ metrics }: { metrics: any }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Usuário",
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Quantidade produzida",
        },
      },
    },
  };
  const labels = metrics.userProduction.map((user: any) => user.name);
  const data = {
    labels,
    datasets: [
      {
        label: "Artigos",
        data: metrics.userProduction.map((user: any) => user.articlesCount),
        backgroundColor: "#4B9CD3",
      },
      {
        label: "FAQs",
        data: metrics.userProduction.map((user: any) => user.faqsCount),
        backgroundColor: "#D35400",
      },
      {
        label: "Páginas",
        data: metrics.userProduction.map((user: any) => user.pagesCount),
        backgroundColor: "#8E44AD",
      },
    ],
  };
  return (
    <div className="bg-base-300 w-full h-full rounded-box p-3 flex flex-col gap-3">
      <ActivityTitle text="Atividade de Usuários" />
      <div className="bg-base-200 rounded-box h-full p-3">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default ActivityUsers;
