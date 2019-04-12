<template>
  <td>
    <div class="input-group" v-if="editable">
      <form @submit='submit'>
        <input type="number" v-model="contentEdit" class="form-control"  :placeholder="content"  step="any">
      </form>
    </div>
    <div v-else>
      <span class="editContent" @click="edit">
        <span v-if="content"><h5>{{content}}</h5></span>
        <i v-else><h2>0</h2></i>
      </span>
      <slot/>
    </div>
  </td>
</template>
<script>
  export default {
    props: {
      content: {
        type: String | Number
      },
      id: {}
    },
    data() {
      return {
        editable: false,
        contentEdit: 0
      };
    },
    created() {
      this.contentEdit = this.content || 0;
    },
    methods: {
      edit() {
        this.editable = true;
      },
      submit() {
        if(this.contentEdit == ''){
          this.contentEdit =  this.content;
        }
        this.$emit("newEdit", this.id, this.contentEdit);
        this.editable = false;
      }
    }
  };
</script>

<style scoped>
  td {
    position: relative;
    width: 50%;
  }
  td .editContent {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

</style>
