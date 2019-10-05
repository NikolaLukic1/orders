<template>
    <q-card style="min-width: 400px">

        <modal-dialog-title>Unos kupca</modal-dialog-title>

        <form @submit.prevent="submitForm">
            <q-card-section>
                <modal-dialog-id :id="id"></modal-dialog-id>
                <modal-dialog-name :name.sync="partnerModal.name"></modal-dialog-name>
                <modal-dialog-checkbox :isActive.sync="partnerModal.active"></modal-dialog-checkbox>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right" class="bg-primary text-primary">
                <q-btn label="Odustani" class="bg-white" v-close-popup />
                <q-space />
                <q-btn label="Unesi" class="bg-white" @click="insertPart()" v-close-popup />
            </q-card-actions>
        </form>

    </q-card>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { mapActions } from 'vuex'

    export default {

        data(){
            return{
                id:null,
                partnerModal: {
                    name: null, 
                    active: true
                }
            }
        },

        computed:{
            ...mapGetters('partners', ['partners']),
        },

        components:{
            'modal-dialog-title': require('components/KupacComponents/Modals/Shared/DialogHeader').default,
            'modal-dialog-id': require('components/KupacComponents/Modals/Shared/DialogId').default,
            'modal-dialog-name': require('components/KupacComponents/Modals/Shared/DialogName').default,
            'modal-dialog-checkbox': require('components/KupacComponents/Modals/Shared/DialogCheckbox').default,
        },
        
        methods:{
            ...mapActions('partners', ['insertPartner']),

            submitForm(){
                this.insertPart();
            },

            insertPart(){
                this.insertPartner(this.partnerModal)
            }
        },
    }
</script>