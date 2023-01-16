export function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(' ');
}

type OpenGraphType = {
    siteName: string;
    description: string;
    templateTitle?: string;
    logo?: string;
    banner?: string;
    isBlog?: boolean;
};


export function openGraph({
    siteName,
    templateTitle,
    description,
    banner,
    logo = 'https://i.ibb.co/j37mBGy/logo-website.png',
    isBlog = false,
}: OpenGraphType): string {
    const ogLogo = encodeURIComponent(logo);
    const ogSiteName = encodeURIComponent(siteName.trim());
    const ogTemplateTitle = templateTitle
        ? encodeURIComponent(templateTitle.trim())
        : undefined;
    const ogDesc = encodeURIComponent(description.trim());

    if (isBlog) {
        const ogBanner = banner ? encodeURIComponent(banner.trim()) : undefined;

        return `https://og.clarence.link/api/blog?templateTitle=${ogTemplateTitle}&banner=${ogBanner}`;
    }

    return `https://og.clarence.link/api/gradient?siteName=${ogSiteName}&description=${ogDesc}&logo=${ogLogo}${ogTemplateTitle ? `&templateTitle=${ogTemplateTitle}` : ''
        }`;
}



// * Access session storage on browser
export function getFromSessionStorage(key: string) {
    if (typeof sessionStorage !== 'undefined') {
        return sessionStorage.getItem(key);
    }
    return null;
}

export function getFromLocalStorage(key: string) {
    if (typeof localStorage !== 'undefined') {
        return localStorage.getItem(key);
    }
    return null;
}
