import {createStore} from 'vuex';

export default createStore({
    state: (): any => ({
        token: '123456'
    }),
    mutations: {
        setToken(token: string) {
            this.token = token;
            sessionStorage.setItem('token', token);

        },
        delToken() {
            this.token = '';
            sessionStorage.removeItem('token');
            console.log(this.token);
        }
    },
    actions: {
        async setToken() {
          this.commit('setToken','123456')
        },
        async delToken() {
          this.commit('delToken')
        },
        async logout(){
            this.commit('delToken')
        }

    },
    modules: {}
});
