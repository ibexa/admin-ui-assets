declare module '*.xliff' {
    const value: string;
    export default value;
};

declare module '../packages/assets/src/img/all-icons.json' {
    const icons: string[];
    export default icons;
};

declare module '!!raw-loader!../packages/assets/src/scss/variables/_colors.scss' {
    const value: string;
    export default value;
};
