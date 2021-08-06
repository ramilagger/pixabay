<template>

  <b-container class="about">

  <b-card no-body class="overflow-hidden">
    <b-row no-gutters>
      <b-col md="6">
        <b-card-img :src='item.largeImageURL' alt="Image" class="rounded-0"></b-card-img>
      </b-col>
      <b-col md="6">
        <b-card-body class= 'cat-details' title="Our Cat Details">
           <span class="icon"> <b-icon-heart> </b-icon-heart> {{item.likes}} </span> 
           <span class='icon'> <b-icon-chat> </b-icon-chat> {{item.comments}} </span>
           <span class='icon'> <b-icon icon="cloud-download" aria-hidden="true"></b-icon>  {{item.downloads}} </span> 
           <span class='icon'> <b-icon icon="eye" aria-hidden="true"></b-icon>  {{item.views}} </span>
          <b-card-text class="user-details">

                <b-avatar :src="item.userImageURL" size="3rem"></b-avatar>
                {{item.user}}

          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>

  </b-container>
</template>
<script>

export default {

  data : function() {
    return {
      item : Object
    }
  },
    mounted : function(){    
         let catId = this.$route.params.id;
         this.item = this.$store.state.pageData?.filter(i => i.id == catId)[0];
         console.log(this.item);
         if(!this.item) {
           this.$router.push('/')
         }

    }
}
</script>

<style lang="scss" scoped>

span.icon {
  display: inline-block;
  padding-right: 30px;
}
.user-details {
  position: absolute;
  bottom: 0;
}
.cat-details {
  position: relative;
  min-height: 140px;
}



</style>
