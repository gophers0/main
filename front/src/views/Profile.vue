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
              <v-list subheader two-line>
                <v-list-item v-for="file in myFileList" :key="file.title" class="pa-0">
                  <v-list-item-avatar>
                    <v-icon class="grey lighten-1" dark> {{ file.icon }} </v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-text="file.title"></v-list-item-title>

                    <v-list-item-subtitle
                      v-text="file.subtitle"
                    ></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn icon>
                      <v-icon color="grey lighten-1">mdi-delete</v-icon>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-action class="ml-1">
                    <v-btn icon>
                      <v-icon color="grey lighten-1">mdi-information</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
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
    myFileList: [
      { title: "ava43-dfsdfs-dfsssss-sdfsdfs dffdsf.png", subtitle: "34kB, 22.05.1999", icon: "mdi-image" },
      { title: "sea77.mp4", subtitle: "1255kB, 22.05.1977", icon: "mdi-file" },
    ],
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
