//= require vue/dist/vue.min
//= require vue-router/dist/vue-router.min
//= require fuse.js/dist/fuse.min

window.Fuse = Fuse;
const router = new VueRouter({
  mode: 'history'
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
      if (this.search.trim() === ''){
        this.result = this.list
        this.$router.replace('/')
      }else{
        this.result = this.fuse.search(this.search.trim())
        this.$router.replace(this.search.trim())
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
    href = e.target.getAttribute('href')

    // create history item when actually clicking on a term
    if (e.target.matches('h2 a')) {
        e.preventDefault();
        visitAnchor(href)
    }
    // create history item and stay on page if it's homepage
    if (href == '/') {
        e.preventDefault();
        visitAnchor(href)
    }
    // allow crosslinking in vue
    if (e.target.matches('#app ul li a')){
      if(href.charAt(0) == '#'){ // if it's an anchor
        e.preventDefault();
        visitAnchor(href)
      }
    }
  });
});

