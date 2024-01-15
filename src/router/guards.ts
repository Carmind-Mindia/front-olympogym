import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { UserHubApi } from '../services/user-hub.api';

export const mustBeLogin = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {

    try {
        await UserHubApi.GET().validateCookie();
    } catch (error) {
        next('/login')
        return;
    }

    next();

}

export const mustBeLoggedOut = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {

    try {
        await UserHubApi.GET().validateCookie();
    } catch (error) {
        next()
        return;
    }

    next('/');

}
