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
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "title",
        "text"
      ]
    };

    this.fuse = new window.Fuse(this.list, options)
    this.result = this.list
    this.search = window.location.pathname.substr(1).replace(/-/g,' ')
    setWindowTitle('')
    document.getElementById('remove_query').style.visibility = "hidden";
    //highlightTopResult()
  },
  watch: {
    search() {
      if (this.search.trim() === ''){
        this.result = this.list
        this.$router.replace('/')
        document.getElementById('remove_query').style.visibility = "hidden";
      }else{
        // use the dashed permalink version of the term for search
        // gives us better results
        var permalink = this.search.trim().replace(/\s/g,'-')
        this.result = this.fuse.search(permalink)
        this.$router.replace(permalink)
        document.getElementById('remove_query').style.visibility = "visible";
      }
    },
    '$route' (to, from) {
      console.log(this.search)
      console.log(to.path.substr(1))

      // back/forward browser buttons don't change the search field
      // so we must manually change the search field here
      if(to.path == '/')
        this.search = ''
      else if (this.search != to.path.substr(1))
        this.search = to.path.substr(1).replace(/-/g,' ')
      setWindowTitle(to.path.substr(1).replace(/-/g,' '))
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
  // previously we may have typed a definition in
  // lets save that now
  app.$router.push(app.search.trim().replace(' ','-'));

  var definition = anchor.substr(1);
  app.search = definition.replace('-',' ');
  app.$router.push(definition);
  window.scrollTo(0,0);
  ga('send', 'pageview', location.pathname);
}

function setWindowTitle(title){
  if (title == '')
    document.title = "Deep Jargon"
  else
    document.title = "Deep Jargon: " + title
}

function highlightTopResult(){
  var topDef = document.getElementsByClassName('definitions')[0].firstChild
  topDef.className = "highlighted"
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

