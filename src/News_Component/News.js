// src/NewsComponent.js
import React, { Component } from 'react';
import axios from 'axios';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsData: null,
      isLoading: true,
    };
    console.log('Constructor called');
  }

  componentDidMount() {
    console.log('Component did mount');
    this.fetchNewsData();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Component did update');
    // You can perform additional logic based on props or state changes
  }

  componentWillUnmount() {
    console.log('Component will unmount');
    // Cleanup tasks, if needed
  }

  fetchNewsData(category = 'general') {
    const apiKey = '04ae7a9010eb4554b54d7ade8e939ce5'; // Replace with your actual News API key
    const apiUrl = ` https://newsapi.org/v2/top-headlines?country=US&category=${category}&apiKey=${apiKey}`;
    

    axios.get(apiUrl)
      .then(response => {
        this.setState({ newsData: response.data, isLoading: false });
      })
      .catch(error => console.error('Error fetching news data:', error));
  }

  handleCategoryChange = (category) => {
    this.setState({ isLoading: true });
    this.fetchNewsData(category);
  };

  render() {
    console.log('Render called');
    const { newsData, isLoading } = this.state;

    return (
      <div>
        <h1>Latest News</h1>

        <div className="navbar">
          <button onClick={() => this.handleCategoryChange('general')}>General</button>
          <button onClick={() => this.handleCategoryChange('business')}>Business</button>
          <button onClick={() => this.handleCategoryChange('technology')}>Technology</button>
          {/* Add more categories as needed */}
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {newsData.articles.map(article => (
              <li key={article.title}>
                <strong>{article.title}</strong>
                <p>{article.description}</p>
                {/* Display other article information as needed */}
              </li>
            ))}
          </ul>
        )}
      </div>
    ); 
  }
}

export default News;
