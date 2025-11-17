import React, { useState, useRef, useMemo, useEffect } from "react";
import "./key-value-dropdown-core.scss";
import { classNameParserCore } from "../../../coreFunctions/classNameParserCore/classNameParserCore";
import { TextCore } from "../../TextCore/TextCore";

type SelectedOption<
  TCategory extends string,
  TEntityId extends string,
> = Record<TCategory, TEntityId[]>;

type CategoryDropdownOption<TKey extends string> = {
  id: TKey;
  label: string;
  category: TKey;
};

type FieldDropdownOption<TCategory extends string, TValue extends string> = {
  id: TValue;
  label: string;
  category: TCategory;
};

interface KeyValueDropdownCoreProps<
  TCategory extends string,
  TEntityId extends string,
> {
  keyOptions: CategoryDropdownOption<TCategory>[];
  valueOptionsGetter: (
    category: TCategory,
  ) => FieldDropdownOption<TCategory, TEntityId>[];
  onChange: (
    newSelectedFieldsByCategory: Record<TCategory, TEntityId[]>,
  ) => void;
  className?: string;
  selectedOptionsMapping: SelectedOption<TCategory, TEntityId> | undefined;
  categoriesLabelGetter: (category: TCategory) => string;
  valueOptionsLabelGetter: (id: TEntityId) => string;
}

export function CategoryFieldsDropdownCore<
  TCategory extends string,
  TEntityId extends string,
>({
  keyOptions,
  valueOptionsGetter,
  onChange,
  className,
  selectedOptionsMapping,
  categoriesLabelGetter,
  valueOptionsLabelGetter,
}: KeyValueDropdownCoreProps<TCategory, TEntityId>) {
  const [categorySelections, setCategorySelections] = useState<
    SelectedOption<TCategory, TEntityId>
  >(selectedOptionsMapping as SelectedOption<TCategory, TEntityId>);

  const [selectedValues, setSelectedValues] = useState<TEntityId[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    TCategory | undefined
  >();
  const [activeTypeId, setActiveTypeId] = useState<TCategory | undefined>();

  const containerRef = useRef<HTMLDivElement>(null);

  const selectedCategoryInExistingKeys = useMemo<TCategory | null>(() => {
    if (!selectedCategory) return null;
    const categoryInExistingKeys = keyOptions.find(
      (categoryOption) => categoryOption.id === selectedCategory,
    );
    return categoryInExistingKeys ? categoryInExistingKeys.category : null;
  }, [selectedCategory, keyOptions]);

  const valueOptions = useMemo(() => {
    if (!selectedCategoryInExistingKeys) return [];
    return valueOptionsGetter(selectedCategoryInExistingKeys);
  }, [selectedCategoryInExistingKeys, valueOptionsGetter]);

  useEffect(() => {
    if (keyOptions?.length > 0 && selectedCategory === undefined) {
      handleCategoryClick(keyOptions?.[0]?.id);
    }
  }, [keyOptions]);

  const handleCategoryClick = (id: TCategory) => {
    if (selectedCategory === id) {
      return;
    }

    if (selectedCategory) {
      setCategorySelections((prevSelections) => {
        const updatedSelections = { ...prevSelections };

        if (selectedValues.length === 0) {
          delete updatedSelections[selectedCategory];
        } else {
          updatedSelections[selectedCategory] = selectedValues;
        }

        return updatedSelections as Record<TCategory, TEntityId[]>;
      });
    }

    setSelectedCategory(id);

    const selectionsForNewType = selectedOptionsMapping?.[id] || [];

    setSelectedValues(selectionsForNewType);
  };

  const handleContainerMouseLeave = (event: React.MouseEvent) => {
    const container = containerRef.current;

    if (container && !container.contains(event.relatedTarget as Node)) {
      if (selectedCategory) {
        const selectionsToOutput = {
          ...categorySelections,
        } as Record<TCategory, TEntityId[]>;

        if (selectedValues.length === 0) {
          delete selectionsToOutput[selectedCategory];
        } else {
          selectionsToOutput[selectedCategory] = selectedValues;
        }

        onChange(selectionsToOutput);

        setCategorySelections(selectionsToOutput);
      }

      if (activeTypeId !== selectedCategory) {
        setActiveTypeId(selectedCategory);
      }
    }
  };

  const toggleSelectedValue = (id: TEntityId) => {
    if (!selectedCategory) return;

    const currentSet = new Set(selectedValues);
    const isSelected = currentSet.has(id);

    if (isSelected) {
      currentSet.delete(id);
    } else {
      currentSet.add(id);
    }

    const updatedSelectedValuesArray = Array.from(currentSet);

    setSelectedValues(updatedSelectedValuesArray);

    const newCategorySelections = {
      ...categorySelections,
      [selectedCategory]: updatedSelectedValuesArray,
    } as Record<TCategory, TEntityId[]>;

    setCategorySelections(newCategorySelections);
  };

  return (
    <div
      className={classNameParserCore("key-value-dropdown-container", className)}
      ref={containerRef}
      onMouseLeave={handleContainerMouseLeave}
    >
      <div className="key-list">
        {(keyOptions || Object.keys(selectedOptionsMapping || {}))?.map(
          (key) => (
            <div
              key={String(key.id)}
              className={classNameParserCore("key-item", {
                "is-selected": selectedCategory === key.id,
              })}
              onClick={() => handleCategoryClick(key.id)}
            >
              <TextCore
                text={categoriesLabelGetter(key.category)}
                fontWeight="bold"
              />
            </div>
          ),
        )}
      </div>

      <div className="value-list">
        {selectedCategory !== null &&
          (valueOptions && valueOptions.length > 0 ? (
            valueOptions.map((value) => (
              <div
                key={String(value.id)}
                className="value-item"
                onClick={() => toggleSelectedValue(value.id as TEntityId)}
              >
                <input
                  type="checkbox"
                  checked={selectedValues.includes(value.id)}
                  onChange={() => toggleSelectedValue(value.id as TEntityId)}
                />
                <TextCore
                  text={valueOptionsLabelGetter(value.id as TEntityId)}
                />
              </div>
            ))
          ) : (
            <div className="value-empty-state">
              <TextCore text="No fields found for this category." />
            </div>
          ))}
      </div>
    </div>
  );
}
