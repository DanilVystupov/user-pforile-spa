import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    posts: [],
    albums: [],
    photos: [],
    isLoading: false,
  },
  getters: {
    GET_USERS: state => state.users,
    GET_POSTS: state => state.posts,
    GET_ALBUMS: state => state.albums,
    GET_PHOTOS: state => state.photos,
    GET_LOADING: state => state.isLoading,
  },
  mutations: {
    setUsers: (state, users) => {
      state.users = users
    },

    setPosts: (state, posts) => {
      state.posts = posts
    },

    setAlbums: (state, albums) => {
      state.albums = albums
    },

    setPhotos: (state, photos) => {
      state.photos = photos
    },

    setLoading: (state, isLoading) => {
      state.isLoading = isLoading
    },

    addPost: (state, post) => {
      state.posts.push(post);
    },

    savePost: (state, updatedPost) => {
      const index = state.posts.findIndex(post => post.id === updatedPost.id);
      if (index !== -1) {
        Vue.set(state.posts, index, updatedPost);
      }
    },
  },
  actions: {
    async fetchUsers({commit}) {
      try {
        commit('setLoading', true);
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        commit('setUsers', response.data)
      } catch (e) {
        console.log(e)
      } finally {
        commit('setLoading', false);
      }
    },

    async fetchPostsUser({commit}, userId) {
      try {
        commit('setLoading', true);
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        commit('setPosts', response.data)
      } catch (e) {
        console.log(e)
      } finally {
        commit('setLoading', false);
      }
    },

    async fetchAlbumsUser({commit}, userId) {
      try {
        commit('setLoading', true);
        const response = await axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
        commit('setAlbums', response.data)
      } catch (e) {
        console.log(e)
      } finally {
        commit('setLoading', false);
      }
    },

    async fetchPhotosUser({commit}, userId) {
      try {
        commit('setLoading', true);
        const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${userId}`)
        commit('setPhotos', response.data)
      } catch (e) {
        console.log(e)
      } finally {
        commit('setLoading', false);
      }
    },

    createPost({ commit }, postData) {
      const newPost = {
        userId: postData.userId,
        id: postData.id,
        title: postData.title,
        body: postData.body,
      };
      commit('addPost', newPost);
    },

    savePost({ commit }, updatedPost) {
      commit("savePost", updatedPost);
    },
  },
})
