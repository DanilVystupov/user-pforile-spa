<template>
  <div v-if="isLoading"><Loader /></div>

  <div class="user" v-else>
    <div class="user__title">
      <h1 class="user__title-text">
        Альбомы пользователя: <span>{{ user.name }}</span>
      </h1>
    </div>

    <div class="user-albums">
      <div class="albums-item" v-for="album in albums" :key="album.id">
        <h2 class="albums-item__title">Фото из альбома: {{ album.title }}</h2>

        <swiper
          slidesPerView="auto"
          :scrollbar="{ draggable: true }"
          mousewheel
          freeMode
          navigation
          v-if="photosByAlbum(album.id).length > 0"
        >
          <swiper-slide
            v-for="photo in photosByAlbum(album.id)"
            :key="photo.id"
            class="swiper-slide"
          >
            <img :src="photo.url" alt="photo from album" />
          </swiper-slide>
          <div class="swiper-scrollbar" slot="scrollbar"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
        <div v-else class="albums-item__unloaded">
          <p class="albums-item__unloaded-text">
            Не удалось загрузить изображения
          </p>
          <img
            class="albums-item__unloaded-img"
            src="https://via.placeholder.com/600/92c952"
            alt="photo default"
            title="Не удалось загрузить изображения"
          />
        </div>

        <div v-if="!albums.length" class="error-msg">
          Альбомы пользователя не найдены
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Scrollbar, Mousewheel, Navigation } from "swiper";
import { SwiperCore, Swiper, SwiperSlide } from "swiper-vue2";
import { mapGetters } from "vuex";
import Loader from "../UI/Loader.vue";

SwiperCore.use([Scrollbar, Mousewheel, Navigation]);

export default {
  name: "UserAlbums",
  components: {
    Swiper,
    SwiperSlide,
    Loader,
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: "auto",
        spaceBetween: 0,
        freeMode: true,
        scrollbar: true,
        mousewheel: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },

  computed: {
    ...mapGetters(["GET_USERS", "GET_ALBUMS", "GET_PHOTOS", "GET_LOADING"]),

    user() {
      const userId = parseInt(this.$route.params.id);
      return this.GET_USERS.find((user) => user.id === userId);
    },

    albums() {
      return this.GET_ALBUMS;
    },

    photos() {
      return this.GET_PHOTOS;
    },

    isLoading() {
      return this.GET_LOADING;
    },
  },

  methods: {
    photosByAlbum(albumId) {
      return this.photos
        .filter((photo) => photo.albumId === albumId)
        .slice(0, 5);
    },
  },

  created() {
    this.$store.dispatch("fetchAlbumsUser", this.$route.params.id);
    this.$store.dispatch("fetchPhotosUser", this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  flex-direction: column;

  &__title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 768px) {
      & span {
        display: block;
      }
    }

    &-text {
      text-align: center;
      font-size: 25px;

      @media screen and (min-width: 1268px) {
        font-size: 30px;
      }

      @media screen and (min-width: 1600px) {
        font-size: 35px;
      }
    }
  }

  &-albums {
    text-align: center;
  }
}

.albums-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;

  &__title {
    text-align: center;
    font-size: 16px;

    @media screen and (min-width: 1268px) {
      font-size: 20px;
    }

    @media screen and (min-width: 1600px) {
      font-size: 25px;
    }
  }

  &__unloaded {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 0.5rem;

    &-text {
      background-color: #c1e6c9;
      border-radius: 5px;
      padding: 6px;
      color: red;
      font-weight: 700;
    }

    &-img {
      width: 100%;
      object-fit: contain;

      @media screen and (min-width: 520px) {
        width: 50%;
      }

      @media screen and (min-width: 768px) {
        width: 40%;
      }

      @media screen and (min-width: 1024px) {
        width: 30%;
      }
    }
  }
}

.swiper-slide {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;

  @media screen and (min-width: 520px) {
    width: 50%;
  }

  @media screen and (min-width: 768px) {
    width: 40%;
  }

  @media screen and (min-width: 1024px) {
    width: 30%;
  }
}
.swiper-slide:not(:last-child) {
  margin-right: 8px;
}
.swiper-container {
  height: 30dvh;
  width: 100%;
  display: block;
}
</style>
