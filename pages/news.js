// This is the Link API
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';


const source = 'BBC-Sport';

const apiKey = '63838dab6e314536992ce126117ff773';

const url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`;
// Pass this content as 'props' to child components
const News = props => (
    <div>
        <h2>News from {source.split("-").join(" ")}</h2>
        <div>
          {props.articles.map(article => (
            <section>
              <h3>{article.title}</h3>
              <p className="author">{article.author} {article.publisherAt}</p>
              <img src={article.urlToImage} alt="article image" className="img-article"></img>
              <p>{article.description}</p>
              <p>{article.content}</p>
              <p><Link href="/story">Read More</Link></p>
            </section>
          ))}
        </div>


        <style jsx>{`
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
  
  News.getInitialProps = async function() {
    const res = await fetch(url);
    const data = await res.json();

    console.log(`Show data fetched. Count: ${data.articles.length}`);

    return {
      articles: data.articles
    }
  }
export default News;
