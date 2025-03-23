export const login = (email: string, password: string) => {
    if (email === "user@example.com" && password === "password123") {
        const token = "mock-jwt-token";
        localStorage.setItem("token", token);
        return token;
    }
    return null;
};

export const logout = () => {
    localStorage.removeItem("token");
};

export const isAuthenticated = () => {
    return typeof window !== "undefined" && localStorage.getItem("token");
};
