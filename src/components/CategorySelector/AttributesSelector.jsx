import styles from './CategorySelector.module.css'
import attributesMap from './AttributesMap';

function AttributesSelector({ attributes, adAttributes, setAdAttributes }) {
    return (
        <>
            {attributes.length > 0 && (
                <>
                    {attributes.map((attribute) => (
                        <div key={attribute.id} className={styles.formGroup}>
                            <label htmlFor={attribute.name}> {attributesMap[attribute.name] || attribute.name}</label>
                            {attribute.valueType === 'STRING' && (
                                <input
                                    id={attribute.name}
                                    type="text"
                                    value={adAttributes[attribute.name] || ''}
                                    onChange={(e) =>
                                        setAdAttributes({ ...adAttributes, [attribute.name]: e.target.value })
                                    }
                                />
                            )}
                        </div>
                    ))}
                </>
            )}
        </>
    );
}

export default AttributesSelector;