<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <vue-dropzone
            ref="dropzone"
            id="drop1"
            :options="dropOptions"
            @vdropzone-files-added="onAddedFile"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-expansion-panels v-model="myFilePanel">
          <v-expansion-panel>
            <v-expansion-panel-header>
              <h2>My files</h2>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <p>file</p>
              <p>file</p>
              <p>file</p>
              <p>file</p>
              <p>file</p>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-expansion-panels v-model="myLinkPanel">
          <v-expansion-panel>
            <v-expansion-panel-header>
              <h2>My links</h2>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <p>link</p>
              <p>link</p>
              <p>link</p>
              <p>link</p>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import vueDropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { UPLOAD_URL } from "@/api/endpoints";
import api from "@/api/api";

export default {
  data: () => ({
    myFilePanel: 0,
    myLinkPanel: 1,
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
