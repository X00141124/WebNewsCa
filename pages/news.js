// This is the Link API
import Link from 'next/link';
// Import fech library
import fetch from 'isomorphic-unfetch';

// ES6 Classes - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

export default class News extends React.Component {
// Use constructor to get props and set state

  constructor(props) {

    super(props)

      // State variables

        this.state = {
        newsSource: "",
        articles: []
        }

  }

  setNewsSource = (input) => {
    this.setState({
      newsSource: input
    })
  }


  // Method to render the page
render() {

  // If state.articles is empty then copy value from props
  
    if (this.state.articles.length == 0) {
    this.state.articles = this.props.articles;
    }
  // Return the page content
        return (
          <div>
            { /* Add the SearchForm component */}
            <SearchForm setNewsSource={this.setNewsSource}/>

            { /* Display a title based on source */}            
            <h3>News from {this.state.newsSource.split("-").join(" ")}</h3>
            <div>
        
        { /* Iterate through articles using Array map) */}
        
        { /* Display author, publishedAt, image, description, and content */}
        
        { /* for each story. Also a link for more.. */}
        
        {this.state.articles.map((article, index) => (
        <section key={index}>
            <h3>{article.title}</h3>
            <p className="author">{article.author} {article.publishedAt}</p>
            <img src={article.urlToImage} alt="article image" className="img-article"></img>
            <p>{article.description}</p>
            <p>{article.content}</p>
            <p><Link href="/story"><a>Read More</a></Link></p>
        </section>
        ))}
        
            </div>
        
          <style jsx>{`
          
          /* local CSS goes here */
          
          section {
            width: 50%;
            border: 1px solid gray;
            background-colour: rgb(240,248,255);
            padding: 1em;
            margin: 1em;
          }

          .author {
            font-style: italic;
            font-size: 0.8em;
          }
          
          .img-article {
            max-width: 50%;
          }

          `}</style>
          
          </div>
        
        );
        
        }
        
        // Get initial data on server side using an AJAX call
        
        // This will initialise the 'props' for the News page
        
        // Note that getInitialProps() is called before the constructor
        
        static async getInitialProps() {
              // News source
              const newsSource = "BBC-Sport";
              //(free version) API key from https://newsapi.org/        
              // Get your own key!        
              const apiKey = "63838dab6e314536992ce126117ff773";   

              // Build the url which will be used to get the data        
              // See https://newsapi.org/s/the-irish-times-api        
              const url = `https://newsapi.org/v2/top-headlines?sources=${newsSource}&apiKey=${apiKey}`;        
              
              // Make async call        
              const res = await fetch(url);        
              // get json data when it arrives        
              const data = await res.json();

              // Log on server side (Node.js + Express)
              console.log(`Show data fetched. Count: ${data.articles.length}`);

              // return an array of the articles contained in the data
              return {
                articles: data.articles
              }

            }

            // componentDidUpdate is called when the page state or props re updated

// It can be over-ridden to perform other functions when an update occurs

// Here it fetches new data using this.state.newsSource as the source

            async componentDidUpdate(prevProps, prevState) {

              // This will be logged client side              
              console.log(`update news: ${this.state.newsSource}`);
              
              // Check if newsSource has changed to avoid unecessary updates              
              if (this.state.newsSource !== prevState.newsSource) {
              
              const apiKey = '6ad374741184420585d9ffc877f25a39';
            
              // Build the url which will be used to get the data              
              const url = `https://newsapi.org/v2/top-headlines?sources=${this.state.newsSource}&apiKey=${apiKey}`;
              
              // Make async call              
              const res = await fetch(url);              
              // get json data when it arrives              
              const data = await res.json();
              
              // Store articles in state
              this.state.articles = data.articles;
              
              // Force page update by changing state (make sure it happens!)              
              this.setState(this.state);
              
              }
  
            }

}