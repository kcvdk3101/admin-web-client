<template>
  <v-container fluid v-if="!isLoggedIn">
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h1 class="page-title">Dashboard</h1>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              color="secondary"
              class="text-capitalize button-shadow mr-1"
              @click="getToken"
              >Latest Reports
            </v-btn>
          </template>
        </v-menu>
      </v-row>
      <v-row>
        <v-col lg="3" sm="6" md="5" cols="12">
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-3">
              <p>Users Today</p>
              <v-spacer></v-spacer>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="textColor"> mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item
                    v-for="(item, i) in mockData.menu"
                    :key="i"
                    @click="() => {}"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>

            <v-card-text class="pa-6 pt-0">
              <v-row no-gutters class="pb-5">
                <v-col cols="5" class="my-auto">
                  <span
                    class="font-weight-medium card-dark-grey"
                    style="font-size: 24px"
                    >12, 678</span
                  >
                </v-col>
                <v-col cols="6">
                  <Trend
                    :data="getRandomDataForTrends()"
                    :gradient="mockData.trend.gradient"
                    :height="40"
                    stroke-width="4"
                    smooth
                  />
                </v-col>
              </v-row>

              <v-row
                no-gutters
                class="justify-space-between pb-3"
                v-for="item in mockData.bigStat"
                :key="item.value"
              >
                <v-col cols="3">
                  <div class="card-light-grey">Total</div>
                  <div
                    class="text-h6 card-dark-grey text-left font-weight-regular"
                  >
                    {{ item.total }}
                  </div>
                </v-col>
                <v-col cols="4">
                  <div class="card-light-grey">Registrations</div>
                  <div
                    class="
                      text-h6
                      card-dark-grey
                      text-center
                      font-weight-regular
                    "
                  >
                    {{ item.registrations.value }}
                  </div>
                </v-col>
                <v-col cols="3" xl="2">
                  <div class="text-right card-light-grey">Rate</div>
                  <div
                    class="
                      text-right text-h6
                      card-dark-grey
                      font-weight-regular
                    "
                  >
                    {{ item.bounce.value + " %" }}
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col lg="3" sm="6" md="7" cols="12">
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-3">
              <p>App Performance</p>
              <v-spacer></v-spacer>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="textColor">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, i) in mockData.menu"
                    :key="i"
                    @click="() => {}"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-card-text class="pa-6 pt-0">
              <v-row no-gutters class="pb-5">
                <div class="mr-4">
                  <v-icon color="primary" class="ml-n2">
                    mdi-circle-medium
                  </v-icon>
                  <span class="card-light-grey">Integration</span>
                </div>
                <div>
                  <v-icon color="warning"> mdi-circle-medium </v-icon>
                  <span class="card-light-grey">SDK</span>
                </div>
              </v-row>
              <v-row no-gutters class="pb-3">
                <v-col>
                  <div class="text-h6 card-light-grey font-weight-regular">
                    Integration
                  </div>
                  <v-progress-linear
                    :value="value"
                    background-color="#ececec"
                    color="primary"
                  ></v-progress-linear>
                </v-col>
              </v-row>
              <v-row no-gutters class="pb-1">
                <v-col>
                  <div class="text-h6 card-light-grey font-weight-regular">
                    SDK
                  </div>
                  <v-progress-linear
                    :value="value2"
                    background-color="#ececec"
                    color="warning"
                  ></v-progress-linear>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col lg="3" sm="6" md="7" cols="12">
          <v-card class="mx-1 mb-1" style="min-height: 228px">
            <v-card-title class="pa-6 pb-3">
              <p>Server Overview</p>
              <v-spacer></v-spacer>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="textColor">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, i) in mockData.menu"
                    :key="i"
                    @click="() => {}"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-card-text class="pa-6 pt-0">
              <v-row no-gutters>
                <v-col
                  cols="6"
                  md="5"
                  lg="6"
                  xl="4"
                  class="my-auto text-truncate"
                >
                  <span>60% / 37°С / 3.3 Ghz</span>
                </v-col>
                <v-col cols="6" md="7" lg="6" xl="8">
                  <ApexChart
                    v-if="apexLoading"
                    height="35"
                    type="area"
                    :options="mockData.apexArea1.options"
                    :series="mockData.apexArea1.series"
                  ></ApexChart>
                </v-col>
              </v-row>
              <v-row no-gutters class="my-3">
                <v-col
                  cols="6"
                  md="5"
                  lg="6"
                  xl="4"
                  class="my-auto text-truncate"
                >
                  <span>54% / 31°С / 3.3 Ghz</span>
                </v-col>
                <v-col cols="6" md="7" lg="6" xl="8">
                  <ApexChart
                    v-if="apexLoading"
                    height="35"
                    type="area"
                    :options="mockData.apexArea2.options"
                    :series="mockData.apexArea2.series"
                  ></ApexChart>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col
                  cols="6"
                  md="5"
                  lg="6"
                  xl="4"
                  class="my-auto text-truncate"
                >
                  <span>57% / 21°С / 3.3 Ghz</span>
                </v-col>
                <v-col cols="6" md="7" lg="6" xl="8">
                  <ApexChart
                    v-if="apexLoading"
                    height="35"
                    type="area"
                    :options="mockData.apexArea3.options"
                    :series="mockData.apexArea3.series"
                  ></ApexChart>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col lg="3" sm="6" md="5" cols="12">
          <v-card class="mx-1 mb-1" style="height: 228px">
            <v-card-title class="flex-nowrap pa-6 pb-3">
              <p class="text-truncate">Revenue Breakdown</p>
              <v-spacer></v-spacer>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="textColor">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, i) in mockData.menu"
                    :key="i"
                    @click="() => {}"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-card-text class="pa-6 pt-0 mb-1">
              <v-row no-gutters>
                <v-col cols="12">
                  <ApexChart
                    height="124"
                    type="donut"
                    class="mt-1"
                    :options="mockData.apexPie.options"
                    :series="generatePieSeries()"
                  ></ApexChart>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-0">
              <v-row no-gutters>
                <v-col
                  cols="7"
                  sm="4"
                  md="4"
                  lg="5"
                  class="d-flex align-center"
                >
                  <p>Daily Line Chart</p>
                </v-col>
                <v-col
                  sm="6"
                  md="6"
                  lg="5"
                  class="d-none d-sm-flex align-center"
                >
                  <v-icon size="18" color="warning">mdi-circle-medium</v-icon
                  ><span
                    class="card-dark-grey font-weight-regular mr-3"
                    style="font-size: 18px"
                    >Tablet</span
                  >
                  <v-icon size="18" color="primary">mdi-circle-medium</v-icon
                  ><span
                    class="card-dark-grey font-weight-regular mr-3"
                    style="font-size: 18px"
                    >Mobile</span
                  >
                  <v-icon size="18" color="#B1BCFF">mdi-circle-medium</v-icon
                  ><span
                    class="card-dark-grey font-weight-regular"
                    style="font-size: 18px"
                    >Desktop</span
                  >
                </v-col>
                <v-col cols="5" sm="2" md="2" lg="1" offset-lg="1">
                  <v-menu>
                    <template v-slot:activator="{ on, attrs }">
                      <v-select
                        class="main-chart-select"
                        v-model="mainApexAreaSelect"
                        v-bind="attrs"
                        v-on="on"
                        dense
                        flat
                        single-line
                        hide-details
                        :items="mockData.select"
                        outlined
                      ></v-select>
                    </template>
                  </v-menu>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text class="pa-6">
              <v-row>
                <v-col>
                  <ApexChart
                    v-if="apexLoading"
                    height="350"
                    type="area"
                    :options="mockData.mainApexArea.options"
                    :series="
                      mainApexAreaSelect === 'Daily'
                        ? mockData.mainApexArea.series
                        : mainApexAreaSelect === 'Weekly'
                        ? mockData.mainApexArea.series2
                        : mockData.mainApexArea.series3
                    "
                  ></ApexChart>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col lg="4" sm="6" cols="12">
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-3">
              <p>Light Blue</p>
              <v-spacer></v-spacer>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="textColor">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, i) in mockData.menu"
                    :key="i"
                    @click="() => {}"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-card-text class="pa-6 pt-0">
              <v-row no-gutters>
                <v-col cols="6" class="my-auto">
                  <span class="" style="font-size: 42px"
                    >199 <span class="caption error--text">-3.7%</span>
                  </span>
                </v-col>
                <v-col cols="6">
                  <ApexChart
                    height="100"
                    type="bar"
                    v-if="apexLoading"
                    :options="mockData.apexBar1.options"
                    :series="mockData.apexBar1.series"
                  ></ApexChart>
                </v-col>
              </v-row>
              <v-row no-gutters class="justify-space-between">
                <div>
                  <div class="subtext">
                    33 <v-icon color="success"> mdi-arrow-top-right</v-icon>
                  </div>
                  <div class="subtext-index">Registrations</div>
                </div>
                <div>
                  <div class="subtext">
                    3.25%<v-icon color="success"> mdi-arrow-top-right</v-icon>
                  </div>
                  <div class="subtext-index">Bounce Rate</div>
                </div>
                <div>
                  <div class="subtext">
                    330<v-icon color="error"> mdi-arrow-bottom-right</v-icon>
                  </div>
                  <div class="subtext-index">Views</div>
                </div>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col lg="4" sm="6" cols="12">
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-3">
              <p>Sing App</p>
              <v-spacer></v-spacer>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="textColor">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, i) in mockData.menu"
                    :key="i"
                    @click="() => {}"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-card-text class="pa-6 pt-0">
              <v-row no-gutters>
                <v-col cols="7" class="my-auto">
                  <span class="" style="font-size: 42px"
                    >121 <span class="error--text caption">-3.2%</span>
                  </span>
                </v-col>
                <v-col cols="5">
                  <ApexChart
                    height="100"
                    type="bar"
                    v-if="apexLoading"
                    :options="mockData.apexBar2.options"
                    :series="mockData.apexBar2.series"
                  ></ApexChart>
                </v-col>
              </v-row>
              <v-row no-gutters class="justify-space-between">
                <div>
                  <div class="subtext">
                    15<v-icon color="success"> mdi-arrow-top-right</v-icon>
                  </div>
                  <div class="subtext-index">Registrations</div>
                </div>
                <div>
                  <div class="subtext">
                    3.01%<v-icon color="success"> mdi-arrow-top-right</v-icon>
                  </div>
                  <div class="subtext-index">Bounce Rate</div>
                </div>
                <div>
                  <div class="subtext">
                    302<v-icon color="success"> mdi-arrow-top-right</v-icon>
                  </div>
                  <div class="subtext-index">Views</div>
                </div>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col lg="4" sm="6" cols="12">
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-3">
              <p>RNS</p>
              <v-spacer></v-spacer>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="textColor">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, i) in mockData.menu"
                    :key="i"
                    @click="() => {}"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-card-text class="pa-6 pt-0">
              <v-row no-gutters>
                <v-col cols="7" class="my-auto">
                  <span class="" style="font-size: 42px"
                    >175 <span class="error--text caption">-3.1%</span>
                  </span>
                </v-col>
                <v-col cols="5">
                  <ApexChart
                    height="100"
                    type="bar"
                    v-if="apexLoading"
                    :options="mockData.apexBar3.options"
                    :series="mockData.apexBar3.series"
                  ></ApexChart>
                </v-col>
              </v-row>
              <v-row no-gutters class="justify-space-between">
                <div>
                  <div class="subtext">
                    31 <v-icon color="error"> mdi-arrow-bottom-right</v-icon>
                  </div>
                  <div class="subtext-index">Registrations</div>
                </div>
                <div>
                  <div class="subtext">
                    3.23%<v-icon color="success"> mdi-arrow-top-right</v-icon>
                  </div>
                  <div class="subtext-index">Bounce Rate</div>
                </div>
                <div>
                  <div class="subtext">
                    301<v-icon color="success"> mdi-arrow-top-right</v-icon>
                  </div>
                  <div class="subtext-index">Views</div>
                </div>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card class="support-requests mx-1 mb-1">
            <v-card-title class="pa-6 pb-0" color="info">
              <span
                class="font-weight-medium card-dark-grey"
                style="font-size: 30px"
                >Basket Details</span
              >

              <v-spacer></v-spacer>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="textColor">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, i) in mockData.menu"
                    :key="i"
                    @click="() => {}"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-simple-table>
                <template v-slot:default>
                  <thead class="pl-2">
                    <tr>
                      <th class="text-center pa-6" style="font-size: 20px"></th>
                      <th class="text-center" style="font-size: 20px">
                        BasketId
                      </th>
                      <th class="text-center" style="font-size: 20px">
                        ProductId
                      </th>
                      <th class="text-center" style="font-size: 20px">Name</th>
                      <th class="text-center" style="font-size: 20px">
                        Description
                      </th>
                      <th class="text-center" style="font-size: 20px">
                        Quantity
                      </th>
                      <th class="text-center" style="font-size: 20px">Price</th>
                      <th class="text-center" style="font-size: 20px">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, i) in products"
                      :key="i"
                      class="text-center font-size:26px"
                    >
                      <td>
                        <v-chip
                          class="pa-6 ma-2 text-center"
                          link
                          style="font-size: 30px"
                          color="success"
                        >
                          Id: {{ item.id }}
                        </v-chip>
                      </td>
                      <td>{{ item.basketId }}</td>
                      <td>{{ item.productId }}</td>
                      <td>{{ item.name }}</td>
                      <td>{{ item.description }}</td>
                      <td>{{ item.quantity }}</td>
                      <td>{{ item.price }}</td>
                      <td v-if="item.isRegistered === true">
                        <v-chip link color="primary" class="ma-2 ml-0">
                          Complete
                        </v-chip>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import Trend from "vuetrend";
