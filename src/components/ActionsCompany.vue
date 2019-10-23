<template>
  <DataCard title="LATEST INTERACTION" v-if="companiesUsage && usage.length > 0 && usageByDate.length > 0">
    <v-simple-table slot="default">
      <thead>
        <tr>
          <th>Company</th>
          <th>Action</th>
          <th>Event Name</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(record, index) in usageByDate">
          <tr :key="index">
            <td>{{ record.company.name }}</td>
            <td>{{ record.usage.action.toUpperCase() }}</td>
            <td>{{ record.usage.eventName }}</td>
          </tr>
        </template>
      </tbody>
    </v-simple-table>

    <div v-if="companiesUsage" slot="actions" class="period">
      <v-select v-model="maxDaysOffset" label="Period" :items="periods" class="flex" />
    </div>
  </DataCard>
</template>

<script>
import DataCard from "./DataCard";
import { mapGetters } from "vuex";
export default {
	components: {
		DataCard
	},
	data() {
		return {
		maxDaysOffset: 20,
		periods: [
			{ value: 0, text: "Today" },
			{ value: 1, text: "Yesterday" },
			{ value: 7, text: "This Week" },
			{ value: 20, text: "20 days" },
			{ value: 30, text: "1 month" },
			{ value: 90, text: "3 months" },
			{ value: 180, text: "6 months" },
			{ value: 360, text: "1 year" }
		]
		};
	},
	computed: {
		...mapGetters('modules',['usage','companiesUsage']),
		usageByDate() {
			return this.companiesUsage.filter(record => this.getDaysOffset(record.usage.date) <= this.maxDaysOffset) || [];
		},
		getRefs() {
			return this.$refs;
		}
	},
	methods: {
		getDaysOffset(dateStr) {
			const date1 = new Date(dateStr);
			const date2 = new Date();
			const diffTime = Math.abs(date2.getTime() - date1.getTime());
			const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
			return diffDays;
		}
  }
}
</script>

<style>
	.period {
		margin: 15px
	}
</style>