import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
import {apiPatchClient, apiGetClients, apiHistoryDataRequest, apiTokenReRegisterAuth, apiDataRequest, apiLoginAuth, apiRegisterAuth, apiLogout, apiUserRegisterKeyGeneration} from "./api.js"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    errorStatus: null,
    data: null,
    historyData: null,
    timeout: 0,
    expireTimeout: 0,
    //login info session
    user:{
      username: null,
      password: null,
      permission: VueCookies.get('permission') || null,
      access_token: VueCookies.get('access_token') || null
    },
    //all users info
    userList: null,
    registerInfo: {
      verifyToken: null,
      username: null,
      password: null
    },
    backendManagement: {
      keyGeneration: {
        permission: null,
        key: null
      }
    }
  },
  getters: {
    getErrorStatus: state => {
      return state.errorStatus;
    },
    getUser: state => {
      return {
        account: state.user.username,
        password: state.user.password
      }
    },
    getUserList: state => {
      return state.userList;
    },
    loggedIn(state) {
      return state.user.access_token !== null;
    },
    expireTimeoutExist(state) {
      return state.expireTimeout !== 0 && state.expireTimeout !== null;
    },
    getAccessToken(state){
      return state.user.access_token;
    },
    getRegisterInfo: state => {
      return {
        token: state.registerInfo.verifyToken,
        account: state.registerInfo.username,
        password: state.registerInfo.password
      }
    },
    getPermission: state => {
      return state.user.permission;
    },
    getBackendKeyGenerationPermission: state => {
      return state.backendManagement.keyGeneration.permission;
    },
    getBackendKeyGenerationKey: state => {
      return state.backendManagement.keyGeneration.key;
    }
  },
  mutations: {
    SET_ERROR_STATUS(state, error) {
      state.errorStatus = error;
    },
    SET_DATA (state, data){
      state.data = data;
    },
    SET_HISTORY_DATA(state, historyData) {
      state.historyData = historyData;
    },
    SET_TIMEOUT(state, timeout){
      state.timeout = timeout;
    },
    SET_EXPIRETIMEOUT(state, expireTimeout) {
      state.expireTimeout = expireTimeout;
    },
    SET_USER(state, { username, password }){
      state.user.username = username;
      state.user.password = password;
    },
    SET_USER_LIST(state, userList){
      state.userList = userList;
    },
    SET_ACCESS_TOKEN(state, access_token){
      state.user.access_token = access_token;
    },
    SET_USER_PERMISSION(state, permission) {
      state.user.permission = permission;
    },
    destroyAccessToken(state){
      state.user.access_token = null;

    },
    SET_REGISTERINFO(state, {username, password, verifyToken}) {
      state.registerInfo.username = username
      state.registerInfo.password = password
      state.registerInfo.verifyToken = verifyToken
    },
    SET_BACKEND_KEYGENERATION_PERMISSION(state, permission) {
      state.backendManagement.keyGeneration.permission = permission
    },
    SET_BACKEND_KEYGENERATION_KEY(state, key) {
      state.backendManagement.keyGeneration.key = key
    }
  },
  actions: {
    expireReRegister(context) {
      return apiTokenReRegisterAuth('Bearer ' + context.getters.getAccessToken)
      .then(response => {
        if (context.getters.getAccessToken) {
          context.commit('SET_ACCESS_TOKEN', response.data.data.token);
          VueCookies.set('access_token', response.data.data.token);
          context.commit('SET_EXPIRETIMEOUT',setTimeout(async () => {
            await context.dispatch('expireReRegister');
          }, 60123))
        }
      })
      .catch(error => {
        console.log(error)
        context.commit('SET_EXPIRETIMEOUT',setTimeout(async () => {
          await context.dispatch('expireReRegister');
        }, 60123))
      })
    },
    key_generation(context, permission) {
      return apiUserRegisterKeyGeneration('Bearer ' + context.getters.getAccessToken, permission)
        .then(response => {
          context.commit('SET_BACKEND_KEYGENERATION_KEY', response.data.data.valid_token)
          context.commit('SET_BACKEND_KEYGENERATION_PERMISSION', response.data.data.auth)
        })
        .catch(error => {
        console.log(error)
      })
    },
    register(context, data) {
      var username = data.username
      var password = data.password
      var verifyToken = data.verifyToken
      context.commit('SET_REGISTERINFO', {username, password, verifyToken})
      return apiRegisterAuth()
      .catch(error => {
          console.log(error)
      })
    },
    destroyAccessToken(context){
      if(context.getters.loggedIn){
        return apiLogout('Bearer ' + context.getters.getAccessToken)
        .then(() => {
          VueCookies.remove('access_token')
          VueCookies.remove('permission')
          context.commit('destroyAccessToken')

        })
        .catch(error =>{
          console.log(error)
          VueCookies.remove('access_token')
          VueCookies.remove('permission')
          context.commit('destroyAccessToken')
        })
      }
    },
    loginAuth(context, credentials){
      var username = credentials.username
      var password = credentials.password
      context.commit('SET_USER',{ username, password});
      return apiLoginAuth()
      .then(response => {
        context.commit('SET_ACCESS_TOKEN', response.data.data.token);
        context.commit('SET_USER_PERMISSION', response.data.data.permission);
        VueCookies.set('access_token', response.data.data.token);
        VueCookies.set('permission', response.data.data.permission);
      })
    },
    getData(context) {
      return apiDataRequest('Bearer ' + context.getters.getAccessToken)
      .then(res => {
        context.commit('SET_DATA', res.data.data.data);
      })
        .catch(err => {
          console.log(err)
      });
    },
    getHistoryData(context, tagname) {
      return apiHistoryDataRequest('Bearer ' + context.getters.getAccessToken, tagname)
        .then(res => {
        context.commit('SET_HISTORY_DATA', res.data.data.data);
        //res.data.msg.data
      })
      .catch(error => {
        console.log(error)
      })
    },
    getUserList(context){
      return apiGetClients('Bearer ' + context.getters.getAccessToken)
      .then(res => {
        context.commit('SET_USER_LIST', res.data);
      })
    },
    suspendUser(context, data){
      return apiPatchClient('Bearer ' + context.getters.getAccessToken, data)
      .catch(error => {
        console.log(error)
      })
    }
  }
})
