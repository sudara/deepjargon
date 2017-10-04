//= require_tree
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
    this.search = window.location.pathname.substr(1).replace('-',' ')
    document.title = window.location.pathname.substr(1)
    document.getElementById('remove_query').style.visibility = "hidden";
  },
  watch: {
    search() {
      if (this.search.trim() === ''){
        this.result = this.list
        this.$router.replace('/')
        document.getElementById('remove_query').style.visibility = "hidden";
      }else{
        var permalink = this.search.trim().replace(' ','-')
        // send the dashed permalink term to the search
        // gives us better results
        this.result = this.fuse.search(permalink)
        this.$router.replace(permalink)
        document.getElementById('remove_query').style.visibility = "visible";
        highlightTopResult()
      }
    },
    '$route' (to, from) {
      //this.search = to.path.substr(1);
      console.log(to)
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
  //console.log(definition.replace('-',' '));
  app.search = definition.replace('-',' ');
  app.$router.push(definition);
  window.scrollTo(0,0);
  ga('send', 'pageview', location.pathname);
}

function highlightTopResult(){
  var topDef = document.getElementsByClassName('definitions')[0].firstChild
  topDef.className = "highlighted"
}


document.addEventListener("DOMContentLoaded", function(event) {
  this.addEventListener('click', function(e){
    // create history item when clicking on home/term
    if (e.target.matches('h2 a, h1 a, #app ul li a, #remove_query, #remove_query>svg, #remove_query>svg path')) {
        href = e.target.getAttribute('href') || '/'
        e.preventDefault();
        visitAnchor(href)
    }
  });
});

