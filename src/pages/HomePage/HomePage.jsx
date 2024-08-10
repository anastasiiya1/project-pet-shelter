import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDemo, getDemoAll } from '../../redux/demo/operations';
import { selectDemo, selectRecords, selectIsLoading, selectError } from '../../redux/demo/selectors';
import { nanoid } from 'nanoid';

const HomePage = () => {
    const dispatch = useDispatch();
    const demo = useSelector(selectDemo);
    const records = useSelector(selectRecords);
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
            <p>{demo}</p>
            {Array.isArray(records) && records.length > 0 ? (
                records.map((record) => <div key={nanoid()}>{record.name}</div>)
            ) : (
                <p>No records found.</p>
            )}
        </div>
    );
};

export default HomePage;