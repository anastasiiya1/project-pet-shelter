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
        <>
            <p>{demo}</p>
            {records.map((record) => (
                <div key={nanoid()}>{record.name}</div>
            ))}
        </>
    );
};

export default HomePage;
