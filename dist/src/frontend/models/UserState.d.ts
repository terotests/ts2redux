/**
 * @redux true
 */
declare class UserState {
    logged: boolean;
    username: string;
    firstName: string;
    lastName: string;
    login(loginInfo: {
        username: string;
        password: string;
    }): Promise<void>;
}
