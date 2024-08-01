import BarChartComponent from "../BarChartComponent/BarChartComponent";
import styles from './Metrics.module.css';

function Metrics() {
	

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Key metrics</h2>
      <div className={styles.chartContainer}>
        <BarChartComponent />
      </div>
    </div>
  );
}

export default Metrics;