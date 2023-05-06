import React, {useState} from 'react';
import {useRouter} from "next/router";

const LanguageSwitcher = () => {
  const router = useRouter();
  const { pathname, asPath, query } = router
  const [locale, setLocale] = useState<string>(router.locale as string);

  const handleLanguageChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    await setLocale(newLocale);
    await router.push({ pathname, query }, asPath, {
      locale: newLocale,
    });
  };

  return (
    <div>
      <select
        className="language-switcher"
        name="languageSwitcher"
        id="languageSwitcher"
        defaultValue={locale}
        onChange={handleLanguageChange}
      >
        <option value='en' disabled={locale === "en"}>EN</option>
        <option value="ru" disabled={locale === "ru"}>RU</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
