import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const AnimalsPage = lazy(() => import('../../pages/AnimalsPage/AnimalsPage'));
const VolunteeringPage = lazy(() => import('../../pages/VolunteeringPage/VolunteeringPage'));
const ContactsPage = lazy(() => import('../../pages/ContactsPage/ContactsPage'));
const HelpDonationPage = lazy(() => import('../../pages/HelpDonationPage/HelpDonationPage'));
const NewsPage = lazy(() => import('../../pages/NewsPage/NewsPage'));
const SearchPage = lazy(() => import('../../pages/SearchPage/SearchPage'));
const AboutUsPage = lazy(() => import('../../pages/AboutUsPage/AboutUsPage'));
const MyAccountPage = lazy(() => import('../../pages/MyAccountPage/MyAccountPage'));
const SignInPage = lazy(() => import('../../pages/SignInPage/SignInPage'));
const CreateAccountPage = lazy(() => import('../../pages/CreateAccountPage/CreateAccountPage'));
const CategoriesPage = lazy(() => import('../../pages/CategoriesPage/CategoriesPage'));


const App = () => {
    return (
        <div>
            <Navigation />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/animals" element={<AnimalsPage />} />
                    <Route path="/volunteering" element={<VolunteeringPage />} />
                    <Route path="/contacts" element={<ContactsPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/categories" element={<CategoriesPage />} />
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/about-us" element={<AboutUsPage />} />
                    <Route path="/donations" element={<HelpDonationPage />} />
                    <Route path="/my-account" element={<MyAccountPage />} />
                    <Route path="/sign-in" element={<SignInPage />} />
                    <Route path="/registration" element={<CreateAccountPage />} />
                </Routes>
            </Suspense>
            <Footer/>
        </div>
    );
};

export default App;
