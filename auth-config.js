export default {
    endpoint: "auth",
    configureEndpoints: ["auth", "master", "inventory", "merchandiser", "sales"],

    loginUrl: "authenticate",
    profileUrl: "me",

    authTokenType:"Bearer",
    //authTokenType: "JWT",
    accessTokenProp: "data",

    storageChangedReload : true
};
