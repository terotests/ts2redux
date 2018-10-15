/**
 * @redux true
 */
declare class UserState {
    logged: boolean;
    username: string;
    firstName: string;
    lastName: string;
    lastLogin: number;
    login(loginInfo: {
        username: string;
        password: string;
    }): Promise<void>;
    logout(): Promise<void>;
    fakeLogin(): void;
}
