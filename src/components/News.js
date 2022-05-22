import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [totalResults, setTotalResults] = useState(0)
    const [page, setPage] = useState(1)


    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    useEffect(() => {
        updateNews()
        // eslint-disable-next-line
    }, [])

    const updateNews = async () => {
        props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d8344f148be2417e837ab60a95d03be9&page=${page}&pagesize=${props.pagesize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30)
        let parsedata = await data.json()
        props.setProgress(70)
        setArticles(parsedata.articles)
        setLoading(false)
        setTotalResults(parsedata.totalResults)
        props.setProgress(100)
    }

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d8344f148be2417e837ab60a95d03be9&page=${page+1}&pagesize=${props.pagesize}`;
        setPage(page+1)
        let data = await fetch(url);
        let parsedata = await data.json()
        setArticles(articles.concat(parsedata.articles))
        setTotalResults(parsedata.totalResults)
    }


    return (
        <>
            <h1 className='text-center my-4'>Top {capitalize(props.category)} Headlines</h1>
            {loading && <Spinner></Spinner>}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <Newsitem title={element.title != null ? element.title : ""} description={element.description != null ? element.description.slice(0, 88) + "......" : ""} imageurl={element.urlToImage != null ? element.urlToImage : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6V_R6WMnHzN5bpexR-vQ1tNickx9phBGTHA&usqp=CAU"} newsurl={element.url} source={element.source.name == null ? "Unknown source" : element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}

News.defaultProps = {
    country: 'in',
    pagesize: 8,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string
}


export default News