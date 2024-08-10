import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import styles from './BarChartComponent.module.css';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const dataWeek = [
  { name: 'Mon', donations: 4000 },
  { name: 'Tue', donations: 3000 },
  { name: 'Wed', donations: 2000 },
  { name: 'Thu', donations: 2780 },
  { name: 'Fri', donations: 1890 },
  { name: 'Sat', donations: 2390 },
  { name: 'Sun', donations: 3490 },
];

const dataMonth = [
  { name: 'Week 1', donations: 12000 },
  { name: 'Week 2', donations: 13000 },
  { name: 'Week 3', donations: 11000 },
  { name: 'Week 4', donations: 14000 },
];

const dataYear = [
  { name: 'Jan', donations: 30000 },
  { name: 'Feb', donations: 28000 },
  { name: 'Mar', donations: 25000 },
  { name: 'Apr', donations: 32000 },
  { name: 'May', donations: 31000 },
  { name: 'Jun', donations: 30000 },
  { name: 'Jul', donations: 34000 },
  { name: 'Aug', donations: 35000 },
  { name: 'Sep', donations: 33000 },
  { name: 'Oct', donations: 36000 },
  { name: 'Nov', donations: 37000 },
  { name: 'Dec', donations: 38000 },
];

const BarChartComponent = () => {
  const [period, setPeriod] = useState('week');

  const handlePeriodChange = (period) => {
    setPeriod(period);
  }

  const statistics = {
    week: { totalAnimals: 150, adoptedAnimals: 75, activeVolunteers: 20, partnerShelters: 10 },
    month: { totalAnimals: 600, adoptedAnimals: 300, activeVolunteers: 30, partnerShelters: 15 },
    year: { totalAnimals: 7200, adoptedAnimals: 3600, activeVolunteers: 240, partnerShelters: 50 },
  };

  const getData = () => {
    switch (period) {
      case 'month':
        return dataMonth;
      case 'year':
        return dataYear;
      case 'week':
      default:
        return dataWeek;
    }
  };

  const { totalAnimals, adoptedAnimals, activeVolunteers, partnerShelters } = statistics[period];

  const chartData = {
    labels: getData().map(data => data.name),
    datasets: [
      {
        label: 'Donations',
        data: getData().map(data => data.donations),
        backgroundColor: 'rgba(136, 132, 216, 0.6)',
        borderColor: 'rgba(136, 132, 216, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div className={styles.buttonGroup}>
        <button
          className={`${styles.button} ${period === 'week' ? styles.active : ''}`}
          onClick={() => handlePeriodChange('week')}
        >
          Week
        </button>
        <button
          className={`${styles.button} ${period === 'month' ? styles.active : ''}`}
          onClick={() => handlePeriodChange('month')}
        >
          Month
        </button>
        <button
          className={`${styles.button} ${period === 'year' ? styles.active : ''}`}
          onClick={() => handlePeriodChange('year')}
        >
          Year
        </button>
      </div>
      <div className={styles.chartContainer}>
        <Bar data={chartData} options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `Donations: ${tooltipItem.raw}`;
                },
              },
            },
          },
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            },
          },
        }} />
      </div>
      <div className={styles.statsContainer}>
        <div className={styles.statsItem}>Total animals on site: {totalAnimals}</div>
        <div className={styles.statsItem}>Adopted animals: {adoptedAnimals}</div>
        <div className={styles.statsItem}>Active volunteers: {activeVolunteers}</div>
        <div className={styles.statsItem}>Partner shelters: {partnerShelters}</div>
      </div>
    </div>
  );
};

export default BarChartComponent;