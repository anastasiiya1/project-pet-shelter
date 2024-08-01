import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './BarChartComponent.module.css';

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

    const handlePeriodChange =(period) =>{
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
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={getData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="donations" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
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