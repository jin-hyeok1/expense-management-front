let externalNavigate: (path: string) => void = () => {};

export const setNavigate = (fn: (path: string) => void) => {
    externalNavigate = fn;
};

export const navigateExternally = (path: string) => {
    externalNavigate(path);
};