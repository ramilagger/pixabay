<template>
  <div id="app">


<b-container class="main_content">

<div class="sort_buttons">
      <b-button-group >
        <b-button variant="outline-primary" @click="setSortedMode('comments')"><b-icon-sort-numeric-up v-show="!sorted['comments']">
          </b-icon-sort-numeric-up> <b-icon-sort-numeric-down v-show="sorted['comments']"></b-icon-sort-numeric-down> Sort by comments</b-button>
        <b-button variant="outline-primary" @click="setSortedMode('likes')"><b-icon-sort-numeric-up v-show="!sorted['likes']">
          </b-icon-sort-numeric-up> <b-icon-sort-numeric-down v-show="sorted['likes']"></b-icon-sort-numeric-down> Sort by likes</b-button>
    </b-button-group>
    <div  class="filter">
        <b-form-input v-model="filter" @keyup='infoFiltered()'> </b-form-input>

        <div class="mt-2">Value: {{ filter }}</div>


          <b-button class='reset' variant="danger" @click="resetFilters">Reset Filters</b-button>

    </div>
</div>

  <b-row >
    
    <b-col sm='12' md='6' lg='4' xl='3' v-for="(item, index) in filteredData" :key="index">
       <Card :image-src="item.previewURL" :tags="item.tags" :likes="item.likes" :comments="item.comments" :id="item.id"></Card>
        </b-col>
      
  </b-row>

</b-container>

    <router-view/>
  </div>
</template>

<script>

import Card from '../components/Card.vue'
import _ from 'lodash';

export default {
  components: { Card },
  name: 'App',
  data: function() {
    return {
      pageData : [],
      filteredData : [],
      sorted : {
        comments : undefined,
        likes : undefined
      },
      filter : '',
      infoFiltered : _.debounce(this.filterInfo, 300)
    }
  },
  methods : {
    setSortedMode : function(property) {
      this.sorted[property] = !this.sorted[property];
    },
    sortBy : function(property) {
      console.log(property, this.sorted[property]);
      if(this.sorted[property] !== undefined) {
        if(this.sorted[property]) {
          this.filteredData.sort((a,b) => a[property] - b[property]);
      } else {
        this.filteredData.sort((a,b) => b[property] - a[property]);
        }
      }
    },
    filterInfo : function() {
      let that = this;
      this.filteredData = (this.filter) ? this.pageData.filter(i => { return i.tags.replace(',','').includes(that.filter) }) : _.cloneDeep(this.pageData);
      this.sortBy('likes');
      this.sortBy('comments');
    },
    resetFilters : function() {
      this.sorted = {
         comments : undefined,
         likes : undefined
      };
      this.filter = '';
      this.filterInfo();
    }
  },
  mounted () {
    let that = this;
    this.$store.dispatch('loadPageData').then((res) => {
          console.log('here',res);
          this.pageData = res;
          that.filteredData = _.cloneDeep(this.pageData);
    })
  },
  watch: {
    'sorted.comments' : function () {
      this.sortBy('comments');
    },
    'sorted.likes' : function () {
      this.sortBy('likes');    
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  .sort_buttons {
    float: left;
  }
  .main_content {
    margin-top: 20px;
  }
  .filter {
        margin-top: 20px;

  }

}

</style>
