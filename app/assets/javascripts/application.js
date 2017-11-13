//= require_tree
//= require vue/dist/vue.min
//= require vue-router/dist/vue-router.min
//= require vue-meta/lib/vue-meta.min
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
          name: 'body'
      }]
    };

    this.fuse = new window.Fuse(this.list, options)
    this.loadDefinitions()
  },
  methods: {
    loadDefinitions: function(){
      this.search = this.title()
    },
    visitAnchor: function(anchor){
      // previously we may have typed a definition in
      // lets save that now
      app.$router.push(app.permalink);

      var definition = anchor.substr(1);
      this.$router.push(definition);
      window.scrollTo(0,0);
      this.changeH3();
      ga('send', 'pageview', location.pathname);
    },
    title: function(){
      return window.location.pathname.substr(1).replace(/-/g,' ')
    },
    changeH3: function(){
      document.getElementsByTagName('h3')[0].innerHTML = this.taglines.pick();
    },
    highlightTopResult: function(){
      if (this.topDefinitionExists)
        this.topDefinition.className = "highlighted"
    }
  },
  computed: {
    result: function(){
      clearHighlightedTopResult()
      if(this.queryIsEmpty){
        document.title = "Deep Jargon = Deep Learning + Snark - Jargon"
        return this.list
      }else{
        // use the dashed permalink version of the term for search
        // gives us better results
        var itemsAndScore = this.fuse.search(this.permalink)
        if(itemsAndScore.length > 0){
          this.unknown = 0
          console.log(itemsAndScore.map(function(i){ return [i.item.title, i.score]}))
          this.topScore = itemsAndScore[0].score
          this.highlightTopResult()
          return itemsAndScore.map(function(i){ return i.item})
        }else{
          var unknownResponses=["Hmm, don't know that one...","Still dunno what that is...","Really, no idea.",
          "Nope. Still don't know that.", "Can't even.", "Sorry, never heard of that."]
          document.title = "Deep Jargon: 404 Not Found"
          if(unknownResponses.length > this.unknown)
            this.unknown++
          return [{'body': '<h2>404 Not Found: '+this.search+"</h2><p>" + unknownResponses[this.unknown-1] + "</p>" }]
        }
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
    definitions: function(){
      this.queryExists
      return document.getElementsByClassName('definitions')[0]
    },
    topDefinition: function(){
      return this.definitions.firstChild
    },
    topDefinitionExists: function(){
      return (this.topScore < .6) && (this.topDefinition != null)
    },
    canonicalURL: function(){
      url = "https://deepjargon.com/"
      if(this.queryIsEmpty)
        return url
      else if(this.topDefinitionExists)
        return url + this.topDefinition.getElementsByTagName('a')[0].getAttribute('href').substr(1)
      else
        return url + '404'
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
    topScore:1.0,
    list: window.definitions,
    unknown:0,
    taglines: ['Jargon-free Since 2017.','Deepier Than Thou.',
      'PhD Optional. Decoder Ring Required','Deep Learning + Snark - Jargon.',
      'Get Yourself Deep Learnt.','Deep Learning With A Side of Shallow.']
  },
  metaInfo () {
     return {
       script: [
         { innerHTML: '{ "@context": "http://schema.org","@type": "Article","name": "'+ this.title()+'" }', type: 'application/ld+json' }
       ],
       link:[
         { rel: 'canonical', href: this.canonicalURL }
       ]
     }
   }
});

Array.prototype.pick = function () {
  return this[Math.floor(Math.random() * this.length)]
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
    if (e.target.matches('h2 a, #app ul>li>div>p>a')) {
      href = href || '/'
      if (!href.startsWith('http')){
        e.preventDefault();
        // create history item when clicking on anchor
        app.visitAnchor(href)
      }
    }
  });
});

