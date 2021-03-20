<template>
  <v-container>
    <vue-dropzone
      ref="dropzone"
      id="drop1"
      :options="dropOptions"
      @vdropzone-files-added="onAddedFile"
    />
  </v-container>
</template>

<script>
import vueDropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { UPLOAD_URL } from "@/api/endpoints";
import api from "@/api/api";

export default {
  data: () => ({
    currentFile: null,
    dropOptions: {
      url: UPLOAD_URL,
      headers: {
        ...api.headers,
      },
      maxFiles: 2,
      thumbnailWidth: 200,
    },
  }),
  components: {
    vueDropzone,
  },
  methods: {
    onAddedFile(e) {
      if (this.currentFile) this.$refs.dropzone.removeFile(this.currentFile);
      this.currentFile = e[0];
      console.log(e);
    },
  },
};
</script>
<style lang="scss">
#drop1 {
}
</style>
