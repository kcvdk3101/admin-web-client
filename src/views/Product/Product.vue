<template>
  <v-container fluid>
    <div class="tables-basic">
      <h1 class="page-title mt-10 mb-6">Product Table</h1>
      <v-row>
        <v-col cols="12">
          <v-card class="employee-list mb-1">
            <v-card-title class="pa-6 pb-3">
              <p>Product List ( {{ products.length }} items)</p>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                clearable
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>

            <v-data-table
              :headers="headers"
              :items="products"
              :items-per-page="5"
              :search="search"
              class="elevation-1"
              sort-by="price"
              item-key="name"
              show-select
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2 ml-2"
                        v-bind="attrs"
                        v-on="on"
                      >
                        CREATE PRODUCT
                      </v-btn>
                    </template>

                    <v-card>
                      <v-card-title>
                        <span class="text-h5">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="editedItem.name"
                                label="Name"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="editedItem.email"
                                label="Email"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="editedItem.product"
                                label="Product"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="editedItem.price"
                                label="Price"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                              <v-datetime-picker
                                label="Select Datetime"
                                v-model="editedItem.date"
                                timePickerFormat="24hr"
                                dateFormat="yyyy-MM-dd"
                                timeFormat="HH:mm:ss"
                                ><span
                                  dateFormat="yyyy-MM-dd"
                                  timeFormat="HH:mm:ss"
                                  v-text="editedItem.date"
                                ></span
                              ></v-datetime-picker>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="editedItem.city"
                                label="City"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">
                          Cancel
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="save">
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                  <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="text-h5"
                        >Are you sure you want to delete this
                        item?</v-card-title
                      >
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete"
                          >Cancel</v-btn
                        >
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="deleteItemConfirm"
                          >OK</v-btn
                        >
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>

              <template v-slot:[`item.actions`]="{ item }">
                <v-btn
                  small
                  color="primary"
                  class="mr-2 button-shadow text-capitalize"
                  @click="editItem(item)"
                >
                  EDIT
                </v-btn>
                <v-btn
                  small
                  color="warning"
                  class="button-shadow text-capitalize"
                  @click="deleteItem(item)"
                >
                  DELETE
                </v-btn>
              </template>

              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize"> Reset </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Product",
  data: () => ({
    search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: true,
        value: "id",
      },
      {
        text: "Name",
        value: "name",
      },
      { text: "Email", value: "email" },
      { text: "Product", value: "product" },
      { text: "Price", value: "price" },
      { text: "Date", value: "date" },
      { text: "City", value: "city" },
      { text: "Actions", value: "actions", sortable: "false" },
    ],
    products: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      email: "",
      product: "",
      price: 0,
      date: { type: Date || String, default: "2019-01-01 12:00" },
      city: "",
    },
    defaultItem: {
      name: "",
      email: "",
      product: "",
      price: 0,
      date: { type: Date || String, default: "2019-01-01 12:00" },
      city: "",
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Product" : "Edit Product";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.products = [
        {
          id: 0,
          name: "Mark Otto",
          email: "ottoto@wxample.com",
          product: "ON the Road",
          price: 25224,
          date: "2019-01-01 12:00",
          city: "Otsego",
        },
        {
          id: 1,
          name: "Jacob Thornton",
          email: "thornton@wxample.com",
          product: "HP Core i7",
          price: 1254,
          date: "2019-01-01 12:00",

          city: "Fivepointville",
        },
        {
          id: 2,
          name: "Larry the Bird",
          email: "bird@wxample.com",
          product: "Air Pro",
          price: 1570,
          date: "2019-01-01 12:00",

          city: "Leadville North",
        },
        {
          id: 3,
          name: "Joseph May",
          email: "josephmay@wxample.com",
          product: "Version Control",
          price: 5224,
          date: "2019-01-01 12:00",

          city: "Seaforth",
        },
        {
          id: 4,
          name: "MaiCale Horadnia",
          email: "horadnia@wxample.com",
          product: "Let's Dance",
          price: 43594,
          date: "2019-01-01 12:00",

          city: "Hanoverton",
        },
        {
          id: 5,
          name: "Jack Horadnia",
          email: "horadnia@wxample.com",
          product: "Let's Dance",
          price: 43594,
          date: "2019-01-01 12:00",

          city: "Hanoverton",
        },
        {
          id: 6,
          name: "WIll Horadnia",
          email: "horadnia@wxample.com",
          product: "Let's Dance",
          price: 43594,
          date: "2019-01-01 12:00",

          city: "Hanoverton",
        },
        {
          id: 7,
          name: "ALex Horadnia",
          email: "horadnia@wxample.com",
          product: "Let's Dance",
          price: 43594,
          date: "2019-01-01 12:00",

          city: "Hanoverton",
        },
        {
          id: 8,
          name: "Master Horadnia",
          email: "horadnia@wxample.com",
          product: "Let's Dance",
          price: 43594,
          date: "2019-01-01 12:00",

          city: "Hanoverton",
        },
        {
          id: 9,
          name: "John Horadnia",
          email: "horadnia@wxample.com",
          product: "Let's Dance",
          price: 43594,
          date: "2019-01-01 12:00",

          city: "Hanoverton",
        },
        {
          id: 10,
          name: "Van Horadnia",
          email: "horadnia@wxample.com",
          product: "Let's Dance",
          price: 43594,
          date: "2019-01-01 12:00",
          city: "Hanoverton",
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.products.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.products[this.editedIndex], this.editedItem);
      } else {
        this.products.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style src="./Product.scss" lang="scss"></style>
