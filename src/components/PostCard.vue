<template>
  <v-card class="postCard">
    <v-card-title
      class="d-flex align-center justify-space-between postCard__title"
    >
      {{ data.title }}

      <v-btn outlined icon color="white" @click="showDialog = true">
        <v-icon color="#676767">mdi-pencil-outline</v-icon>
      </v-btn>
    </v-card-title>
    <v-divider
      :thickness="1"
      color="#6200EE"
      class="postCard__divider"
    ></v-divider>
    <v-card-text class="postCard__cardText">
      <div class="postCard__cardText--row">
        <div><v-icon color="#6900ee">mdi-pound</v-icon></div>
        <div>ID: {{ data.id }}</div>
      </div>
      <div class="postCard__cardText--row">
        <div><v-icon color="#6900ee">mdi-account</v-icon></div>
        <div>User ID: {{ data.userId }}</div>
      </div>
      <div class="text--primary pt-2">
        {{ data.body }}
      </div>
    </v-card-text>

    <v-dialog v-model="showDialog" persistent width="1024" class="dialog">
      <v-card>
        <v-card-title class="dialog__title">
          <span class="text-h5">User Posts</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="payloadData.id"
                  label="Id"
                  disabled="true"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="payloadData.title"
                  label="Title"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="payloadData.userId"
                  label="User Id"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="payloadData.title"
                  label="Title"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Body"
                  v-model="payloadData.body"
                  hide-details="auto"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="cardAction">
          <v-spacer></v-spacer>
          <v-btn color="red" variant="outlined" @click="showDialog = false">
            Cancel
          </v-btn>
          <v-btn color="green" variant="outlined" @click="editPost">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
import { defineProps, defineEmits, onMounted, ref } from "vue";

const emits = defineEmits(["editPost"]);
const props = defineProps({
  data: Object,
});
const payloadData = ref();
const showDialog = ref(false);

function editPost() {
  showDialog.value = false;
  emits("editPost", payloadData);
}
onMounted(() => {
  payloadData.value = props.data;
});
</script>
<style lang="scss" scoped>
.postCard {
  // border: 0.5px solid rgb(98, 0, 238);
  border-radius: 5px;
  padding: 20px 25px;
  box-shadow: 1px 4px 20px 0px rgba(74, 0, 178, 0.18);
  &__title {
    padding-bottom: 15px !important;
    padding-top: 0 !important;
  }
  &__divider {
    opacity: 1 !important;
  }
  &__cardText {
    &--row {
      margin-top: 10px !important;
      justify-content: flex-start !important;
      display: flex !important;
      align-items: center !important;
      gap: 10px;
    }
  }
}
.cardAction {
  padding: 0 40px;
  margin-top: 0;
  margin-bottom: 20px;
  button {
    padding: 8px 35px !important;
  }
}

.dialog {
  &__title {
    padding: 30px 45px 30px 45px !important;
    background-color: #6200ee !important;
    color: whitesmoke !important;
  }
}
</style>
