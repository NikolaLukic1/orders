import Vue from 'vue'
import PartnerService from '../../../services/Partner'

const state = {
    showAll: false,

    partners:{
        // "000001": {"naziv":"test kupac 1", "isActive": false},
        // "000002": {"naziv":"test kupac 2", "isActive": true},
        // "000003": {"naziv":"Mirko Rajovic", "isActive": true},
        // "000004": {"naziv":"test kupac 4", "isActive": false},
        // "000005": {"naziv":"test kupac 5", "isActive": true},
        // "000006": {"naziv":"test kupac 6", "isActive": false},
        // "000007": {"naziv":"test kupac 7", "isActive": true},
        // "000008": {"naziv":"test kupac 8", "isActive": true},
    },
}

const mutations = {
    DialogInsert(state, newPartner){
        // let partnerCount = Object.keys(state.partners).length + 1;

        // let newId = '000000' + partnerCount;
        // newId = newId.slice(partnerCount.toString().length);

        // let payload = { id: newId, insert: newPartner}
        // console.log(payload)
        // Vue.set(state.partners, payload.id, payload.insert);
    },

    showAllPartners(state, value){
        state.showAll = value;
    },
    
    DialogEdit(state, payload){
        Object.assign(state.partners[payload.id], payload.updates);
    },

    async getdbPartners(state, partTest){
        console.log("mutacija ", partTest);
        
        partTest.forEach(element => {            

            let newId = element._id

            let payload = { id: newId, insert:{"naziv":element.name, "isActive": element.active} }
            console.log(payload)
            Vue.set(state.partners, payload.id, payload.insert);
        });
        console.log("mutacija state", state.partners);
    }
}

const actions = {
    async getdbPartners({commit}){
        
        try {
            let partTest = await PartnerService.getPartners();
            commit('getdbPartners', partTest)
            console.log('akcija');
         } catch (err) {
           this.error = err.message;
         }

    },

    async insertPartner({ commit ,dispatch }, newPartner){
        
        await PartnerService.insertPartner(newPartner);
        dispatch('getdbPartners');
    },

    showAllPartners({commit}, value){
        commit('showAllPartners', value);
    },

    updatePartner({ commit }, payload){
        commit('DialogEdit', payload);
    }
}

const getters = {
    partnersFiltered: (state) => {
        let partnersFiltered = {}
        console.log('state',state.partners);
        
        if (!state.showAll) {
            Object.keys(state.partners).forEach(function(key) {
                let partner = state.partners[key]
                if (partner.isActive == !state.showAll) {
                    partnersFiltered[key] = partner;
                }
            });
            return partnersFiltered
        }

        return state.partners
    },

    partners: (state, getters) => {
        let partnersFiltered = getters.partnersFiltered
        console.log("geters");
        
        return partnersFiltered;
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}