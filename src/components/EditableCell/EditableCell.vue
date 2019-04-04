<template>
  <td>
    <div class="input-group" v-if="editable">
      <input type="text" v-model="contentEdit" class="form-control" @keyup.enter="submit" :placeholder="content">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" @click.stop="submit"></button>
      </div>
    </div>
    <div v-else>
      <span class="editContent" @click="edit">
        <span v-if="content"><h2>{{content}}</h2></span>
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
        contentEdit: ""
      };
    },
    created() {
      this.contentEdit = this.content || "";
    },
    methods: {
      edit() {
        this.editable = true;
      },
      submit() {
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
