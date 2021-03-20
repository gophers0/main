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
                <v-list-item
                  v-for="file in myFileList"
                  :key="file.title"
                  class="pa-0"
                >
                  <v-list-item-avatar>
                    <v-icon class="grey lighten-1" dark>
                      {{ file.icon }}
                    </v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-text="file.title"></v-list-item-title>

                    <v-list-item-subtitle
                      v-text="file.subtitle"
                    ></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-list-item-action v-bind="attrs" v-on="on">
                        <v-btn icon @click="onClickDeleteFile(file)">
                          <v-icon color="grey lighten-1">mdi-delete</v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </template>
                    <span>delete file</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-list-item-action class="ml-1" v-bind="attrs" v-on="on">
                        <v-btn icon>
                          <v-icon color="grey lighten-1">
                            mdi-information
                          </v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </template>
                    <span>information</span>
                  </v-tooltip>
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
    <v-dialog v-model="isShowDeleteConfirm">
      <v-card>
        <v-card-title class="headline"> move file to trash? </v-card-title>
        <v-card-text>the file will be placed in the trash</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="onDisagreeDelete">
            Disagree
          </v-btn>
          <v-btn color="green darken-1" text @click="deleteFile"> Agree </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import vueDropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { UPLOAD_URL } from "@/api/endpoints";
import api from "@/api/api";

export default {
  data: () => ({
    fileToDelete: null,
    isShowDeleteConfirm: false,
    myFileList: [
      {
        title: "ava43-dfsdfs-dfsssss-sdfsdfs dffdsf.png",
        subtitle: "34kB, 22.05.1999",
        icon: "mdi-image",
      },
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
    },
    onClickDeleteFile(file) {
      this.isShowDeleteConfirm = true;
      this.fileToDelete = file;
    },
    deleteFile() {
      console.log("del file", this.fileToDelete);
      this.isShowDeleteConfirm = false;
    },
    onDisagreeDelete() {
      this.isShowDeleteConfirm = false;
      this.fileToDelete = null;
    },
  },
};
</script>
<style lang="scss">
#drop1 {
}
</style>
