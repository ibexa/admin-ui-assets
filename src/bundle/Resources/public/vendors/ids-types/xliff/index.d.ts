declare module 'xliff' {
    type xliff12ToJsType = (content: string) => Promise<any>;

    let xliff12ToJs: xliff12ToJsType;
};
