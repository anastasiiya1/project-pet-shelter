import styles from './CategorySelector.module.css';
import attributesMap from './AttributesMap';
import { useState, useEffect } from 'react';


function AttributesSelector({ attributes, adAttributes, setAdAttributes }) {
    const [localAttributes, setLocalAttributes] = useState([]);

    useEffect(() => {
        setLocalAttributes(adAttributes);
    }, [adAttributes]);

    const handleAttributeChange = (attributeId, value) => {
        setLocalAttributes((prevAttributes) => {
            const existingAttributeIndex = prevAttributes.findIndex(attr => attr.attributeId === attributeId);
            
            if (existingAttributeIndex >= 0) {
                const updatedAttributes = [...prevAttributes];
                updatedAttributes[existingAttributeIndex] = { attributeId, value };
                return updatedAttributes;
            } else {
                return [...prevAttributes, { attributeId, value }];
            }
        });
    };

    const updateAttributesInParent = () => {
        setAdAttributes(localAttributes);
    };

    return (
        <div>
            {attributes.map((attribute) => (
                <div key={attribute.id} className={styles.formGroup}>
                    <label htmlFor={attribute.id}>
                        {attributesMap[attribute.name] || attribute.name}
                    </label>
                    <input
                        id={attribute.id}
                        type="text"
                        value={
                            localAttributes.find(attr => attr.attributeId === attribute.id)?.value || ''
                        }
                        onChange={(e) =>
                            handleAttributeChange(attribute.id, e.target.value)
                        }
                    />
                </div>
            ))}
            <button type="button" onClick={updateAttributesInParent}>
                Зберегти атрибути
            </button>
        </div>
    );
}

export default AttributesSelector;