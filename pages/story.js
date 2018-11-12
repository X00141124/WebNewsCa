// This is the Link API
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

// Pass this content as 'props' to child components
const Story = props => (
    <div>
      <h2>News from {source.split("-").join(" ")}</h2>
    </div>
  );


  Story.getInitialProps = async function() {
    const res = await fetch(url);
    const data = await res.json();

    console.log(`Show data fetched. Count: ${data.articles.length}`);

    return {
      articles: data.articles
    }
  }
export default Story;