<template>
  <q-item
    clickable
    v-ripple
    bordered
    dense
    @click="showDialog = true"
  >
    <q-item-section class="">
      <div class="row">

        <div>
          <q-item-label caption>Šifra kupca</q-item-label>
          <q-item-label class="text-center">{{ id }}</q-item-label>
        </div>

        <div class="q-ml-lg">
          <q-item-label caption>Naziv kupca</q-item-label>
          <q-item-label>{{ part.naziv }}</q-item-label>
        </div>

        <q-space />

        <div>
          <q-checkbox
            v-model="part.isActive"
            label="Aktivan"
            left-label
            disable
            class="q-pa-sx"
          />
        </div>

      </div>
    </q-item-section>

    <q-dialog
      v-model="showDialog"
    >
      <edit-partner
        :part="part"
        :id="id"
      />
      
    </q-dialog>
  </q-item>
</template>

<script>

  export default {

    props:['part', 'id'],

    data(){
      return{
        showDialog: false,
      }
    },

    components:{
      'edit-partner': require('components/KupacComponents/Modals/DialogEdit').default,
    },

  }
</script>