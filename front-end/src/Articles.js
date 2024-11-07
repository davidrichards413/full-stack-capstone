import { useState, useEffect } from "react";
export function Articles(params) {
  let articles = params.data.articles ? params.data.articles : [];
  let queryName = params.query.queryName ? params.query.queryName : "na";
  let articleCount = params.data.totalResults ? params.data.totalResults : 0;

  const [showQueryDetails, setShowQueryDetails] = useState(false);

  const formatQueryDetails = () => {
    const queryDetails = [];
    if (params.query) {
      for (const [key, value] of Object.entries(params.query)) {
        queryDetails.push(
          <li key={key}>
            <strong>{key}:</strong> {value || "N/A"}
          </li>
        );
      }
    }
    return queryDetails;
  };

  return (
    <div>
      <div>
        <h3>Query: {queryName}</h3>
        Count: {articleCount}
        <br />
        <button onClick={() => setShowQueryDetails(!showQueryDetails)}>
          {showQueryDetails ? "Hide Details" : "Show Details"}
        </button>
        {showQueryDetails && <ul>{formatQueryDetails()}</ul>}
      </div>
      <ol>
        {articles.map((item, idx) => {
          if (item) {
            if (item.title) {
              if (item.title === "[Removed]") {
                return <li key={idx}>Was Removed</li>;
              }
              const trimTitle =
                item.title.length > 120
                  ? item.title.substring(0, 120) + "..."
                  : item.title;
              return (
                <li key={idx}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontSize: "16px",
                      color: "#333",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    {trimTitle}
                  </a>
                </li>
              );
            } else {
              return <li key={idx}>No Title</li>;
            }
          } else {
            return <li key={1}>No Item</li>;
          }
        })}
      </ol>
    </div>
  );
}
