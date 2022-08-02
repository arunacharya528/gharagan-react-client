import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "../../icons";

export const ThemeToggle = ({ showTitle = true }) => {

    const icons = {
        light: <MoonIcon className="w-5 h-5" />,
        dark: <SunIcon className="w-5 h-5" />
    };
    const [themeIcon, setThemeIcon] = useState(null);

    const setTheme = (mode) => {
        const htmlElement = document.documentElement;
        htmlElement.setAttribute('data-theme', mode)
        setThemeIcon(icons[mode])
    }

    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        } else {
            setTheme('light');
        }

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            event.matches ? setTheme('dark') : setTheme('light');
        });
    }, [])


    const handleThemeChange = (e) => {

        const htmlElement = document.documentElement;
        const currentTheme = htmlElement.getAttribute('data-theme')

        switch (currentTheme) {
            case 'light':
                setTheme('dark')
                break;
            case 'dark':
                setTheme('light')
                break;
        }
    }

    return (
        <button onClick={handleThemeChange} className="btn btn-ghost btn-circle">
            {themeIcon}
        </button>
    );
}