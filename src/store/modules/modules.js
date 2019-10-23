import axios from 'axios';
import { getMostFrequent } from "../functions";
const state = {
	users: [],
	companies: [],
	usage: [],
	appLoading: false
}

const mutations = {
	FETCH_USERS: (state, payload) => (state.users = payload),
	FETCH_COMPANIES: (state, payload) => (state.companies = payload),
	SET_USAGE: (state, payload) => (state.usage = payload),
	SET_LOADING: (state, payload) => (state.appLoading = payload),
	setCompanies(state, payload) {
		state.companies = payload
	}
}

const getters = {
	users: state => state.users,
	companies: state => state.companies,
	appLoading: state => state.appLoading,
	usage: state => state.usage,
	companiesUsage (state) {
		let data = null;
		if(state.companies.length > 0) {
			data =[]
			state.companies.map(company => {
				state.usage
					.filter(usageEvent => usageEvent.companyId == company.id)
					.map(usageEvent => {
						const {id: companyId, name: companyName} = company;
						const {
							eventName: actionEvent,
							action: actionName,
							companyId: actionCompanyId,
							date: actionDate
						} = usageEvent

						data.push({
							company: {id: companyId, name: companyName},
							usage: { eventName: actionEvent, action: actionName, companyId: actionCompanyId, date: actionDate }
						})
					})
			})
		}
		return data
	},
	mostFrequentUsers(state) {
		let result = null;
		if (state.usage.length > 0) {
			const ids = getMostFrequent(state.usage, "userId");
			const users = state.users.filter(user => ids.includes(user.id.toString()));
			result = users.map(user => {
			const companyOfUser = state.companies.find(company => company.id == user.companyId);
			return { ...user, company: companyOfUser };
			});
		}
		return result;
	},
	mostFrequentEvents(state) {
		if (state.usage.length > 0) return getMostFrequent(state.usage, "eventName");
		return null;
	},
	

}

const actions = {

	async fetchUsers({ commit }) {
		commit("SET_LOADING", true);
		const endpoint = `${process.env.VUE_APP_API_ENDPOINT}/user`;
		const headers = { 'Content-Type': 'application/json' }
		const { data } = await axios.get(endpoint, { headers })
		commit('FETCH_USERS',data)
		commit("SET_LOADING", false);
	},
	async fetchCompanies({ commit }) {
		commit("SET_LOADING", true);
		const endpoint = `${process.env.VUE_APP_API_ENDPOINT}/company`;
		const headers = { 'Content-Type': 'application/json' }
		const { data } = await axios.get(endpoint, { headers })
		commit('setCompanies',data)
		commit("SET_LOADING", false);
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions	 
 }