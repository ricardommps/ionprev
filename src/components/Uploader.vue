<template>
	<div :class="{ uploader: true, 'has-file': file }">
    <form enctype="multipart/form-data" class="uploader-wrapper" @submit.prevent="sendFile">
      <input type="file" name="file" @change="setFile" />
      <div>
        <v-icon>mdi-upload</v-icon>
        <span>{{ filename }}</span>
      </div>
      <v-btn
        text
        type="submit"
        :class="{ 'uploader-button': true, indigo: file, 'd-none': !file }"
        :disabled="!file"
      >
        UPLOAD
      </v-btn>
    </form>
    <v-snackbar v-model="snackbar.visible" :timeout="2000" :right="true" :color="snackbar.error ? 'error' : 'success'">
      {{ snackbar.message }}
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios';
export default {
	name: 'Uploader',
	data() {
		return {
		file: null,
		snackbar: {
			visible: false,
			message: null,
			error: false
		}
		};
	},
	computed: {
		...mapGetters('modules',['usage', 'users']),
		filename() {
			return this.file ? this.file.name : "Drag files here or click to browse";
		}
	},
	methods: {
		setFile(event) {
			this.file = event.target.files[0];
		},
		async sendFile() {
			if (this.file !== null) {
				const formData = new FormData();
				formData.append("file", this.file);
				this.$store.commit("modules/SET_LOADING", true);
				await setTimeout(() => {
					const endpoint = `${process.env.VUE_APP_API_ENDPOINT}/usage/upload`;
					const headers = { 'Content-Type': 'application/json' }
					axios.post(endpoint, formData,headers)
					.then(response => {
						this.$store.commit("modules/SET_USAGE", response.data);
					})
					.then(() => {
						this.snackbar.error = false;
						this.snackbar.message = "Successfully uploaded data";
					})
					.catch(err => {
						this.snackbar.error = true;
						this.snackbar.message = err.response.data;
					})
					.finally(() => {
						this.$store.commit("modules/SET_LOADING", false);
						this.snackbar.visible = true;
					});
				}, 1000);
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	@import "~vuetify/src/styles/main";
	::-webkit-file-upload-button {
		cursor: pointer;
	}
	.uploader {
		&.has-file {
			.uploader-wrapper {
			border-color: #304ffe;
			background-color: #e8eaf6;
			color: #304ffe;
			}
		}
		&-wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: relative;
			border-width: 2px;
			border-style: dashed;
			border-color: #e0e0e0;
			border-radius: 8px;
			padding: 16px;
			transition: border-color 150ms ease-in-out, background-color 150ms ease-in-out, color 150ms ease-in-out;
			&:hover {
			border-color: #bdbdbd;
			background-color: #eeeeee;
			}
		}
		&-button {
			z-index: 10;
			font-size: 12px;
		}
		input[type="file"] {
			display: block;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			width: 100%;
			opacity: 0;
			cursor: pointer;
		}
	}
</style>