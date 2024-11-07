export function SavedQueries({
  savedQueries,
  selectedQueryName,
  onQuerySelect,
  onResetQueries,
  currentUser,
}) {
  function onSavedQueryClick(savedQuery) {
    onQuerySelect(savedQuery);
  }

  function getQueries() {
    return savedQueries.map((item, idx) => {
      let trimTitle = item.queryName.substring(0, 30);
      return (
        <li
          key={idx}
          onClick={() => onSavedQueryClick(item)}
          className={item.queryName === selectedQueryName ? "selected" : ""}
        >
          {trimTitle + ': "' + item.q + '"'}
        </li>
      );
    });
  }

  function resetQueries() {
    if (!currentUser) {
      console.error("No user is logged in.");
      return;
    }
    const userUrl = `/queries/user/${currentUser.user}`;
    fetch(userUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((text) => {
        console.log(text);

        if (onResetQueries) {
          onResetQueries([]);
        }
      })
      .catch((error) => {
        console.error("Error resetting queries:", error);
      });
  }

  return (
    <div>
      <ul>
        {savedQueries && savedQueries.length > 0 ? (
          getQueries()
        ) : (
          <li>No Saved Queries, Yet!</li>
        )}
      </ul>
      <button onClick={resetQueries}>Reset Queries</button>
    </div>
  );
}
