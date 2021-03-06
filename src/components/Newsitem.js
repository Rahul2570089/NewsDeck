import React from "react";
const Newsitem = (props) => {
    let { title, description, imageurl, newsurl, source } = props;
    return (

        <div>
            <div className="card">
                <img src={imageurl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <div className="my-2">
                        <strong><p className="card-text">{source}</p></strong>
                    </div>
                    <a rel="noreferrer" href={newsurl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
                </div>
            </div>
        </div>
    )
}

export default Newsitem