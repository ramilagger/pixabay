<template>
  <b-card
    no-body
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
     <router-link :to="'about/' + id" >
       <b-card-img :src="imageSrc" class="card-img-top"/> 
     </router-link>

    <b-card-body>

    <b-card-text>
      <Chip v-for="t in alltags" :key='t'>{{t}}</Chip> 
    </b-card-text>
    
   <span> <b-icon-heart> </b-icon-heart> {{likes}} </span>
   <span class='comments'> <b-icon-chat> </b-icon-chat> {{comments}} </span>

    </b-card-body>

  </b-card>
</template>


<script>
import Chip from './Chip.vue'

export default {
  components: { Chip },
    name: 'Card',

    props: {
        tags: {
          type: String,
        }, 
        imageSrc: String,
        likes : Number,
        comments : Number,
        id : Number
    },
    computed: {
     alltags: function() {
        return this.tags.split(', ')
      }
    }
}
</script>

<style lang="scss" scoped>

article {
    margin: auto;
    width: 100%;
    position: relative;
    height: 350px;
    overflow: hidden;

    .card-body {
        flex: 1 1 auto;
        padding: 1rem 1rem;
        position: absolute;
        bottom: 0;
        background: #fff;
        width: 100%;
    }
    span {
      padding: 2px;
    }
    .comments {
      float: right;
    }
}


</style>
