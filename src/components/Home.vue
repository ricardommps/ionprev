<template>
	<v-content>
		<v-container>
			<v-row dense="">
				<v-col cols="12">
					<v-card
						color="#385F73"
						dark
					>
						<v-card-title class="headline title">Upload csv file </v-card-title>
						<v-card-subtitle class="subtitle">Upload in csv format containing stock history</v-card-subtitle>
						<v-card-actions>
							<Uploader/>
						</v-card-actions>
					</v-card>
				</v-col>
				<v-col cols="12">
					<DataCard title="FREQUENT USERS" v-if="mostFrequentUsers">
							<template>
								<v-simple-table>
								<thead>
									<tr>
									<th>Name</th>
									<th>E-mail</th>
									<th>Empresa</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="user in mostFrequentUsers" :key="user.id">
									<td>{{ user.name }}</td>
									<td>{{ user.email }}</td>
									<td>{{ user.company.name }}</td>
									</tr>
								</tbody>
								</v-simple-table>
							</template>
					</DataCard>
				</v-col>
				<v-col cols="12">
						<DataCard title="FREQUENT EVENTS" v-if="mostFrequentEvents">
							<div>
								<v-simple-table>
								<thead>
									<tr>
									<th>Name</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(event, index) in mostFrequentEvents" :key="index">
									<td>{{ event }}</td>
									</tr>
								</tbody>
								</v-simple-table>
							</div>
						</DataCard>
				</v-col>
				<v-col cols="12">
					<ActionsCompany />
				</v-col>

			</v-row>
		</v-container>
	</v-content>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ActionsCompany from "./ActionsCompany";
import Uploader from './Uploader.vue'
import DataCard from "./DataCard";
export default {
	name: 'Home',
	components: {
		ActionsCompany,
		Uploader,
		DataCard
	},
	computed: {
		...mapGetters('modules',['appLoading','mostFrequentEvents', 'mostFrequentUsers'])
	},
	methods: {
		...mapActions('modules',
			['fetchCompanies','fetchUsers'])
	},
	mounted () {
		this.fetchCompanies()
		this.fetchUsers()
    }
}
</script>

<style>
	.title{
		font-size: 20px;
	}
	.subtitle {
		font-size: 15px;
		margin-top: 0px !important;
	}
</style>