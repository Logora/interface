const LANGUAGES = [
    {
        name: "fr",
        icon: " 🇫🇷"
    },
    {
        name: "en",
        icon: " 🇬🇧"
    },
    {
        name: "es",
        icon: " 🇪🇸"
    },
    {
        name: "de",
        icon: " 🇩🇪"
    },
    {
        name: "it",
        icon: " 🇮🇹"
    },
    {
        name: "rm",
        icon: " 🇨🇭"
    },
    {
        name: "pt",
        icon: " 🇵🇹"
    },
    {
        name: "pt-BR",
        icon: " 🇧🇷"
    },
    {
        name: "fr-CH",
        icon: " 🇨🇭 🇫🇷"
    },
    {
        name: "de-CH",
        icon: " 🇨🇭 🇩🇪"
    },
    {
        name: "it-CH",
        icon: " 🇨🇭 🇮🇹"
    },
]

const getLocaleIcon = (locale, dialect) => {
    if (dialect) {
        return LANGUAGES.find(lang => lang.name === `${locale}-${dialect}`)?.icon || LANGUAGES.find(lang => lang.name === locale)?.icon
    } else {
        return LANGUAGES.find(lang => lang.name === locale)?.icon
    }
}

const getLocaleName = (locale, dialect) => {
    if (dialect) {
        return LANGUAGES.find(lang => lang.name === `${locale}-${dialect}`)?.name | LANGUAGES.find(lang => lang.name === locale)?.name
    } else {
        return LANGUAGES.find(lang => lang.name === locale)?.name
    }
}

export { getLocaleIcon, getLocaleName, LANGUAGES }