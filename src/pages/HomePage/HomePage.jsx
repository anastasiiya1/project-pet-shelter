import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDemo, getDemoAll } from '../../redux/demo/operations';
import { selectIsLoading, selectError } from '../../redux/demo/selectors';
// import { nanoid } from 'nanoid';

import Hero from '../../components/Hero/Hero';
import AnimalsDemo from '../../components/AnimalsDemo/AnimalsDemo';
import AboutUs from '../../components/AboutUs/AboutUs';
import OurTeam from '../../components/OurTeam/OurTeam';
import Metrics from '../../components/Metrics/Metrics';
import OurAnimals from '../../components/OurAnimals/OurAnimals';
import Partners from '../../components/Partners/Partners';
import Donations from '../../components/Donations/Donations';
import OurBlog from '../../components/OurBlog/OurBlog';


const HomePage = () => {
    const dispatch = useDispatch();
    // const demo = useSelector(selectDemo);
    // const records = useSelector(selectRecords);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(getDemo());
        dispatch(getDemoAll());
    }, [dispatch]);


    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {/* <p>Demo requests:</p>
            <p>{demo}</p>
            {Array.isArray(records) && records.length > 0 ? (
                records.map((record) => <div key={nanoid()}>{record.name}</div>)
            ) : (
                <p>No records found.</p>
            )} */}
             <Hero />
            <AnimalsDemo />
            <AboutUs />
            <OurTeam />
            <Metrics />
            <OurAnimals />
            <Partners />
            <Donations />
            <OurBlog />
        </div>
    );
};

export default HomePage;