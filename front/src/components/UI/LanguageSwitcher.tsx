import React from 'react';

const LanguageSwitcher = () => {
    return (
        <div>
            <select
                className="language-switcher"
                name="languageSwitcher"
                id="languageSwitcher"
            >
                <option value="EN">EN</option>
                <option value="RU">RU</option>
            </select>
        </div>
    );
};

export default LanguageSwitcher;