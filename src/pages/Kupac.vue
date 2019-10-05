<template>
  <q-page class="q-pa-sm">
    
    <q-list bordered separator>

      <q-item class="bg-primary text-white text-h5">

        <q-item-section>
          <q-item-label>PREGLED KUPACA</q-item-label>
        </q-item-section>

        <q-item-section class="absolute-center">
          <q-btn
            round
            icon="add"
            class="bg-white text-grey-6"
            size="12px"
            @click="showDialog = true"
          >
          </q-btn>
          
            <q-dialog
              v-model="showDialog"
            >
              <insert-partner />
            </q-dialog>
        </q-item-section>

        <q-item-section side>
          <q-checkbox
            v-model="showAllPart"
            class="text-white"
            label="Prikaži neaktivne"
            left-label
            dark
          />
        </q-item-section>

      </q-item>

      <q-separator />

      <list-partners
        v-for="(part, key) in partners"
        :key="key"
        :part="part"
        :id="key"
      >
      </list-partners>
    </q-list>

    <q-page-sticky position="bottom-right" :offset="[30, 10]">
      <q-fab color="primary" icon="keyboard_arrow_left" direction="left">
        <q-fab-action color="secondary" @click="onClick" icon="mail" />
        <q-fab-action color="secondary" @click="onClick" icon="alarm" />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapState, mapActions } from 'vuex'

  export default {
    data(){
      return{
        showDialog: false,
        activeUsers:{},
        dataTest : {}
      }
    },
    async mounted(){
      try {
        await this.getdbPartners()
      } catch (error) {
        
      }
    },
    components:{
      'list-partners': require('../components/KupacComponents/listKupac').default,
      'insert-partner': require('components/KupacComponents/Modals/DialogInsert').default,
    },

    computed: {
      ...mapGetters('partners', ['partners']),
      ...mapState('partners', ['showAll']),

      showAllPart: {
        get(){
          return this.showAll
        },
        set(value){
          this.showAllPartners(value)
        }
      }
    },

    methods: {
      ...mapActions('partners', ['showAllPartners','getdbPartners']),

      onClick(){

      },
    }
  }
</script>
