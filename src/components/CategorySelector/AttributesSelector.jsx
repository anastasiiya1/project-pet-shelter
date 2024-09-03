import styles from './CategorySelector.module.css';
import attributesMap from './AttributesMap';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

function AttributesSelector({ attributes, adAttributes, setAdAttributes, showSaveButton = true }) {
    const [localAttributes, setLocalAttributes] = useState([]);
    const [selectedColor, setSelectedColor] = useState('');

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

        if (attributes.find(attr => attr.id === attributeId)?.name === 'color') {
            setSelectedColor(value);
        }
    };

    const updateAttributesInParent = () => {
        setAdAttributes(localAttributes);
    };

    const renderInputField = (attribute) => {
        if (!Array.isArray(attributes)) return null;

        switch (attribute.name) {
            case 'age':
                return (
                    <select
                        id={attribute.id}
                        value={localAttributes.find(attr => attr.attributeId === attribute.id)?.value || ''}
                        onChange={(e) => handleAttributeChange(attribute.id, e.target.value)}
                    >
                        <option value="">Select age</option>
                        <option value="under 1 year">under 1 year</option>
                        <option value="1 year to 5 years">1 year to 5 years</option>
                        <option value="over 5 years">over 5 years</option>
                    </select>
                );
            case 'size':
                return (
                    <select
                        id={attribute.id}
                        value={localAttributes.find(attr => attr.attributeId === attribute.id)?.value || ''}
                        onChange={(e) => handleAttributeChange(attribute.id, e.target.value)}
                    >
                        <option value="">Select size</option>
                        <option value="small">small</option>
                        <option value="medium">medium</option>
                        <option value="large">large</option>
                    </select>
                );
            case 'gender':
                return (
                    <select
                        id={attribute.id}
                        value={localAttributes.find(attr => attr.attributeId === attribute.id)?.value || ''}
                        onChange={(e) => handleAttributeChange(attribute.id, e.target.value)}
                    >
                        <option value="">Select gender</option>
                        <option value="female">female</option>
                        <option value="male">male</option>
                    </select>
                );
            case 'health_condition':
                return (
                    <select
                        id={attribute.id}
                        value={localAttributes.find(attr => attr.attributeId === attribute.id)?.value || ''}
                        onChange={(e) => handleAttributeChange(attribute.id, e.target.value)}
                    >
                        <option value="">Select health condition</option>
                        <option value="needs treatment">needs treatment</option>
                        <option value="vaccinated">vaccinated</option>
                        <option value="neutered">neutered</option>
                        <option value="needs special care">needs special care</option>
                        <option value="no special care needed">no special care needed</option>
                    </select>
                );
            case 'coat_length':
                return (
                    <select
                        id={attribute.id}
                        value={localAttributes.find(attr => attr.attributeId === attribute.id)?.value || ''}
                        onChange={(e) => handleAttributeChange(attribute.id, e.target.value)}
                    >
                        <option value="">Select coat length</option>
                        <option value="any">no coat</option>
                        <option value="short">short</option>
                        <option value="medium">medium</option>
                        <option value="long">long</option>
                    </select>
                );
            case 'color':
                return (
                    <div>
                        <div className={styles.colorOptions}>
                            {['white', 'black', 'gray', 'brown', 'red', 'orange', 'yellow', 'green', 'blue'].map(color => (
                                <div
                                    key={color}
                                    className={clsx(styles.colorSquare, {
                                        [styles.selected]: color === selectedColor
                                    })}
                                    style={{ backgroundColor: color }}
                                    onClick={() => handleAttributeChange(attribute.id, color)}
                                />
                            ))}
                        </div>
                        <div className={styles.selectedColor}>
                            Selected Color: <span style={{ color: selectedColor }}>{selectedColor}</span>
                        </div>
                    </div>
                );
            default:
                return (
                    <input
                        id={attribute.id}
                        type="text"
                        value={localAttributes.find(attr => attr.attributeId === attribute.id)?.value || ''}
                        onChange={(e) => handleAttributeChange(attribute.id, e.target.value)}
                    />
                );
        }
    };

    return (
        <div>
            {attributes.map((attribute) => (
                <div key={attribute.id} className={styles.formGroup}>
                    <label htmlFor={attribute.id}>
                        {attributesMap[attribute.name] || attribute.name}
                    </label>
                    {renderInputField(attribute)}
                </div>
            ))}
            {showSaveButton && (
                <button type="button" onClick={updateAttributesInParent}>
                    Save changes
                </button>
            )}
        </div>
    );
}

export default AttributesSelector;