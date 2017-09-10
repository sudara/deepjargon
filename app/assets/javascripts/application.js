// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require vue/dist/vue
//= require vue-router/dist/vue-router
//= require fuse.js/dist/fuse

window.Fuse = Fuse;
const router = new VueRouter({
  mode:'history'
});

var app = new Vue({
  router,
  el: '#app',
  mounted() {
    var options = {
      shouldSort: true,
      threshold: 0.1,
      tokenize: true,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "title",
        "body"
      ]
    };

    this.fuse = new window.Fuse(this.list, options)
    this.result = this.list
    this.search = window.location.pathname.substr(1)
  },
  watch: {
    search() {
      this.$router.replace(this.search.trim())
      if (this.search.trim() === '')
        this.result = this.list
      else{
        this.result = this.fuse.search(this.search.trim())
      }
    },
    '$route' (to, from) {
      this.search = to.path.substr(1);
    }
  },
  data: {
    fuse: null,
    search: '',
    list: window.definitions,
    result: []
  }

});

function visitAnchor(anchor){
  var definition = anchor.substr(1);
  app.search = definition;
  app.$router.push(definition);
}

document.addEventListener("DOMContentLoaded", function(event) {
  this.addEventListener('click', function(e){
     // create history item when actually clicking on a term
      if (e.target.matches('h2 a')) {
          e.preventDefault();
          visitAnchor(e.target.getAttribute('href'))
      }
      // allow crosslinking in vue
      if (e.target.matches('#app ul li a')){
        var link = e.target.getAttribute('href')
        if(link.charAt(0) == '#'){ // if it's an anchor
          e.preventDefault();
          visitAnchor(e.target.getAttribute('href'))
        }
      }
  });

});

