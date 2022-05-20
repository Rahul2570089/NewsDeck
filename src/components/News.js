import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pagesize: 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pagesize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
    }

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    async componentDidMount() {
        this.updateNews()
    }

    updateNews = async () => {
        this.props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d8344f148be2417e837ab60a95d03be9&page=${this.state.page}&pagesize=${this.props.pagesize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(30)
        let parsedata = await data.json()
        this.props.setProgress(50)
        this.setState({
            totalResults: parsedata.totalResults,
            articles: parsedata.articles,
            loading: false,
        })
        this.props.setProgress(100)
    }

    fetchMoreData = async () => {
        this.setState({
            page: this.state.page + 1,
        })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d8344f148be2417e837ab60a95d03be9&page=${this.state.page}&pagesize=${this.props.pagesize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedata = await data.json()
        this.setState({
            totalResults: parsedata.totalResults,
            articles: this.state.articles.concat(parsedata.articles),
            loading: false
        })
    }


    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center my-4'>Top {this.capitalize(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner></Spinner>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== 20}
                    >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <Newsitem title={element.title != null ? element.title : ""} description={element.description != null ? element.description.slice(0, 88) + "......" : ""} imageurl={element.urlToImage != null ? element.urlToImage : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6V_R6WMnHzN5bpexR-vQ1tNickx9phBGTHA&usqp=CAU"} newsurl={element.url} source={element.source.name == null ? "Unknown source" : element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        )
    }
}

export default News     