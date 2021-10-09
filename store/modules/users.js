import {success, error} from '../../helpers/ErrorHandler';

const state = () => ({
    getEmployees: {},
    getUsers: {},
    isUser: {},
    myUser: {},
    forgetPassword: ''
});

const getters = {
    getUsers(state) {
        return state.getUsers
    },
    getEmployees(state) {
        return state.getEmployees
    },
    isUser(state) {
        return state.isUser
    },
};

const actions = {

    /*
    |--------------------------------------------------------------------------
    | Panel Part
    |--------------------------------------------------------------------------
    */
    /**
     *
     * @param context
     * @param page
     * @returns {Promise<void>}
     */
    async getEmployees(context, page = 1) {
        await this.$axios.get(`panel/employees?page=${page}`)
            .then(res => {
                //success(res);
                const getEmployees = res.data.data;
                context.commit('getEmployees', getEmployees);
            }).catch(err => {
                error(err);
            })
    },

    /**
     *
     * @param context
     * @param page
     * @returns {Promise<void>}
     */
    async getUsers(context, page = 1) {
        await this.$axios.get(`panel/users?page=${page}`)
            .then(res => {
                //success(res);
                const getUsers = res.data.data;
                context.commit('getUsers', getUsers);
            }).catch(err => {
                error(err);
            })
    },

    /**
     *
     * @param context
     * @param payload
     */
    showUser(context, payload) {
        const userId = payload.id;
        const users = context.state.getUsers;
        console.log(users[3].id);
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === userId) {
                const isUser = users[i];
                context.commit('isUser', isUser);
            }
        }
    },

    /**
     *
     * @param context
     * @param payload
     */
    editUser(context, payload) {
        const userId = payload.id;
        const users = context.state.getUsers;
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === userId) {
                const isUser = users[i];
                context.commit('isUser', isUser);
            }
        }
    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     */
    async isUserRegister(context, payload) {
        let formData = new FormData();

        formData.append('first_name', payload.first_name);
        formData.append('last_name', payload.last_name);
        formData.append('username', payload.username);
        formData.append('email', payload.email);
        formData.append('mobile', payload.mobile);
        formData.append('home_phone', payload.home_phone);
        formData.append('zip_code', payload.zip_code);
        formData.append('password', payload.password);
        formData.append('confirmation_password', payload.confirmation_password);
        formData.append('home_address', payload.home_address);
        formData.append('work_address', payload.work_address);
        formData.append('state', payload.state);
        formData.append('image', payload.image);
        formData.append('permission', payload.permission);
        formData.append('role', payload.role);

        await this.$axios.post('panel/users/store', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            .then(res => {
                const getUsers = res.data.data;
                context.commit('getUsers', getUsers);
                success(res);
                //this.$router.push('/panel/users');

            })
            .catch(err => {
                error(err);
            })
    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     */
    async isUserUpdate(context, payload) {
        let formData = new FormData();

        formData.append("id", payload.id);
        formData.append("first_name", payload.first_name);
        formData.append("last_name", payload.last_name);
        formData.append("username", payload.username);
        formData.append("email", payload.email);
        formData.append("mobile", payload.mobile);
        formData.append("home_phone", payload.home_phone);
        formData.append("zip_code", payload.zip_code);
        formData.append("password", payload.password);
        formData.append("confirmation_password", payload.confirmation_password);
        formData.append("home_address", payload.home_address);
        formData.append("work_address", payload.work_address);
        formData.append("image", payload.image);
        formData.append("role", payload.role);
        formData.append("permission", payload.permission);

        await this.$axios.post(`panel/users/update/${payload.id}`, formData)
            .then(async res => {
                const getUsers = await res.data.data;
                context.commit('getUsers', getUsers);
                await success(res);
            }).catch(async err => {
                await error(err);
            })
    },

    /**
     *
     * @param context
     * @param payload
     */
    async deleteUser(context, payload) {
        state.isUser = payload.id;
        const id = payload.id;
        await this.$axios.get('panel/users/' + id)
            .then(() => {
                /*let idx = user.indexOf(id)
                const getUsers = state.getUsers.splice(idx,1)*/
                //context.commit('deleteUser', getUsers);
            }).catch(err => {
                error(err);
            })
    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     */
    async searchUser(context, payload) {
        const full_text_search = {
            full_text_search: payload.full_text_search
        };

        await this.$axios.get('panel/users/search', full_text_search)
            .then(res => {
                const getUsers = res.data.data;
                context.commit('getUsers', getUsers);
            }).catch(err => {
                error(err);
            })
    },

    /*
    |--------------------------------------------------------------------------
    | Panel Profile
    |--------------------------------------------------------------------------
    */
    /**
     *
     * @param context
     * @returns {Promise<void>}
     */
    async myUser(context) {
        await this.$axios.get('profile/my-profile')
            .then(res => {
                //success(res);
                const myUser = res.data.data;
                context.commit('myUser', myUser);
            }).catch(err => {
                error(err);
            })
    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     */
    async myUserUpdate(context, payload) {
        let formData = new FormData();

        formData.append("first_name", payload.first_name);
        formData.append("last_name", payload.last_name);
        formData.append("username", payload.username);
        formData.append("email", payload.email);
        formData.append("mobile", payload.mobile);
        formData.append("home_phone", payload.home_phone);
        formData.append("zip_code", payload.zip_code);
        formData.append("password", payload.password);
        formData.append("confirmation_password", payload.confirmation_password);
        formData.append("home_address", payload.home_address);
        formData.append("work_address", payload.work_address);
        formData.append("image", payload.image);

        await this.$axios.post('profile/my-profile/update/' + payload.id, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(async res => {
                const myUser = res.data.data;
                context.commit('myUser', myUser);
                await success(res);
            }).catch(async err => {
                await error(err);
            })
    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     */
    async resetPassword(context, payload) {
        const resetPassword = {
            google_rECAPTCHA: payload.google_rECAPTCHA,
            current_password: payload.current_password,
            new_password: payload.new_password,
            new_confirmation_password: payload.new_confirmation_password,
        };
        await this.$axios.post('profile/reset-password', resetPassword)
            .then((res) => {
                const forgetPassword = res.data.data;
                context.commit('forgetPassword', forgetPassword);
                success(res);
            }).catch((err) => {
                error(err)
            });
    },
};

const mutations = {
    forgetPassword(state, payload) {
        state.forgetPassword = payload
    },
    myUser(state, payload) {
        state.myUser = payload
    },
    isUser(state, payload) {
        state.isUser = payload
    },
    getUsers(state, payload) {
        state.getUsers = payload
    },
    getEmployees(state, payload) {
        state.getEmployees = payload
    },
    showUser(state, payload) {
        state.isUser = payload
    },
    editUser(state, payload) {
        state.isUser = payload
    },
    deleteUser(state, payload) {
        state.getUsers = payload
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
