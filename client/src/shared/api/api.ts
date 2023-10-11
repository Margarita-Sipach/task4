import axios from 'axios';
import { SignInType, SignUpType } from 'shared/types/user';

enum routes {
users = '/users',
signIn = '/sign_in',
signUp = '/sign_up',
}

export class API {
    instance = axios.create({
        baseURL: __API__,
        headers: {},
    });

    async getAllUsers() {
        const res = await this.instance.get(routes.users);
        return res.data;
    }

    async deleteUsers(ids: string[]) {
        const res = await this.instance.post(routes.users, ids);
        return res.data;
    }

    async updateUsers(ids: string[], isActive: boolean) {
        const res = await this.instance.put(routes.users, { ids, isActive });
        return res.data;
    }

    async signIn(user: SignInType) {
        const res = await this.instance.post(routes.signIn, user);
        return res.data;
    }

    async signUp(user: SignUpType) {
        const res = await this.instance.post(routes.signUp, user);
        return res.data;
    }

    async getUserById(id: string) {
        const res = await this.instance.get(`${routes.users}/${id}`);
        return res.data;
    }
}

export const api = new API();
