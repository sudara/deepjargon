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
      threshold: 0.2,
      tokenize: true,
      includeScore: true,
      location: 0,
      distance: 100,
      maxPatternLength: 32, // size of longest term you want to match
      minMatchCharLength: 1,
      keys: [{
          name: 'title'
        }, {
          name: 'text'
      }]
    };

    this.fuse = new window.Fuse(this.list, options)
    this.loadDefinitions()
  },
  methods: {
    loadDefinitions: function(){
      this.search = this.title
    }
  },
  computed: {
    result: function(){
      clearHighlightedTopResult()
      if(this.queryIsEmpty){
        document.title = "Deep Jargon"
        return this.list
      }else{
        // use the dashed permalink version of the term for search
        // gives us better results
        var items_and_score = this.fuse.search(this.permalink)
        if(items_and_score.length > 0){
          console.log(items_and_score.map(function(i){ return [i.item.title, i.score]}))
          this.top_score = items_and_score[0].score
        }
        document.title = "Deep Jargon: " + this.title
        highlightTopResult()
        return items_and_score.map(function(i){ return i.item})
      }
    },
    permalink: function(){
      if(this.queryIsEmpty)
        return '/'
      else
        return this.search.replace(/\s/g,'-')
    },
    queryIsEmpty: function(){
      return this.search === ''
    },
    queryExists: function(){
      return !this.queryIsEmpty
    },
    title: function(){
      return window.location.pathname.substr(1).replace(/-/g,' ')
    }
  },
  watch: {
    search: function() {
      this.$router.replace(this.permalink)
    },
    '$route' (to, from) {
      console.log(this.search)
      console.log(to.path.substr(1).replace(/-/g,' '))

      // back/forward browser buttons don't change the search field
      // so we must manually change the search field here
      if(to.path == '/')
        this.search = ''
      else if (this.search != to.path.substr(1))
        this.search = to.path.substr(1).replace(/-/g,' ')
    }
  },
  data: {
    fuse: null,
    search: '',
    top_score:0.0,
    list: window.definitions
  }
});

function visitAnchor(anchor){
  // previously we may have typed a definition in
  // lets save that now
  app.$router.push(app.permalink);

  var definition = anchor.substr(1);
  app.search = definition.replace('-',' ');
  app.$router.push(definition);
  window.scrollTo(0,0);
  ga('send', 'pageview', location.pathname);
}

function highlightTopResult(){
  var topDef = document.getElementsByClassName('definitions')[0]
  if ((app.top_score < .6) && (topDef.firstChild != null))
    topDef.firstChild.className = "highlighted"
}
function clearHighlightedTopResult(){
  var highlighted = document.getElementsByClassName('highlighted')
  if(highlighted[0] != null){
    highlighted[0].className=""
  }
}

document.addEventListener("DOMContentLoaded", function(event) {
  this.addEventListener('click', function(e){
    var href = e.target.getAttribute('href')
    if (e.target.matches('h2 a, h1 a, #app ul>li>div>p>a, #remove_query, #remove_query>svg, #remove_query>svg path')) {
      href = href || '/'
      if (!href.startsWith('http')){
        e.preventDefault();
        // create history item when clicking on anchor
        visitAnchor(href)
      }
    }
  });
});