import ApexChart from "vue-apexcharts";
import mockData from "./mockData";
import { mapActions, mapGetters } from "vuex";
import AuthService from "../../service/AuthService";

export default {
  name: "Dashboard",
  components: { Trend, ApexChart },
  data() {
    return {
      authService: {},
      userInfo: "",
      mockData,
      apexLoading: false,
      value: this.getRandomInt(10, 90),
      value2: this.getRandomInt(10, 90),
      mainApexAreaSelect: "Daily",
      accessTokenExpired: false,
      isLoggedIn: false,
    };
  },
  methods: {
    ...mapActions(["getProducts"]),
    getRandomInt(min, max) {
      let random = min - 0.5 + Math.random() * (max - min + 1);
      return Math.round(random);
    },
    getRandomDataForTrends() {
      const arr = [];
      for (let i = 0; i < 12; i += 1) {
        arr.push(Math.random().toFixed(1) * 10);
      }
      return arr;
    },
    generatePieSeries() {
      let series = [];
      for (let i = 0; i < 4; i++) {
        let y = Math.floor(Math.random() * (500 - 100 + 100)) + 100;
        series.push(y);
      }
      return series;
    },
    async signInMainView() {
      await this.authService.signIn.mainWindow();
    },

    async signInPopView() {
      await this.authService.signIn.popup();
    },

    async signInSilent() {
      await this.authService.signIn.silent();
    },

    async signInCallBack() {
      await this.authService.signInCallBack.callBack();
    },

    async getUserInfo() {
      const res = await this.authService.resource.user();
      this.userInfo = res;
    },

    async signOutPop() {
      await this.authService.signOut.popup();
    },

    async getToken() {
      await this.authService.token.getAccessToken();
    },
  },
  mounted() {
    setTimeout(() => {
      this.apexLoading = true;
    });
    this.authService.resource.user().then((user) => {
      if (user) {
        this.userInfo = user.id;
        this.accessTokenExpired = user.expired;
        this.isLoggedIn = user !== null && !user.expired;
      }
    });
    this.authService.token.getAccessToken();
  },
  computed: {
    ...mapGetters(["products"]),
  },
  created() {
    this.getProducts();
    this.authService = new AuthService();
  },
};
</script>

<style src="./Dashboard.scss" lang="scss"></style>
