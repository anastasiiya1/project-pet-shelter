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
    return (
        <div>
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
